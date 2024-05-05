import bg_login from '../../assets/images/bg_login.jpg';
import { Link } from 'react-router-dom';
export default function Signup() {
  return (
    <div
      className="hero min-h-screen bg-base-200"
      style={{ backgroundImage: `url(${bg_login})` }}
    >
      <div className="hero-overlay bg-opacity-60"></div>
      <div className="w-6/12 hero-content flex-col lg:flex-row">
        <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <form className="card-body">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="text"
                placeholder="Email"
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
              />
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Signup</button>
            </div>
            <label className="label">
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
          </form>
        </div>
      </div>
    </div>
  );
}
