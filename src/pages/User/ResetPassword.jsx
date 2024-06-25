import { useState } from 'react';
import { IoEyeOutline } from 'react-icons/io5';

export default function ResetPassword() {
  const [typeCurrentPassword, setTypeCurrentPassword] = useState('password');
  const [typeNewPassword, setTypeNewPassword] = useState('password');
  const [typeReNewPassword, setTypeReNewPassword] = useState('password');

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
        <button className='btn btn-primary'>Change Password</button>
      </div>
    </div>
  );
}
