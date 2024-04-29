import bg_login_ from '../../assets/images/bg_login.jpg';
import logo_text_icon from '../../assets/images/logo_text_icon.png';
import { Link } from 'react-router-dom';
export default function Login() {
  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{ backgroundImage: `url(${bg_login_})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="hero-content flex-col lg:flex-row">
        <div className="card w-96 bg-base-100 shadow-xl">
          <figure className="p-5 bg-slate-400">
            <img src={logo_text_icon} alt="Shoes" />
          </figure>
          <div className="card-body">
            <h2 className="card-title">If you don&apos;t have account!</h2>
            <Link to={'signup'} className="text-blue-500 hover:underline">
              Create account
            </Link>
          </div>
        </div>
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Username</span>
              </label>
              <input
                type="text"
                placeholder="username"
                className="input input-bordered"
                required
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
              />
              <label className="label">
                <Link to="forgot-password" className="label-text-alt link link-hover">
                  Forgot password?
                </Link>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Login</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
