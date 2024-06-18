import { useLoaderData, useRevalidator } from 'react-router-dom';
import { IMG_URL } from '../../constant/common';
import default_avatar from '../../assets/default_avatar.jpg';
import { CiTrash } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import getListWspRoleApi from '../../api/workspace/getListWspRole';
import { useStore } from '../../hook/useStore';
import assignWspRole from '../../api/workspace/assignWspRole';

export default function WspMemberList() {
  const { users } = useLoaderData();
  const authUser = useStore((state) => state.authUser);
  const revalidator = useRevalidator();
  const currentWorkspace = useStore((state) => state.currentWorkspace);
  const [workspaceRoles, setWorkspaceRoles] = useState([]);
  const [currentSelectUserId, setCurrentSelectUserId] = useState(null);
  const [assignError, setAssignError] = useState('');

  useEffect(() => {
    async function getWorkspaceRoles() {
      const response = await getListWspRoleApi({
        workspace_id: currentWorkspace.id,
      });
      if (response.ok) {
        setWorkspaceRoles(response.data.workspaceRoles);
      }
    }
    getWorkspaceRoles();
  }, [currentWorkspace.id]);

  const assignRole = async (user_id, workspace_id, worskpace_role_id) => {
    setAssignError('');
    const response = await assignWspRole({
      user_id,
      workspace_id,
      workspace_role_id: worskpace_role_id,
    });

    if (response.status === 403) {
      setAssignError('You dont have permission to assign role');
      return;
    }

    if (response.ok) {
      revalidator.revalidate();
      setAssignError('');
    }
  };

  const workspaceRolesRender = workspaceRoles.map((role) => {
    if (role.name !== 'owner') {
      return (
        <li key={role.id}>
          <button
            onClick={() => {
              assignRole(currentSelectUserId, currentWorkspace.id, role.id);
            }}
          >
            {role.name}
          </button>
        </li>
      );
    }
    return null;
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

        <td>
          {user.workspace_role_name === 'owner' ? (
            <div className="badge badge-success w-fit h-8 bg-green-400">
              owner
              {user.id === authUser.id && <span className="ml-1">(you)</span>}
            </div>
          ) : user.id === authUser.id ? (
            <div className="badge badge-success w-fit h-8 bg-orange-300">
              {user.workspace_role_name}
              <span className="ml-1">(you)</span>
            </div>
          ) : (
            <div className="dropdown">
              <div
                onClick={() => setCurrentSelectUserId(user.id)}
                tabIndex={0}
                role="button"
                className="btn m-1"
              >
                {user.workspace_role_name}
              </div>
              <ul
                tabIndex={0}
                className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52"
              >
                {workspaceRolesRender}
              </ul>
            </div>
          )}
        </td>

        <th>
          <button className="btn btn-ghost btn-xs">details</button>
        </th>
        <th>
          {user.workspace_role_name !== 'owner' && user.id !== authUser.id ? (
            <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
          ) : null}
        </th>
      </tr>
    );
  });

  return (
    <div className="flex flex-col grow overflow-scroll">
      {assignError && (
        <span className="text-red-500 self-center">{assignError}</span>
      )}
      <div name="daisyui-table" className="overflow-x-auto grow">
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
