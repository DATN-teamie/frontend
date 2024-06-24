import { useState } from 'react';
import createBoardRole from '../../api/board/createBoardRole';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import { IoIosArrowRoundBack } from 'react-icons/io';
import AlertBar from '../../components/AlertBar';

export default function BoardCreateRole() {
  const currentBoard = useStore((state) => state.currentBoard);
  const navigate = useNavigate();
  const [roleName, setRoleName] = useState('');
  const [isCreateContainer, setIsCreateContainer] = useState(false);
  const [isRemoveContainer, setIsRemoveContainer] = useState(false);
  const [isCreateItem, setIsCreateItem] = useState(false);
  const [isRemoveItem, setIsRemoveItem] = useState(false);
  const [isMemberBoardManage, setIsMemberBoardManage] = useState(false);
  const [isRoleManage, setIsRoleManage] = useState(false);
  const [isItemMemberManage, setIsItemMemberManage] = useState(false);
  const [isAttachmentManage, setIsAttachmentManage] = useState(false);
  const [isChecklistManage, setIsChecklistManage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertBar, setAlertBar] = useState({
    message: '',
    type: 'success',
    isAlertVisible: false,
  });

  const createRole = async () => {
    clearState();
    setLoading(true);
    const response = await createBoardRole({
      board_id: currentBoard.id,
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
        message: 'You dont have permission to create role',
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
          <h1 className="">role board management: add, delete, edit, assign</h1>
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
          <button
            className="btn btn-primary w-full"
            onClick={() => createRole()}
          >
            Create Role
          </button>
        )}
      </div>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
