import { useState } from 'react';
import bg_login from '../../assets/images/bg_login.jpg';
import teamwork from '../../assets/teamwork.jpg';
import success_verify_svg from '../../assets/success_verify.svg';
import { Link, useNavigate } from 'react-router-dom';
import loginApi from '../../api/auth/login.api';
import { IoEyeOutline } from 'react-icons/io5';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [typePassword, setTypePassword] = useState('password');

  const navigate = useNavigate();

  const login = async () => {
    setLoading(true);
    setError('');

    const response = await loginApi({ email, password });
    if (response.status == 418) {
      setLoading(false);
      navigate(`/resend-verify-email/${email}`);
      return;
    }

    if (!response.ok) {
      setFail(response.data);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError('');
    setSuccess(true);
    navigate('/h');
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
      <div className="hero-content flex-col lg:flex-row">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="p-5 bg-slate-400">
            <img src={teamwork} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">If you don&apos;t have account!</h2>
            <Link to={'/signup'} className="text-blue-500 hover:underline">
              Signup
            </Link>
          </div>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="email"
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

              <span className="text-red-500 text-xs mt-2">{error}</span>
              <label className="label">
                <Link
                  to="/mail-forgot-password"
                  className="label-text-alt link link-hover text-blue-500 text-base"
                >
                  Forgot password?
                </Link>
              </label>
            </div>
            {success ? (
              <div className="flex space-x-3 items-center">
                <img
                  src={success_verify_svg}
                  alt="success"
                  className="size-8"
                />
                <span className="text-green-500">Login success</span>
              </div>
            ) : (
              <div className={`form-control mt-6 ${loading ? 'loading' : ''}`}>
                <button className="btn btn-primary " onClick={() => login()}>
                  Login
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
