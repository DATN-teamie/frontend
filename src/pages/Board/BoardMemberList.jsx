import { useLoaderData, useRevalidator } from 'react-router-dom';
import { IMG_URL } from '../../constant/common';
import default_avatar from '../../assets/default_avatar.jpg';
import { CiTrash } from 'react-icons/ci';
import { useStore } from '../../hook/useStore';
import { useState } from 'react';

export default function BoardMemberList() {
  const { users } = useLoaderData();
  const authUser = useStore((state) => state.authUser);
  const revalidator = useRevalidator();
  const [boardRoles, setBoardRoles] = useState([]);
  const [currentSelectUserId, setCurrentSelectUserId] = useState(null);
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    type: 'success',
    message: '',
  });

  const currentBoard = useStore((state) => state.currentBoard);

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

        <td>
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn m-1">
              {user.board_role_name}
            </div>
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a>role 1</a>
              </li>
              <li>
                <a>role 2</a>
              </li>
            </ul>
          </div>
        </td>

        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
        {currentBoard.is_private && (
          <th>
            <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
          </th>
        )}
      </tr>
    );
  });

  return (
    <div className="flex grow">
      <div name="daisyui-table" className="grow overflow-scroll">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{usersRender}</tbody>
        </table>
      </div>
    </div>
  );
}
