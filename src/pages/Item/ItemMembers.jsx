import { IMG_URL } from '../../constant/common';
import default_avatar from '../../assets/default_avatar.jpg';
import ItemMemberAdd from './ItemMemberAdd';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import { CiTrash } from 'react-icons/ci';
import { useState } from 'react';
import AlertBar from '../../components/AlertBar';
import deleteItemMember from '../../api/item/deleteItemMember';
import { useStore } from '../../hook/useStore';

export default function ItemMembers() {
  const { users } = useLoaderData();
  const currentItem = useStore((state) => state.currentItem);
  const revalidator = useRevalidator();
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    message: '',
    type: 'success',
  });

  const usersRender = users.map((user) => {
    const avatar = user.avatar ? IMG_URL + user.avatar : default_avatar;
    return (
      <tr key={user.id}>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={avatar} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{user.name}</div>
            </div>
          </div>
        </td>
        <td>{user.email}</td>
        <th>
          <CiTrash
            onClick={() => {
              deleteUserItemHandler(user.id);
            }}
            className="size-5 text-red-500 cursor-pointer hover:bg-gray-200"
          />
        </th>
      </tr>
    );
  });

  const deleteUserItemHandler = async (user_id) => {
    const response = await deleteItemMember({
      item_id: currentItem.id,
      user_id: user_id,
    });
    if (response.status == 403) {
      setAlertBar({
        isAlertVisible: true,
        message: response.data.message,
        type: 'error',
      });
      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        message: 'Something went wrong',
        type: 'error',
      });
      return;
    }
    setAlertBar({
      isAlertVisible: true,
      message: 'Delete user successfully',
      type: 'success',
    });
    revalidator.revalidate();
  };

  return (
    <div className="flex flex-row grow">
      <div name="daisyui-table" className="basis-1/2 overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{usersRender}</tbody>
        </table>
      </div>
      <div>
        <ItemMemberAdd />
      </div>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
