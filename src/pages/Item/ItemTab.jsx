import { Outlet, NavLink, useNavigate, useLoaderData } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useStore } from '../../hook/useStore';

export default function ItemTab() {
  const navigate = useNavigate();

  const { item } = useLoaderData();
  const updateItem = useStore((state) => state.updateItem);
  updateItem(item);

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row w-full h-14 items-center border-b-2">
        <IoIosArrowRoundBack
          onClick={() => navigate('..')}
          className="size-7 mx-4 cursor-pointer"
        />

        <h1 className="mx-5 text-lg font-bold">{item.title}</h1>

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
          <p>Overview</p>
        </NavLink>
        <NavLink
          to="members"
          className={({ isActive, isPending }) =>
            'p-4 hover:border-b-[6px] hover:border-b-slate-200 ' +
            (isActive
              ? 'border-b-[6px] border-b-slate-400'
              : isPending
              ? ''
              : '')
          }
        >
          <p>Members</p>
        </NavLink>
        <NavLink
          to="attachments"
          className={({ isActive, isPending }) =>
            'p-4 hover:border-b-[6px] hover:border-b-slate-200 ' +
            (isActive
              ? 'border-b-[6px] border-b-slate-400'
              : isPending
              ? ''
              : '')
          }
        >
          <p>Attachments</p>
        </NavLink>
        <NavLink
          to="checklists"
          className={({ isActive, isPending }) =>
            'p-4 hover:border-b-[6px] hover:border-b-slate-200 ' +
            (isActive
              ? 'border-b-[6px] border-b-slate-400'
              : isPending
              ? ''
              : '')
          }
        >
          <p>Checklists</p>
        </NavLink>
      </div>
      <div className="flex flex-grow">
        <Outlet />
      </div>
    </div>
  );
}
