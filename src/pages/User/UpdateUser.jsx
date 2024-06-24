import { useState } from 'react';
import default_file_image from '../../assets/default_file_image.png';
import updateAuthUserApi from '../../api/user/updateAuthUser';
import success_verify_svg from '../../assets/success_verify.svg';
import { useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import default_avatar from '../../assets/default_avatar.jpg';
import { IMG_URL } from '../../constant/common';
import AlertBar from '../../components/AlertBar';

export default function UpdateUser() {
  const authUser = useStore((state) => state.authUser);
  const revalidator = useRevalidator();

  const avatar = authUser.avatar ? IMG_URL + authUser.avatar : default_avatar;

  const [name, setName] = useState(authUser.name);
  const [description, setDescription] = useState(authUser.description);
  const [phone, setPhone] = useState(authUser.phone);
  const [address, setAddress] = useState(authUser.address);
  const [title, setTitle] = useState(authUser.title);
  const [imageFile, setImageFile] = useState(null);
  const [imageRender, setImageRender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    type: 'success',
    message: '',
  });

  const selectFile = (e) => {
    const file = e.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'file should be an image',
      });
      return;
    }
    if (file.size > 1024 * 1024 * 5) {
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'File size should be less than 5MB',
      });
      return;
    }
    setImageFile(file);
    setImageRender(URL.createObjectURL(e.target.files[0]));
  };

  const updateProfile = async () => {
    clearState();
    setLoading(true);
    const response = await updateAuthUserApi({
      avatar: imageFile,
      name: name,
      description: description,
      phone: phone,
      address: address,
      title: title,
    });
    if (response.status == 422) {
      clearState();
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: response.data.message,
      });
      return;
    }
    if (!response.ok) {
      clearState();
      setAlertBar({
        isAlertVisible: true,
        type: 'error',
        message: 'something went wrong',
      });
      return;
    }
    clearState();
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
    }, 1000);
    revalidator.revalidate();
  };

  const clearState = () => {
    setSuccess(false);
    setLoading(false);
  };

  return (
    <div className="flex grow">
      <div className="flex flex-col basis-1/3 p-5">
        <div className="avatar">
          <div className="avatar mt-4">
            <div className="w-32 rounded-full">
              <img src={imageRender || avatar || default_file_image} />
            </div>
          </div>
        </div>
        <input
          type="file"
          className="file-input w-full mt-5"
          onChange={selectFile}
        />
      </div>
      <div className="flex flex-col basis-2/3 mt-5">
        <div className="flex flex-row mb-3">
          <span className="font-bold">email: </span>
          <span className="ml-5">{authUser.email}</span>
        </div>
        <div className="flex flex-row">
          <span className="self-center font-bold">name: </span>
          <input
            type="text"
            className="input input-bordered w-64 ml-5"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <span className="self-center ml-5 font-bold">phone: </span>
          <input
            type="text"
            className="input input-bordered w-64 ml-5"
            placeholder="Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <span className="mt-5 font-bold">title: </span>
        <input
          type="text"
          className="input input-bordered w-[51rem]"
          placeholder="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <span className="mt-5 font-bold">address: </span>
        <input
          type="text"
          className="input input-bordered w-[51rem]"
          placeholder="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <span className="mt-5 font-bold">description: </span>
        <textarea
          className="textarea textarea-bordered textarea-lg w-[51rem] h-48"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {success ? (
          <div className="flex space-x-3 items-center mt-10">
            <img src={success_verify_svg} alt="success" className="size-8" />
            <span className="text-green-500">success update profile</span>
          </div>
        ) : loading ? (
          <span className="loading loading-spinner mt-10"></span>
        ) : (
          <button
            className="btn btn-primary w-40 mt-10"
            onClick={() => updateProfile()}
          >
            Save
          </button>
        )}
      </div>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
