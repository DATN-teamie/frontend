import { useState } from 'react';
import bg_login from '../../assets/images/bg_login.jpg';
import { Link, useNavigate } from 'react-router-dom';
import signupApi from '../../api/auth/signup.api';
import success_verify_svg from '../../assets/success_verify.svg';
import { IoEyeOutline } from 'react-icons/io5';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [typePassword, setTypePassword] = useState('password');
  const [typeConfirmPassword, setTypeConfirmPassword] = useState('password');

  const navigate = useNavigate();

  const signup = async () => {
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
    setSuccess(true);
    setError('');
    navigate('/login');
  };

  const setFail = (data) => {
    setError(data.message);
  };

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
              <div className="relative">
                <input
                  type={typePassword}
                  placeholder="password"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <IoEyeOutline
                  onClick={() =>
                    setTypePassword(
                      typePassword === 'password' ? 'text' : 'password'
                    )
                  }
                  className="absolute right-3 top-3 text-gray-500 size-5 cursor-pointer"
                />
              </div>
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Confirm Password</span>
              </label>
              <div className="relative">
                <input
                  type={typeConfirmPassword}
                  placeholder="confirm password"
                  className="input input-bordered w-full"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <IoEyeOutline
                  onClick={() =>
                    setTypeConfirmPassword(
                      typeConfirmPassword === 'password' ? 'text' : 'password'
                    )
                  }
                  className="absolute right-3 top-3 text-gray-500 size-5 cursor-pointer"
                />
              </div>
            </div>
            {success ? (
              <div className="flex space-x-3 items-center">
                <img
                  src={success_verify_svg}
                  alt="success"
                  className="size-8"
                />
                <span className="text-green-500">Singup success</span>
              </div>
            ) : (
              <div className={`form-control mt-6 ${loading ? 'loading' : ''}`}>
                <button className="btn btn-primary" onClick={() => signup()}>
                  Signup
                </button>
              </div>
            )}
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
