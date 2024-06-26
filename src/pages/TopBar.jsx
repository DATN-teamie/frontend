import teamie_logo from '../assets/teamie_logo.png';
import logoutApi from '../api/auth/logout.api';
import getListWspApi from '../api/workspace/getListWsp.api';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { IMG_URL } from '../constant/common';
import default_workspace_cover from '../assets/default_workspace_cover.jpg';
import default_avatar from '../assets/default_avatar.jpg';
import { IoIosNotificationsOutline } from 'react-icons/io';

import { CiSquarePlus } from 'react-icons/ci';
import { useStore } from '../hook/useStore';

export default function TopBar() {
  const { user } = useLoaderData();
  const updateAuthUser = useStore((state) => state.updateAuthUser);
  updateAuthUser(user);
  const avatar = user.avatar ? IMG_URL + user.avatar : default_avatar;

  const navigate = useNavigate();
  const [listWspRender, setListWspRender] = useState([]);
  const logout = async () => {
    const response = await logoutApi();
    console.log(response);
    if (response.ok) {
      navigate('/login');
    }
  };

  const clickWorkspaces = async () => {
    const response = await getListWspApi();
    let workspaces = [];

    if (response.ok) {
      workspaces = response.data.workspaces;
      setListWspRender(
        workspaces.map((workspace) => {
          const srcImg = workspace.cover_img
            ? IMG_URL + workspace.cover_img
            : default_workspace_cover;
          return (
            <div
              key={workspace.id}
              onClick={() => navigate(`w/${workspace.id}`)}
            >
              <div className="flex flex-row items-center w-48 h-20 bg-white rounded-md  m-5 hover:bg-gray-300 cursor-pointer p-5">
                <img src={srcImg} className="w-14 h-14 rounded-lg" />
                <span className="text-lg font-bold mt-2 ml-5">
                  {workspace.name}
                </span>
              </div>
            </div>
          );
        })
      );
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="inset-x-0 top-0 h-14 min-h-14 max-h-14 text-white bg-slate-600 text-xl px-5 flex items-center">
        <div
          name="start-block"
          className="space-x-8 flex basis-1/2 items-center"
        >
          <Link
            to="/h"
            className="text-slate-300 flex items-center text-2xl hover:bg-slate-700  rounded-md h-full"
          >
            <img src={teamie_logo} alt="teamie_logo" className="size-10" />
            Teamie
          </Link>
          <div className="dropdown fill-transparent bg-transparent h-full">
            <div
              onClick={() => clickWorkspaces()}
              tabIndex={0}
              role="button"
              className="btn fill-transparent bg-transparent text-white text-lg border-none hover:bg-slate-700"
            >
              Workspaces
            </div>
            <div
              tabIndex={0}
              className="flex flex-col items-center flex-nowrap dropdown-content z-[1] menu p-2  bg-base-100 rounded-box w-72 text-black max-h-72 overflow-scroll shadow-2xl"
            >
              <div className="divider">Your Workpsaces</div>
              {listWspRender}
            </div>
          </div>

          <div
            className="tooltip tooltip-right h-full items-center flex"
            data-tip="create new workspace"
          >
            <CiSquarePlus
              onClick={() => navigate('create-workspace')}
              className="size-10 hover:bg-slate-700 cursor-pointer"
            />
          </div>
        </div>
        <div
          name="end-block"
          className="flex space-x-8 items-center flex-row-reverse basis-1/2"
        >
          <div className="dropdown dropdown-end fill-transparent bg-transparent h-full">
            <div
              onClick={() => clickWorkspaces()}
              tabIndex={0}
              role="button"
              className="btn h-10 fill-transparent bg-transparent text-white text-lg border-none hover:bg-slate-700 avatar"
            >
              <div className="w-10 rounded-full">
                <img src={avatar} />
              </div>
            </div>
            <div
              tabIndex={0}
              className="flex flex-col flex-nowrap px-6 py-4 dropdown-content z-[1] menu p-2  bg-base-100 rounded-box w-72 text-black max-h-72 overflow-scroll shadow-2xl"
            >
              <h1 className="text-base font-bold text-gray-600">Account</h1>

              <div className="flex flex-row items-center mt-4">
                <div className="avatar">
                  <div className="w-14 rounded-full">
                    <img src={avatar} />
                  </div>
                </div>
                <div className="flex flex-col ml-4">
                  <span className="text-base">{user.name}</span>
                  <span className="">{user.email}</span>
                </div>
              </div>

              <div
                onClick={() => navigate('update-user')}
                className="hover:bg-gray-300 cursor-pointer mt-5 text-base"
              >
                Profile Settings
              </div>

              <div
                onClick={() => navigate('reset-password')}
                className="hover:bg-gray-300 cursor-pointer mt-5 text-base"
              >
                Change Password
              </div>

              <div className="divider"></div>

              <div
                onClick={() => logout()}
                className="hover:bg-gray-300 cursor-pointer text-base text-red-500"
              >
                Logout
              </div>
            </div>
          </div>
          <IoIosNotificationsOutline className="size-10 hover:bg-slate-700 cursor-pointer mr-5" />
        </div>
      </div>
      <div name="main" className=" h-20 flex grow max-w-full">
        <Outlet />
      </div>
    </div>
  );
}
