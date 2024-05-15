import { CiViewBoard, CiUser, CiSettings, CiSquarePlus } from 'react-icons/ci';
import { LiaUserShieldSolid } from 'react-icons/lia';
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { IMG_URL } from '../../constant/common';
import { useStore } from '../../hook/useStore';
import default_workspace_cover from '../../assets/default_workspace_cover.jpg';
import default_board_cover from '../../assets/default_board_cover.jpg';

export default function WorkspaceSideBar() {
  const { workspace, boards } = useLoaderData();
  const navigate = useNavigate();
  const updateWorkspace = useStore((state) => state.updateWorkspace);
  updateWorkspace(workspace);

  const srcImg = workspace.cover_img
    ? IMG_URL + workspace.cover_img
    : default_workspace_cover;

  const boardsRender = boards.map((board) => {
    const srcImg = board.cover_img
      ? IMG_URL + board.cover_img
      : default_board_cover;
    return (
      <div
        key={board.id}
        className="flex flex-row items-center  bg-white rounded-md p-3 hover:bg-gray-200 cursor-pointer"
      >
        <img className="size-12 rounded-lg" src={srcImg} />
        <span className="text-lg font-bold ml-5">{board.name}</span>
      </div>
    );
  });

  return (
    <>
      <div className="inset-y-0 left-0 w-80 min-w-80 max-w-80 h-full border-2 flex flex-col overflow-scroll">
        <div className="flex flex-row items-center rounded-md mx-5 mt-3">
          <img src={srcImg} className="size-14 rounded-lg" />
          <span className="text-lg font-bold ml-5">{workspace.name}</span>
        </div>
        <div className="divider"></div>
        <div
          onClick={() => {
            navigate('');
          }}
          className="flex flex-row items-center p-3 -mt-3 hover:bg-gray-200 cursor-pointer "
        >
          <CiViewBoard className="size-6" />
          <span className="text-lg ml-5">Boards</span>
        </div>
        <div
          onClick={() => navigate('members')}
          className="flex flex-row items-center p-3 -mt-3 hover:bg-gray-200 cursor-pointer "
        >
          <CiUser className="size-6" />
          <span className="text-lg ml-5">Members</span>
        </div>
        <div
          onClick={() => {
            navigate('workspace-update');
          }}
          className="flex flex-row items-center p-3 -mt-3 hover:bg-gray-200 cursor-pointer "
        >
          <CiSettings className="size-6" />
          <span className="text-lg ml-5">Workspace Settings</span>
        </div>
        <div className="flex flex-row items-center p-3 -mt-3 hover:bg-gray-200 cursor-pointer ">
          <LiaUserShieldSolid className="size-6" />
          <span className="text-lg ml-5">Role Settings</span>
        </div>
        <div className="divider divider-start ml-3 font-bold text-lg">
          Your Boards
        </div>
        <div
          onClick={() => navigate('create-board')}
          className="flex flex-row items-center p-3 -mt-3 hover:bg-gray-200 cursor-pointer "
        >
          <CiSquarePlus className="size-6" />
          <span className="text-lg ml-5">Create New Board</span>
        </div>
        {boardsRender}
      </div>
      <div className="flex grow">
        <Outlet />
      </div>
    </>
  );
}
