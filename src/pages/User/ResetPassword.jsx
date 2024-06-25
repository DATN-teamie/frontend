import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import AlertBar from '../../components/AlertBar';
import resetPassword from '../../api/user/resetPassword';
import { useStore } from '../../hook/useStore';
import { sleep } from '../../helper/sleep';
import { useNavigate, useRevalidator } from 'react-router-dom';
import logoutApi from '../../api/auth/logout.api';

export default function ResetPassword() {
  const authUser = useStore((state) => state.authUser);
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [typeCurrentPassword, setTypeCurrentPassword] = useState('password');
  const [typeNewPassword, setTypeNewPassword] = useState('password');
  const [typeReNewPassword, setTypeReNewPassword] = useState('password');
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    type: 'success',
    message: '',
  });

  const changePasswordHandler = async () => {
    const response = await resetPassword({
      email: authUser.email,
      current_password: currentPassword,
      new_password: newPassword,
      confirm_password: reNewPassword,
    });
    if (response.status == 422) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: response.data.message,
      });
      return;
    }
    if (response.status == 401) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'Current password is incorrect',
      });
      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        // message: 'Something went wrong',
        message: response.data.message,
      });
      return;
    }
    setAlertBar({
      isAlertVisible: true,
      type: 'success',
      message: 'Password changed successfully, you will be logged out.',
    });
    await sleep(1200);
    revalidator.revalidate();
    await sleep(1000);
    navigate('/login');
  };

  return (
    <div className="flex grow justify-center ">
      <div className="flex flex-col  w-[40rem] px-16 space-y-10 border-2  shadow-lg">
        <h1 className="mt-5 font-bold text-3xl">Change Password</h1>

        <div className="flex flex-col">
          <label className="text-lg">Current Password</label>
          <div className="relative">
            <input
              type={typeCurrentPassword}
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <IoEyeOutline
              onClick={() =>
                setTypeCurrentPassword(
                  typeCurrentPassword === 'password' ? 'text' : 'password'
                )
              }
              className="absolute right-3 top-3 text-gray-500 size-5 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-lg">New Password</label>
          <div className="relative">
            <input
              type={typeNewPassword}
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <IoEyeOutline
              onClick={() =>
                setTypeNewPassword(
                  typeNewPassword === 'password' ? 'text' : 'password'
                )
              }
              className="absolute right-3 top-3 text-gray-500 size-5 cursor-pointer"
            />
          </div>
        </div>

        <div className="flex flex-col">
          <label className="text-lg">Enter New Password Again</label>
          <div className="relative">
            <input
              type={typeReNewPassword}
              className="border-2 border-gray-300 rounded-md p-2 w-full"
              onChange={(e) => setReNewPassword(e.target.value)}
            />
            <IoEyeOutline
              onClick={() =>
                setTypeReNewPassword(
                  typeReNewPassword === 'password' ? 'text' : 'password'
                )
              }
              className="absolute right-3 top-3 text-gray-500 size-5 cursor-pointer"
            />
          </div>
        </div>
        <button onClick={changePasswordHandler} className="btn btn-primary">
          Change Password
        </button>
      </div>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
