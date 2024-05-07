import { useState } from 'react';
import bg_login from '../../assets/images/bg_login.jpg';
import { Link } from 'react-router-dom';
import signupApi from '../../api/auth/signup.api';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  async function signup() {
    setLoading(true);
    setError('');
    const response = await signupApi({ email, password, confirmPassword });
    console.log(response);
    if (!response.ok) {
      setFail(response.data);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError('');
  }

  function setFail(data) {
    setError(data.message);
  }

  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{ backgroundImage: `url(${bg_login})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="w-6/12 hero-content flex-col lg:flex-row">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
                className="input input-bordered"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                placeholder="password"
                className="input input-bordered"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <input
                type="password"
                placeholder="confirm password"
                className="input input-bordered"
                required
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className={`form-control mt-6 ${loading ? 'loading' : ''}`}>
              <button className="btn btn-primary" onClick={() => signup()}>
                Signup
              </button>
            </div>
            <span className="text-red-500 text-sm">{error}</span>
            <label className={`label ${loading ? 'hidden' : ''}`}>
              <span className="label-text-alt text-base">
                Already have an account?
              </span>
              <Link
                to="/login"
                className="label-text-alt link link-hover text-blue-500 text-base"
              >
                Login
              </Link>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
