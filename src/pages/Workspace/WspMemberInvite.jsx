import { useState } from 'react';
import { useStore } from '../../hook/useStore';
import { CiSearch } from 'react-icons/ci';
import default_avatar from '../../assets/default_avatar.jpg';
import getUsersNotInWsp from '../../api/workspace/getUsersNotInWsp';
import inviteUserWspApi from '../../api/workspace/inviteUsersWsp';
import success_verify_svg from '../../assets/success_verify.svg';

import { IMG_URL } from '../../constant/common';

export default function WspMemberInvite() {
  const currentWorkspace = useStore((state) => state.currentWorkspace);
  const [search, setSearch] = useState('');
  const [searchUsers, setSearchUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSearchUsers = async () => {
    setLoading(true);
    setSearchUsers([]);
    const response = await getUsersNotInWsp({
      workspace_id: currentWorkspace.id,
      search: search,
    });
    if (response.ok) {
      const userNotInWsp = response.data.users.data;
      if (Array.isArray(userNotInWsp)) {
        setSearchUsers(userNotInWsp);
      }
    }
    setLoading(false);
  };

  const inviteUsersWsp = async () => {
    if (selectedUsers.length === 0) {
      return;
    }
    const user_ids = selectedUsers.map((user) => user.id);
    const response = await inviteUserWspApi({
      workspace_id: currentWorkspace.id,
      user_ids: user_ids,
    });
    console.log(response);
    if (response.ok) {
      setSuccess(true);
      setSelectedUsers([]);
      setSearchUsers([]);
      setTimeout(() => {
        setSuccess(false);
      }, 1000);
    }
  };

  const searchUsersRender = () => {
    return searchUsers.map((user) => {
      const avatar = user.avatar ? IMG_URL + user.avatar : default_avatar;

      return (
        <div
          onClick={() => {
            if (
              !selectedUsers.some((selectedUser) => selectedUser.id === user.id)
            ) {
              setSelectedUsers([...selectedUsers, user]);
            }
          }}
          key={user.id}
          className="flex flex-row items-center w-full p-3 hover:bg-gray-100 cursor-pointer"
        >
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={avatar || default_avatar} />
            </div>
          </div>
          <div className="flex flex-col ml-4">
            <span className="">{user.name}</span>
            <span className="italic">{user.email}</span>
          </div>
        </div>
      );
    });
  };

  const selectedUsersRender = () => {
    return selectedUsers.map((user) => {
      const avatar = user.avatar ? IMG_URL + user.avatar : default_avatar;

      return (
        <div
          onClick={() =>
            setSelectedUsers(
              selectedUsers.filter(
                (selectedUser) => selectedUser.id !== user.id
              )
            )
          }
          key={user.id}
          className="flex flex-row items-center w-full p-3 hover:bg-gray-100 cursor-pointer"
        >
          <div className="avatar">
            <div className="w-10 rounded-full">
              <img src={avatar || default_avatar} />
            </div>
          </div>
          <div className="flex flex-col ml-4">
            <span className="">{user.name}</span>
            <span className="italic">{user.email}</span>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex grow justify-center ">
      <div className="flex flex-col  w-[40rem] px-16  border-x-2 shadow-lg items-center">
        <div className="flex flex-row justify-center mt-5">
          <label className="input input-bordered flex items-center gap-2">
            <input
              onChange={(e) => setSearch(e.target.value)}
              type="text"
              className="grow"
              placeholder="Search"
            />
            <CiSearch />
          </label>
          <button
            onClick={() => onSearchUsers()}
            className="btn btn-primary ml-7"
          >
            Search
          </button>
        </div>

        <div className="flex flex-col w-full h-52 max-h-52 mt-5 border-2 rounded-lg overflow-y-scroll overflow-x-clip">
          {loading ? (
            <span className="loading loading-bars loading-lg self-center mt-5"></span>
          ) : (
            ''
          )}
          {searchUsersRender()}
        </div>
        <div className="flex flex-col w-full h-52 max-h-52 border-2 rounded-lg overflow-y-scroll overflow-x-clip">
          {selectedUsersRender()}
        </div>
        {success ? (
          <div className="flex space-x-3 items-center">
            <img src={success_verify_svg} alt="success" className="size-8" />
            <span className="text-green-500">Invite Success</span>
          </div>
        ) : (
          <button
            onClick={() => inviteUsersWsp()}
            className="btn btn-primary w-full mt-5"
          >
            Invite
          </button>
        )}
      </div>
    </div>
  );
}
