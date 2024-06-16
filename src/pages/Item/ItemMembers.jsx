import { IMG_URL } from '../../constant/common';
import default_avatar from '../../assets/default_avatar.jpg';
import ItemMemberAdd from './ItemMemberAdd';
import { useLoaderData } from 'react-router-dom';

export default function ItemMembers() {
  const { users } = useLoaderData();


  const usersRender = users.map((user) => {
    const avatar = user.avatar ? IMG_URL + user.avatar : default_avatar;
    return (
      <tr key={user.id}>
        <th>
          <label>
            <input type="checkbox" className="checkbox" />
          </label>
        </th>
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
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
      </tr>
    );
  });

  return (
    <div className='flex flex-row grow'>
      <div name="daisyui-table" className="basis-1/2 overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
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
    </div>
  );
}
