import { CiSettings } from 'react-icons/ci';
import { useStore } from '../../hook/useStore';
import default_workspace_cover from '../../assets/default_workspace_cover.jpg';
import { IMG_URL } from '../../constant/common';
import { RiUserAddLine } from 'react-icons/ri';

export default function WspBoardHomepage() {
  const currentWorkspace = useStore((state) => state.currentWorkspace);

  const srcImg = currentWorkspace.cover_img
    ? IMG_URL + currentWorkspace.cover_img
    : default_workspace_cover;

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
          <button className="btn btn-primary text-base">
            <RiUserAddLine />
            Invite Workspace Members
          </button>
        </div>
      </div>
      <div className="divider"></div>
      <h1 className="font-bold text-2xl mt-5">Description</h1>
      <div className="  min-h-28 max-h-28 mt-3 p-3 overflow-scroll bg-gray-100 rounded" placeholder="Bio" disabled>
        {currentWorkspace.description}
      </div>

      <h1 className="font-bold text-2xl mt-5">Your Boards</h1>
      <div className="flex flex-row flex-wrap">
        <div
          className="flex flex-col size-56 bg-gray-100 shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer justify-center items-center"
          //   onClick={() => navigate('create-workspace')}
        >
          <span className="text-lg font-bold">Create New Board</span>
        </div>
        <div
          // onClick={() => navigate(`w/${workspace.id}`)}
          // key={workspace.id}
          className="flex flex-col size-56 bg-white shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer"
        >
          <img src={srcImg} className="w-full h-40" />
          <span className="text-lg font-bold mt-2 ml-5">{`board 1`}</span>
        </div>
        <div
          // onClick={() => navigate(`w/${workspace.id}`)}
          // key={workspace.id}
          className="flex flex-col size-56 bg-white shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer"
        >
          <img src={srcImg} className="w-full h-40" />
          <span className="text-lg font-bold mt-2 ml-5">{`board 1`}</span>
        </div>
        <div
          // onClick={() => navigate(`w/${workspace.id}`)}
          // key={workspace.id}
          className="flex flex-col size-56 bg-white shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer"
        >
          <img src={srcImg} className="w-full h-40" />
          <span className="text-lg font-bold mt-2 ml-5">{`board 1`}</span>
        </div>
        <div
          // onClick={() => navigate(`w/${workspace.id}`)}
          // key={workspace.id}
          className="flex flex-col size-56 bg-white shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer"
        >
          <img src={srcImg} className="w-full h-40" />
          <span className="text-lg font-bold mt-2 ml-5">{`board 1`}</span>
        </div>
      </div>
    </div>
  );
}
