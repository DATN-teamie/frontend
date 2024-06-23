import { useState } from 'react';
import success_verify_svg from '../../assets/success_verify.svg';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import { IoIosArrowRoundBack } from 'react-icons/io';
import updateRoleWsp from '../../api/workspace/updateRoleWsp';
import AlertBar from '../../components/AlertBar';

export default function WspEditRole() {
  const currentWorkpace = useStore((state) => state.currentWorkspace);
  const { roleWsp } = useLoaderData();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [roleName, setRoleName] = useState(roleWsp.name);
  const [isCreateBoard, setIsCreateBoard] = useState(roleWsp.create_board);
  const [isUpdateBoard, setIsUpdateBoard] = useState(roleWsp.update_board);
  const [isDeleteBoard, setIsDeleteBoard] = useState(roleWsp.delete_board);
  const [isInviteUser, setIsInviteUser] = useState(roleWsp.invite_user);
  const [isRemoveUser, setIsRemoveUser] = useState(roleWsp.remove_user);
  const [isCreateRole, setIsCreateRole] = useState(roleWsp.create_role);
  const [isUpdateRole, setIsUpdateRole] = useState(roleWsp.update_role);
  const [isRemoveRole, setIsRemoveRole] = useState(roleWsp.remove_role);
  const [isAssignRole, setIsAssignRole] = useState(roleWsp.assign_role);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertBar, setAlertBar] = useState({
    message: '',
    type: 'success',
    isAlertVisible: false,
  });

  const editRole = async () => {
    clearState();
    setLoading(true);
    const response = await updateRoleWsp({
      role_wsp_id: roleWsp.id,
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
    if (response.status === 403) {
      clearState();
      setAlertBar({
        message: 'You dont have permission to edit role',
        type: 'error',
        isAlertVisible: true,
      });
      return;
    }
    if (!response.ok) {
      clearState();
      setAlertBar({
        message: response.data.message,
        type: 'error',
        isAlertVisible: true,
      });
      return;
    }
    clearState();
    setSuccess(true);
    navigate('../workspace-role-setting');
    revalidator.revalidate();
  };

  const clearState = () => {
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
        <h1 className="mt-5 font-bold text-3xl">Edit Role</h1>
        <div className="flex flex-row justify-center items-center space-x-5"></div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="w-full h-20"
            placeholder="Role Name"
            onChange={(e) => setRoleName(e.target.value)}
            value={roleName}
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
          <h1 className="">edit role</h1>
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

        {success ? (
          <div className="flex space-x-3 items-center">
            <img src={success_verify_svg} alt="success" className="size-8" />
            <span className="text-green-500">success create new Role</span>
          </div>
        ) : loading ? (
          <span className="loading loading-spinner "></span>
        ) : (
          <button className="btn btn-primary w-full" onClick={() => editRole()}>
            Edit Role
          </button>
        )}
      </div>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
