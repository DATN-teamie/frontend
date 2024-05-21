import { Outlet, useLoaderData, useNavigate } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import { CiLock, CiGlobe, CiUser, CiSettings } from 'react-icons/ci';
import { LiaUserShieldSolid } from 'react-icons/lia';

export default function BoardTopBar() {
  const { board } = useLoaderData();
  const navigate = useNavigate();
  const updateBoard = useStore((state) => state.updateBoard);
  updateBoard(board);

  return (
    <div className="flex flex-col grow max-w-full">
      <div className="flex flex-row grow max-w-full max-h-[5.4rem] min-h-[5.4rem] border-b-2 p-4 items-center">
        <div className="flex flex-row items-center basis-1/2 h-full">
          <h1 className="font-bold text-2xl">{board.name}</h1>
          {board.is_private ? (
            <CiLock className="size-7 ml-4" />
          ) : (
            <CiGlobe className="size-7 ml-4" />
          )}
          {board.is_private ? (
            <span className="ml-1 text-base">private</span>
          ) : (
            <span className="ml-1 text-base">public</span>
          )}
        </div>
        <div className="flex flex-row-reverse items-center basis-1/2 h-full">
          <CiSettings className="size-7" />
          <CiUser
            onClick={() => navigate('members')}
            className="size-7 mr-4 cursor-pointer"
          />
          <LiaUserShieldSolid className="size-7 mr-4" />
        </div>
      </div>
      <div className="flex grow max-w-full">
        <Outlet />
      </div>
    </div>
  );
}
