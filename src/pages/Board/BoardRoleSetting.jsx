import { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import AlertBar from '../../components/AlertBar';
import deleteBoardRole from '../../api/board/deleteBoardRole';

export default function BoardRoleSetting() {
  const revalidator = useRevalidator();
  const { boardRoles } = useLoaderData();
  const currentBoard = useStore((state) => state.currentBoard);
  const navigate = useNavigate();
  const [currentSelectRoleId, setCurrentSelectRoleId] = useState(null);
  const [alertBar, setAlertBar] = useState({
    type: 'success',
    message: '',
    isAlertVisible: false,
  });

  const renderRoles = boardRoles.map((role) => {
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
              onClick={() => navigate(`../board-edit-role/${role.id}`)}
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
                document.getElementById('delete_role_board_modal').showModal();
              }}
            />
          )}
        </td>
        <td>
          <span style={{ color: role.create_container ? 'green' : 'red' }}>
            {role.create_container ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.remove_container ? 'green' : 'red' }}>
            {role.remove_container ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.create_item ? 'green' : 'red' }}>
            {role.create_item ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.remove_item ? 'green' : 'red' }}>
            {role.remove_item ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span
            style={{ color: role.member_board_management ? 'green' : 'red' }}
          >
            {role.member_board_management ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.role_board_management ? 'green' : 'red' }}>
            {role.role_board_management ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span
            style={{ color: role.item_member_management ? 'green' : 'red' }}
          >
            {role.item_member_management ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.attachment_management ? 'green' : 'red' }}>
            {role.attachment_management ? 'yes' : 'no'}
          </span>
        </td>
        <td>
          <span style={{ color: role.checklist_management ? 'green' : 'red' }}>
            {role.checklist_management ? 'yes' : 'no'}
          </span>
        </td>
      </tr>
    );
  });

  const deleteRoleHandler = async () => {
    const response = await deleteBoardRole({
      board_id: currentBoard.id,
      board_role_id: currentSelectRoleId,
    });
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
    document.getElementById('delete_role_board_modal').close();
    revalidator.revalidate();
  };

  return (
    <div className="flex  grow p-5 overflow-scroll">
      <div className="overflow-x-auto">
        <h1 className="font-bold text-lg mb-5">Board role settings</h1>

        <button
          onClick={() => navigate('../board-create-role')}
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
              <th>create container</th>
              <th>remove container</th>
              <th>create item</th>
              <th>remove item</th>
              <th>member management</th>
              <th>role management</th>
              <th>item member management</th>
              <th>attachment management</th>
              <th>checklist management</th>
            </tr>
          </thead>
          <tbody>{renderRoles}</tbody>
        </table>
      </div>
      <dialog id="delete_role_board_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg text-red-500">Delete Role</h3>
          <p className="py-4">Are you sure want to delete this role ?</p>
          <div className="flex flex-row justify-end">
            <button
              onClick={() =>
                document.getElementById('delete_role_board_modal').close()
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
