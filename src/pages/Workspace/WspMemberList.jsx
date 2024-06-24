import { useLoaderData, useRevalidator } from 'react-router-dom';
import { IMG_URL } from '../../constant/common';
import default_avatar from '../../assets/default_avatar.jpg';
import { CiTrash } from 'react-icons/ci';
import { useEffect, useState } from 'react';
import getListWspRoleApi from '../../api/workspace/getListWspRole';
import { useStore } from '../../hook/useStore';
import assignWspRole from '../../api/workspace/assignWspRole';
import AlertBar from '../../components/AlertBar';
import deleteUserWsp from '../../api/workspace/deleteUserWsp';
import getUserById from '../../api/user/getUserById';

export default function WspMemberList() {
  const { users } = useLoaderData();
  const authUser = useStore((state) => state.authUser);
  const revalidator = useRevalidator();
  const currentWorkspace = useStore((state) => state.currentWorkspace);
  const [workspaceRoles, setWorkspaceRoles] = useState([]);
  const [currentSelectUserId, setCurrentSelectUserId] = useState(null);
  const [currentUserDetail, setCurrentUserDetail] = useState({});
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    type: 'success',
    message: '',
  });

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
    const response = await assignWspRole({
      user_id,
      workspace_id,
      workspace_role_id: worskpace_role_id,
    });

    if (response.status === 403) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: "You don't have permission to assign role to this user",
      });
      return;
    }

    if (response.ok) {
      revalidator.revalidate();
      setAlertBar({
        isAlertVisible: true,
        type: 'success',
        message: 'User role assigned successfully',
      });
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
          <button
            onClick={() => getUserDetailHandler(user.id)}
            className="btn btn-ghost btn-xs"
          >
            details
          </button>
        </th>
        <th>
          {user.workspace_role_name !== 'owner' && user.id !== authUser.id ? (
            <CiTrash
              onClick={() => {
                setCurrentSelectUserId(user.id);
                document.getElementById('delete_user_wsp_modal').showModal();
              }}
              className="size-6 cursor-pointer text-red-500 hover:bg-gray-200"
            />
          ) : null}
        </th>
      </tr>
    );
  });

  const deleteUserWspHanlder = async () => {
    const response = await deleteUserWsp(
      currentWorkspace.id,
      currentSelectUserId
    );
    console.log(response);
    if (response.status == 403) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: "You don't have permission to delete user in Workspace",
      });
      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'Failed to delete user',
      });
      return;
    }
    setAlertBar({
      isAlertVisible: true,
      type: 'success',
      message: 'User deleted successfully',
    });
    revalidator.revalidate();
    document.getElementById('delete_user_wsp_modal').close();
  };

  const getUserDetailHandler = async (user_id) => {
    const response = await getUserById({ user_id });
    if (response.ok) {
      setCurrentUserDetail(response.data.user);
      document.getElementById('user_detail_wsp_modal').showModal();
    }
  };

  return (
    <div className="flex flex-col grow overflow-scroll">
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

      <dialog id="delete_user_wsp_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Delete User</h3>
          <p className="py-4">Are you sure want to delete this user ?</p>
          <div className="flex flex-row justify-end">
            <button
              onClick={() =>
                document.getElementById('delete_user_wsp_modal').close()
              }
              className="btn bg-gray-300 mr-3"
            >
              Cancel
            </button>
            <button
              onClick={deleteUserWspHanlder}
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

      <dialog id="user_detail_wsp_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">User Details</h3>
          <div className="flex flex-row gap-4">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img
                  src={
                    currentUserDetail.avatar
                      ? IMG_URL + currentUserDetail.avatar
                      : default_avatar
                  }
                  alt="Avatar Tailwind CSS Component"
                />
              </div>
            </div>
            <div>
              <div className="font-bold">{currentUserDetail.name}</div>
              <div>{currentUserDetail.email}</div>
            </div>
          </div>
          <div>
            <div className="font-bold mt-3">Description:</div>
            <div>{currentUserDetail.description}</div>
          </div>
          <div>
            <div className="font-bold">Phone:</div>
            <div>{currentUserDetail.phone}</div>
          </div>
          <div>
            <div className="font-bold">Title:</div>
            <div>{currentUserDetail.title}</div>
          </div>
          <div>
            <div className="font-bold">Address:</div>
            <div>{currentUserDetail.address}</div>
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
