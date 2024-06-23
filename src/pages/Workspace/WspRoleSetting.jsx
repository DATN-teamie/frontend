import { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import AlertBar from '../../components/AlertBar';
import deleteWspRole from '../../api/workspace/deleteWspRole';

export default function WspRoleSetting() {
  const revalidator = useRevalidator();
  const { workspaceRoles } = useLoaderData();
  const currentWorkspace = useStore((state) => state.currentWorkspace);
  const navigate = useNavigate();
  const [currentSelectRoleId, setCurrentSelectRoleId] = useState(null);
  const [alertBar, setAlertBar] = useState({
    type: 'success',
    message: '',
    isAlertVisible: false,
  });

  const renderRoles = workspaceRoles.map((role) => {
    return (
      <tr key={role.id}>
        <td
          className={
            role.name === 'owner' || role.name === 'everyone'
              ? 'text-primary'
              : 'text-inherit'
          }
        >
          {role.name}
        </td>
        <td>
          {role.name === 'owner' || role.name === 'everyone' ? null : (
            <button
              onClick={() => navigate(`../workspace-edit-role/${role.id}`)}
              className="btn btn-ghost"
            >
              edit
            </button>
          )}
        </td>
        <td>
          {role.name === 'owner' || role.name === 'everyone' ? null : (
            <CiTrash
              className="size-6 cursor-pointer text-red-500 hover:bg-gray-200"
              onClick={() => {
                setCurrentSelectRoleId(role.id);
                document.getElementById('delete_role_wsp_modal').showModal();
              }}
            />
          )}
        </td>
        <td>
          <span style={{ color: role.create_board ? 'green' : 'red' }}>
            {role.create_board ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.update_board ? 'green' : 'red' }}>
            {role.update_board ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.delete_board ? 'green' : 'red' }}>
            {role.delete_board ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.invite_user ? 'green' : 'red' }}>
            {role.invite_user ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.remove_user ? 'green' : 'red' }}>
            {role.remove_user ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.create_role ? 'green' : 'red' }}>
            {role.create_role ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.update_role ? 'green' : 'red' }}>
            {role.update_role ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.remove_role ? 'green' : 'red' }}>
            {role.remove_role ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.assign_role ? 'green' : 'red' }}>
            {role.assign_role ? 'yes' : 'no'}
          </span>
        </td>
      </tr>
    );
  });

  const deleteRoleHandler = async () => {
    const response = await deleteWspRole({
      workspace_id: currentWorkspace.id,
      wsp_role_id: currentSelectRoleId,
    });
    console.log(response);
    if (response.status == 403) {
      setAlertBar({
        type: 'error',
        message: response.data.message,
        isAlertVisible: true,
      });
      return;
    }
    if (!response.ok) {
      setAlertBar({
        type: 'error',
        message: 'Something went wrong',
        isAlertVisible: true,
      });
      return;
    }
    setAlertBar({
      type: 'success',
      message: 'Role deleted successfully',
      isAlertVisible: true,
    });
    document.getElementById('delete_role_wsp_modal').close();
    revalidator.revalidate();
  };

  return (
    <div className="flex  grow p-5 overflow-scroll">
      <div className="overflow-x-auto">
        <h1 className="font-bold text-lg mb-5">Workspace role settings</h1>

        <button
          onClick={() => navigate('../workspace-create-role')}
          className="btn btn-primary mb-5"
        >
          create new role
        </button>

        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th></th>
              <th></th>
              <th>create board</th>
              <th>update board</th>
              <th>delete board</th>
              <th>invite user</th>
              <th>remove user</th>
              <th>create role</th>
              <th>update role</th>
              <th>remove role</th>
              <th>assign role</th>
            </tr>
          </thead>
          <tbody>{renderRoles}</tbody>
        </table>
      </div>
      <dialog id="delete_role_wsp_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Delete Role</h3>
          <p className="py-4">Are you sure want to delete this role ?</p>
          <div className="flex flex-row justify-end">
            <button
              onClick={() =>
                document.getElementById('delete_role_wsp_modal').close()
              }
              className="btn bg-gray-300 mr-3"
            >
              Cancel
            </button>
            <button
              onClick={deleteRoleHandler}
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
