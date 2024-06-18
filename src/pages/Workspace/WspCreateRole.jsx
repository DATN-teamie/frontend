import { useState } from 'react';
import createWspRoleApi from '../../api/workspace/createWspRole';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import { IoIosArrowRoundBack } from 'react-icons/io';

export default function WspCreateRole() {
  const currentWorkpace = useStore((state) => state.currentWorkspace);
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState('');
  const [isCreateBoard, setIsCreateBoard] = useState(false);
  const [isUpdateBoard, setIsUpdateBoard] = useState(false);
  const [isDeleteBoard, setIsDeleteBoard] = useState(false);
  const [isInviteUser, setIsInviteUser] = useState(false);
  const [isRemoveUser, setIsRemoveUser] = useState(false);
  const [isCreateRole, setIsCreateRole] = useState(false);
  const [isUpdateRole, setIsUpdateRole] = useState(false);
  const [isRemoveRole, setIsRemoveRole] = useState(false);
  const [isAssignRole, setIsAssignRole] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const createRole = async () => {
    clearState();
    setLoading(true);
    const response = await createWspRoleApi({
      workspace_id: currentWorkpace.id,
      name: roleName,
      create_board: isCreateBoard,
      update_board: isUpdateBoard,
      delete_board: isDeleteBoard,
      invite_user: isInviteUser,
      remove_user: isRemoveUser,
      create_role: isCreateRole,
      update_role: isUpdateRole,
      remove_role: isRemoveRole,
      assign_role: isAssignRole,
    });
    console.log(response);
    if (response.status === 403) {
      clearState();
      setError('You dont have permission to create role');
      return;
    }
    if (!response.ok) {
      clearState();
      setError(response.data.message);
      return;
    }
    clearState();
    setSuccess(true);
    navigate('../workspace-role-setting');
  };

  const clearState = () => {
    setError('');
    setSuccess(false);
    setLoading(false);
  };

  return (
    <div className="flex grow justify-center">
      <IoIosArrowRoundBack
        onClick={() => navigate('../workspace-role-setting')}
        className="size-10 cursor-pointer"
      />

      <div className="flex flex-col  w-[40rem] px-16 space-y-10 border-2  shadow-lg  overflow-scroll">
        <h1 className="mt-5 font-bold text-3xl">Create Role</h1>
        <div className="flex flex-row justify-center items-center space-x-5"></div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="w-full h-20"
            placeholder="Role Name"
            onChange={(e) => setRoleName(e.target.value)}
          />
        </label>

        <div className="flex justify-between items-center">
          <h1 className="">create board</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isCreateBoard}
            onChange={() => setIsCreateBoard(!isCreateBoard)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">update board</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isUpdateBoard}
            onChange={() => setIsUpdateBoard(!isUpdateBoard)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">delete board</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isDeleteBoard}
            onChange={() => setIsDeleteBoard(!isDeleteBoard)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">invite user</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isInviteUser}
            onChange={() => setIsInviteUser(!isInviteUser)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">remove user</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isRemoveUser}
            onChange={() => setIsRemoveUser(!isRemoveUser)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">create role</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isCreateRole}
            onChange={() => setIsCreateRole(!isCreateRole)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">update role</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isUpdateRole}
            onChange={() => setIsUpdateRole(!isUpdateRole)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">remove role</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isRemoveRole}
            onChange={() => setIsRemoveRole(!isRemoveRole)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">assign role to user</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isAssignRole}
            onChange={() => setIsAssignRole(!isAssignRole)}
          />
        </div>
        <span className="text-red-500">{error}</span>

        {success ? (
          <div className="flex space-x-3 items-center">
            <img src={success_verify_svg} alt="success" className="size-8" />
            <span className="text-green-500">success create new Role</span>
          </div>
        ) : loading ? (
          <span className="loading loading-spinner "></span>
        ) : (
          <button
            className="btn btn-primary w-full"
            onClick={() => createRole()}
          >
            Create Role
          </button>
        )}
      </div>
    </div>
  );
}
