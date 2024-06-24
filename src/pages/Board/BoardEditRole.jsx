import { useState } from 'react';
import updateRoleBoard from '../../api/board/updateRoleBoard';
import success_verify_svg from '../../assets/success_verify.svg';
import { useLoaderData, useNavigate, useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import { IoIosArrowRoundBack } from 'react-icons/io';
import AlertBar from '../../components/AlertBar';

export default function BoardEditRole() {
  const currentBoard = useStore((state) => state.currentBoard);
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const { roleBoard } = useLoaderData();
  const [roleName, setRoleName] = useState(roleBoard.name);
  const [isCreateContainer, setIsCreateContainer] = useState(
    roleBoard.create_container
  );
  const [isRemoveContainer, setIsRemoveContainer] = useState(
    roleBoard.remove_container
  );
  const [isCreateItem, setIsCreateItem] = useState(roleBoard.create_item);
  const [isRemoveItem, setIsRemoveItem] = useState(roleBoard.remove_item);
  const [isMemberBoardManage, setIsMemberBoardManage] = useState(
    roleBoard.member_board_management
  );
  const [isRoleManage, setIsRoleManage] = useState(
    roleBoard.role_board_management
  );
  const [isItemMemberManage, setIsItemMemberManage] = useState(
    roleBoard.item_member_management
  );
  const [isAttachmentManage, setIsAttachmentManage] = useState(
    roleBoard.attachment_management
  );
  const [isChecklistManage, setIsChecklistManage] = useState(
    roleBoard.checklist_management
  );
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
    const response = await updateRoleBoard({
      board_id: currentBoard.id,
      role_board_id: roleBoard.id,
      name: roleName,
      create_container: isCreateContainer,
      remove_container: isRemoveContainer,
      create_item: isCreateItem,
      remove_item: isRemoveItem,
      member_board_management: isMemberBoardManage,
      role_board_management: isRoleManage,
      item_member_management: isItemMemberManage,
      attachment_management: isAttachmentManage,
      checklist_management: isChecklistManage,
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
    navigate('../board-role-setting');
    revalidator.revalidate();
  };

  const clearState = () => {
    setSuccess(false);
    setLoading(false);
  };

  return (
    <div className="flex grow justify-center">
      <IoIosArrowRoundBack
        onClick={() => navigate('../board-role-setting')}
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
          <h1 className="">create container</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isCreateContainer}
            onChange={() => setIsCreateContainer(!isCreateContainer)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">remove container</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isRemoveContainer}
            onChange={() => setIsRemoveContainer(!isRemoveContainer)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">create item</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isCreateItem}
            onChange={() => setIsCreateItem(!isCreateItem)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">remove item</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isRemoveItem}
            onChange={() => setIsRemoveItem(!isRemoveItem)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">member board management : add, delete</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isMemberBoardManage}
            onChange={() => setIsMemberBoardManage(!isMemberBoardManage)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">role board management: add, delete, edit</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isRoleManage}
            onChange={() => setIsRoleManage(!isRoleManage)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">item member management: add, delete</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isItemMemberManage}
            onChange={() => setIsItemMemberManage(!isItemMemberManage)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">attachment management: add, delete</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isAttachmentManage}
            onChange={() => setIsAttachmentManage(!isAttachmentManage)}
          />
        </div>

        <div className="flex justify-between items-center">
          <h1 className="">checklist management: add, delete</h1>
          <input
            type="checkbox"
            className=" h-5 w-5 text-blue-600"
            checked={isChecklistManage}
            onChange={() => setIsChecklistManage(!isChecklistManage)}
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
