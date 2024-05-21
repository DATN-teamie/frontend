import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useStore } from '../../hook/useStore';

export default function BoardMemberTab() {
  const navigate = useNavigate();
  const currentBoard = useStore((state) => state.currentBoard);
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row w-full h-14 items-center border-b-2">
        <IoIosArrowRoundBack
          onClick={() => navigate('..')}
          className="size-7 mx-4 cursor-pointer"
        />
        <NavLink
          to=""
          end
          className={({ isActive, isPending }) =>
            'p-4 hover:border-b-[6px] hover:border-b-slate-200 ' +
            (isActive
              ? 'border-b-[6px] border-b-slate-400'
              : isPending
              ? ''
              : '')
          }
        >
          <p>All Members</p>
        </NavLink>
        {currentBoard.is_private && (
          <NavLink
            to="invite"
            className={({ isActive, isPending }) =>
              'p-4 hover:border-b-[6px] hover:border-b-slate-200 ' +
              (isActive
                ? 'border-b-[6px] border-b-slate-400'
                : isPending
                ? ''
                : '')
            }
          >
            <p>Invites</p>
          </NavLink>
        )}
      </div>
      <div className="flex flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
