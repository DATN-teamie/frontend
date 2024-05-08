import { useState } from 'react';
import default_file_image from '../../assets/default_file_image.png';
import updateWspApi from '../../api/workspace/updateWsp.api';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import default_workspace_cover from '../../assets/default_workspace_cover.jpg';
import { IMG_URL } from '../../constant/common';

export default function UpdateWorkspace() {
  const navigate = useNavigate();
  const currentWorkspace = useStore((state) => state.currentWorkspace);

  const srcImg = currentWorkspace.cover_img
    ? IMG_URL + currentWorkspace.cover_img
    : default_workspace_cover;

  const [workspaceName, setWorkspaceName] = useState(currentWorkspace.name);
  const [description, setDescription] = useState(currentWorkspace.description);
  const [imageFile, setImageFile] = useState(null);
  const [imageRender, setImageRender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fileError, setFileError] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const selectFile = (e) => {
    setFileError('');
    const file = e.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      setFileError('file should be an image');
      return;
    }
    if (file.size > 1024 * 1024 * 5) {
      setFileError('File size should be less than 5MB');
      return;
    }
    setImageFile(file);
    setImageRender(URL.createObjectURL(e.target.files[0]));
  };

  const updateWorkspace = async () => {
    clearState();
    setLoading(true);
    const response = await updateWspApi({
      workspace_id: currentWorkspace.id,
      cover_img: imageFile,
      name: workspaceName,
      description: description,
    });
    console.log(response);
    if (!response.ok) {
      clearState();
      setError(response.data.message);
      return;
    }
    clearState();
    setSuccess(true);
    navigate('');
  };

  const clearState = () => {
    setFileError('');
    setError('');
    setSuccess(false);
    setLoading(false);
  };

  return (
    <div className="flex grow justify-center my-5">
      <div className="flex flex-col  w-[40rem] px-16 space-y-10 border-2  shadow-lg">
        <h1 className="mt-5 font-bold text-3xl">Update Workspace</h1>
        <div className="flex flex-row justify-center items-center space-x-5">
          <div className="avatar">
            <div className="w-24 rounded">
              <img src={imageRender || srcImg || default_file_image} />
            </div>
          </div>
          <input
            type="file"
            className="file-input w-full"
            onChange={selectFile}
          />
        </div>
        <span className="text-red-500">{fileError}</span>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="w-full"
            placeholder="Workspace Name"
            value={workspaceName}
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </label>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {success ? (
          <div className="flex space-x-3 items-center">
            <img src={success_verify_svg} alt="success" className="size-8" />
            <span className="text-green-500">success update workspace</span>
          </div>
        ) : loading ? (
          <span className="loading loading-spinner "></span>
        ) : (
          <button
            className="btn btn-primary w-full"
            onClick={() => updateWorkspace()}
          >
            Save
          </button>
        )}

        <span className="text-red-500">{error}</span>
      </div>
    </div>
  );
}
