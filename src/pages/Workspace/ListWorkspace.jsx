import { useLoaderData, useNavigate } from 'react-router-dom';
import default_workspace_cover from '../../assets/default_workspace_cover.jpg';
import { IMG_URL } from '../../constant/common';

export default function ListWorkspace() {
  const { workspaces } = useLoaderData();
  const navigate = useNavigate();

  const workspaceCards = workspaces.map((workspace) => {
    const srcImg = workspace.cover_img
      ? IMG_URL + workspace.cover_img
      : default_workspace_cover;
    return (
      <div
        onClick={() => navigate(`w/${workspace.id}`)}
        key={workspace.id}
        className="flex flex-col w-56 h-60 bg-white shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer"
      >
        <img src={srcImg} className="w-full h-40" />
        <span className="text-lg font-bold mt-2 ml-5">{workspace.name}</span>
      </div>
    );
  });

  return (
    <div className="flex flex-col">
      <h1 className="font-bold text-2xl ml-5 my-3">Your Workspaces</h1>
      <div className="flex flex-row flex-wrap grow">
        <div
          className="flex flex-col w-56 h-60 bg-white shadow-md rounded-md  m-5 hover:shadow-2xl cursor-pointer justify-center items-center"
          onClick={() => navigate('create-workspace')}
        >
          <span className="text-lg font-bold mt-2 ml-5">Create New</span>
          <span className="text-lg font-bold mt-2 ml-5">Workspace</span>
        </div>
        {workspaceCards}
      </div>
    </div>
  );
}
