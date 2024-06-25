import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';
import AlertBar from '../../components/AlertBar';
import { sleep } from '../../helper/sleep';
import { useNavigate, useParams, useRevalidator } from 'react-router-dom';
import forgotPassword from '../../api/user/forgotPassword';

export default function ForgotPassword() {
  const { userId, token } = useParams();
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const [newPassword, setNewPassword] = useState('');
  const [reNewPassword, setReNewPassword] = useState('');
  const [typeNewPassword, setTypeNewPassword] = useState('password');
  const [typeReNewPassword, setTypeReNewPassword] = useState('password');
  const [isLoading, setIsLoading] = useState(false);
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    type: 'success',
    message: '',
  });

  const changePasswordHandler = async () => {
    setIsLoading(true);
    const response = await forgotPassword({
      user_id: userId,
      token: token,
      new_password: newPassword,
      confirm_password: reNewPassword,
    });
    if (
      response.status == 422 ||
      response.status == 401 ||
      response.status == 404
    ) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: response.data.message,
      });
      setIsLoading(false);
      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'Something went wrong',
      });
      setIsLoading(false);
      return;
    }
    setAlertBar({
      isAlertVisible: true,
      type: 'success',
      message:
        'Password changed successfully, you will be redirected to login page',
    });
    setIsLoading(false);
    await sleep(2000);
    navigate('/login');
  };

  return (
    <div className="flex grow justify-center">
      <div className="flex flex-col  w-[40rem] p-10 space-y-10 border-2  shadow-lg">
        <h1 className="mt-5 font-bold text-lg">Change Password</h1>

        <div className="flex flex-col">
          <label>New Password</label>
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
          <label>Enter New Password Again</label>
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
        <div className="flex flex-row-reverse">
          <button onClick={() => navigate('/login')} className="btn  w-fit">
            Cancel
          </button>
          {isLoading ? (
            <span className="loading loading-spinner loading-md"></span>
          ) : (
            <button
              onClick={changePasswordHandler}
              className="btn btn-primary  w-fit mr-5"
            >
              Change Password
            </button>
          )}
        </div>
      </div>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
