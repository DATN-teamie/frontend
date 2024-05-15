import { Outlet, NavLink } from 'react-router-dom';

export default function WspMemberTab() {
  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row w-full h-14 items-center border-b-2">
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
      </div>
      <div className="flex flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
