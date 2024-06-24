import {
  Outlet,
  useLoaderData,
  useNavigate,
  useRevalidator,
} from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import { CiLock, CiGlobe, CiUser, CiSettings } from 'react-icons/ci';
import { LiaUserShieldSolid } from 'react-icons/lia';
import { useState } from 'react';
import deleteBoard from '../../api/board/deleteBoard';
import leaveBoard from '../../api/board/leaveBoard';
import AlertBar from '../../components/AlertBar';
import { BiDoorOpen } from 'react-icons/bi';

export default function BoardTopBar() {
  const { board } = useLoaderData();
  const revalidator = useRevalidator();
  const navigate = useNavigate();
  const updateBoard = useStore((state) => state.updateBoard);
  updateBoard(board);
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    type: 'success',
    message: '',
  });

  const deleteBoardHandler = async () => {
    const response = await deleteBoard(board.id);
    if (response.status == 403) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'You dont have permission to delete this board',
      });
      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'Something went wrong',
      });
      return;
    }
    navigate(`/h/w/${board.workspace_id}`);
    revalidator.revalidate();
  };

  const leaveBoardHandler = async () => {
    const response = await leaveBoard({ board_id: board.id });
    if (response.status == 403) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: response.data.message,
      });

      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        // message: 'something went wrong',
        message: response.data.message,
      });
      return;
    }
    navigate(`/h/w/${board.workspace_id}`);
    revalidator.revalidate();
  };

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
          {board.is_private ? (
            <BiDoorOpen
              onClick={() => {
                document.getElementById('leave_board_modal').showModal();
              }}
              className="size-7 cursor-pointer hover:bg-gray-200 rounded-md text-red-500"
            />
          ) : null}
          <CiSettings
            onClick={() => navigate('board-update')}
            className="size-7 mr-4 cursor-pointer hover:bg-gray-200 rounded-md"
          />
          <CiUser
            onClick={() => navigate('members')}
            className="size-7 mr-4 cursor-pointer hover:bg-gray-200 rounded-md"
          />
          <LiaUserShieldSolid
            onClick={() => navigate('board-role-setting')}
            className="size-7 mr-4 cursor-pointer hover:bg-gray-200 rounded-md"
          />
        </div>

        <button
          className="btn text-red-400 ml-3 hover:bg-red-500 hover:text-white"
          onClick={() => {
            document.getElementById('delete_board_modal').showModal();
          }}
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
              <button
                onClick={deleteBoardHandler}
                className="btn bg-red-500 text-white"
              >
                Delete
              </button>
            </div>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>

        <dialog id="leave_board_modal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg text-red-500">Leave Board</h3>
            <p className="py-4">Are you sure want to leave this board ?</p>
            <div className="flex flex-row justify-end">
              <button
                onClick={() =>
                  document.getElementById('leave_board_modal').close()
                }
                className="btn bg-gray-300 mr-3"
              >
                Cancel
              </button>
              <button
                onClick={leaveBoardHandler}
                className="btn bg-red-500 text-white"
              >
                Leave
              </button>
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
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
