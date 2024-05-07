import teamie_logo from '../assets/teamie_logo.png';
import logoutApi from '../api/auth/logout.api';
import { useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

export default function TopBar() {
  const navigate = useNavigate();
  const logout = async () => {
    const response = await logoutApi();
    console.log(response);
    if (response.ok) {
      navigate('/login');
    }
  };
  return (
    <div className="flex flex-col h-screen">
      <div className="inset-x-0 top-0 h-16 text-white bg-slate-600 text-xl px-5 flex">
        <div
          name="start-block"
          className="space-x-8 flex basis-1/2 items-center"
        >
          <a
            href="#"
            className="text-slate-300 flex items-center text-2xl hover:bg-slate-700 px-3 my-2 mb-3 rounded-md"
          >
            <img src={teamie_logo} alt="teamie_logo" className="size-14" />
            Teamie
          </a>
          <div className="hover:bg-slate-700 px-3 my-2 mb-3 rounded-md p-3">
            <a href="#" className="">
              Workspaces
            </a>
          </div>

          <button href="#" className="btn btn-square">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              className="size-6"
            >
              <path d="M 11 2 L 11 11 L 2 11 L 2 13 L 11 13 L 11 22 L 13 22 L 13 13 L 22 13 L 22 11 L 13 11 L 13 2 Z" />
            </svg>
          </button>
        </div>
        <div
          name="end-block"
          className="flex space-x-8 items-center flex-row-reverse basis-1/2"
        >
          <button onClick={() => logout()} className="link link-hover">
            Logout
          </button>
        </div>
      </div>
      <div name="main" className=" h-20 flex grow">
        <Outlet />
      </div>
    </div>
  );
}
