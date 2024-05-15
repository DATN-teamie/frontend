import { CiSettings } from 'react-icons/ci';
import { useStore } from '../../hook/useStore';
import default_workspace_cover from '../../assets/default_workspace_cover.jpg';
import default_board_cover from '../../assets/default_board_cover.jpg';

import { IMG_URL } from '../../constant/common';
import { RiUserAddLine } from 'react-icons/ri';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function WspBoardHomepage() {
  const { boards } = useLoaderData();

  const currentWorkspace = useStore((state) => state.currentWorkspace);
  const navigate = useNavigate();

  const srcImg = currentWorkspace.cover_img
    ? IMG_URL + currentWorkspace.cover_img
    : default_workspace_cover;

  const boardsRender = boards.map((board) => {
    const srcImg = board.cover_img
      ? IMG_URL + board.cover_img
      : default_board_cover;
    return (
      <div
        // onClick={() => navigate(`w/${workspace.id}`)}
        key={board.id}
        className="flex flex-col size-56 bg-white shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer"
      >
        <img src={srcImg} className="w-full h-40" />
        <span className="text-lg font-bold mt-2 ml-5">{board.name}</span>
      </div>
    );
  });

  return (
    <div className="flex flex-col  w-full p-10 ">
      <div className="flex flex-row items-center">
        <div className="flex flex-row items-center basis-1/2">
          <img src={srcImg} className="size-20 rounded-lg" />
          <span className="text-2xl font-bold ml-5">
            {currentWorkspace.name}
          </span>
          <CiSettings className="size-6 ml-3" />
        </div>
        <div className="flex flex-row-reverse basis-1/2 items-center">
          <button
            onClick={() => navigate('members/invite')}
            className="btn btn-primary text-base"
          >
            <RiUserAddLine />
            Invite Workspace Members
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <h1 className="font-bold text-2xl mt-5">Description</h1>
      <div
        className="min-h-28 max-h-28 mt-3 p-3  bg-gray-100 rounded overflow-scroll"
        placeholder="Bio"
        disabled
      >
        {currentWorkspace.description}
      </div>

      <h1 className="font-bold text-2xl mt-5">Your Boards</h1>
      <div className="flex flex-row flex-wrap">
        <div
          className="flex flex-col size-56 bg-gray-100 shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer justify-center items-center"
          onClick={() => navigate('create-board')}
        >
          <span className="text-lg font-bold">Create New Board</span>
        </div>
        {boardsRender}
      </div>
    </div>
  );
}
