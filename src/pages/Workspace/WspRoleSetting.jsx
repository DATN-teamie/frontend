import { CiTrash } from 'react-icons/ci';
import { useLoaderData, useNavigate } from 'react-router-dom';

export default function WspRoleSetting() {
  const { workspaceRoles } = useLoaderData();
  const navigate = useNavigate();

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
              onClick={() => navigate(`../workspace-delete-role/${role.id}`)}
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
    </div>
  );
}
