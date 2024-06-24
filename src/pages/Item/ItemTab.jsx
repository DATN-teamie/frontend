import { Outlet, NavLink, useNavigate, useLoaderData } from 'react-router-dom';
import { IoIosArrowRoundBack } from 'react-icons/io';
import { useStore } from '../../hook/useStore';
import { CiTrash } from 'react-icons/ci';
import AlertBar from '../../components/AlertBar';
import { useState } from 'react';
import deleteItem from '../../api/item/deleteItem';

export default function ItemTab() {
  const navigate = useNavigate();
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    type: 'success',
    message: '',
  });

  const { item } = useLoaderData();
  const updateItem = useStore((state) => state.updateItem);
  updateItem(item);

  const deleteItemHandler = async () => {
    const response = await deleteItem({ item_id: item.id });
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
        message: 'something went wrong',
      });
      return;
    }
    navigate('..');
  };

  return (
    <div className="flex flex-col flex-grow">
      <div className="flex flex-row w-full h-14 items-center border-b-2">
        <IoIosArrowRoundBack
          onClick={() => navigate('..')}
          className="size-7 mx-4 cursor-pointer"
        />

        <h1 className="mx-5 text-lg font-bold">{item.title}</h1>

        <CiTrash
          onClick={() =>
            document.getElementById('delete_item_modal').showModal()
          }
          className="size-6 cursor-pointer text-red-500 mx-3 hover:bg-gray-200"
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

      <dialog id="delete_item_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Delete Item</h3>
          <p className="py-4">Are you sure want to delete this item ?</p>
          <div className="flex flex-row justify-end">
            <button
              onClick={() =>
                document.getElementById('delete_item_modal').close()
              }
              className="btn bg-gray-300 mr-3"
            >
              Cancel
            </button>
            <button
              onClick={deleteItemHandler}
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

      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
