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
          <CiSettings
            onClick={() => navigate('board-update')}
            className="size-7 cursor-pointer hover:bg-gray-200 rounded-md"
          />
          <CiUser
            onClick={() => navigate('members')}
            className="size-7 mr-4 cursor-pointer hover:bg-gray-200 rounded-md"
          />
          <LiaUserShieldSolid className="size-7 mr-4 hover:bg-gray-200 rounded-md" />
        </div>

        <button
          className="btn text-red-400 ml-3 hover:bg-red-500 hover:text-white"
          onClick={() =>
            document.getElementById('delete_board_modal').showModal()
          }
        >
          Delete Board
        </button>
        <dialog id="delete_board_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-500">Delete Board</h3>
            <p className="py-4">Are you sure want to delete this board ?</p>
            <div className="flex flex-row justify-end">
              <button
                onClick={() =>
                  document.getElementById('delete_board_modal').close()
                }
                className="btn bg-gray-300 mr-3"
              >
                Cancel
              </button>
              <button className="btn bg-red-500 text-white">Delete</button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
      <div className="flex grow max-w-full">
        <Outlet />
      </div>
    </div>
  );
}
