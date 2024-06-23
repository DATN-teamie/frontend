import { useState } from 'react';
import default_file_image from '../../assets/default_file_image.png';
import createWspApi from '../../api/workspace/createWsp.api';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate } from 'react-router-dom';
import AlertBar from '../../components/AlertBar';

export default function CreateWorkspace() {
  const navigate = useNavigate();
  const [workspaceName, setWorkspaceName] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [imageRender, setImageRender] = useState(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [alertBar, setAlertBar] = useState({
    type: 'success',
    message: '',
    isAlertVisible: false,
  });

  const selectFile = (e) => {
    const file = e.target.files[0];
    if (file.type.split('/')[0] !== 'image') {
      setAlertBar({
        type: 'error',
        message: 'File type should be image',
        isAlertVisible: true,
      });

      return;
    }
    if (file.size > 1024 * 1024 * 5) {
      setAlertBar({
        type: 'error',
        message: 'File size should be less than 5MB',
        isAlertVisible: true,
      });
      return;
    }
    setImageFile(file);
    setImageRender(URL.createObjectURL(e.target.files[0]));
  };

  const createWorkspace = async () => {
    clearState();
    setLoading(true);
    const response = await createWspApi({
      cover_img: imageFile,
      name: workspaceName,
      description: description,
    });
    console.log(response);
    if (!response.ok) {
      clearState();
      setAlertBar({
        type: 'error',
        message: response.data.message,
        isAlertVisible: true,
      });
      return;
    }
    clearState();
    setSuccess(true);
    navigate('/h');
  };

  const clearState = () => {
    setSuccess(false);
    setLoading(false);
  };

  return (
    <div className="flex grow justify-center ">
      <div className="flex flex-col  w-[40rem] px-16 space-y-10 border-2  shadow-lg">
        <h1 className="mt-5 font-bold text-3xl">Create Workspace</h1>
        <div className="flex flex-row justify-center items-center space-x-5">
          <div className="avatar">
            <div className="w-24 rounded">
              <img src={imageRender || default_file_image} />
            </div>
          </div>
          <input
            type="file"
            className="file-input w-full"
            onChange={selectFile}
          />
        </div>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="w-full"
            placeholder="Workspace Name"
            onChange={(e) => setWorkspaceName(e.target.value)}
          />
        </label>
        <textarea
          className="textarea textarea-bordered textarea-lg w-full"
          placeholder="Description"
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        {success ? (
          <div className="flex space-x-3 items-center">
            <img src={success_verify_svg} alt="success" className="size-8" />
            <span className="text-green-500">success create new workspace</span>
          </div>
        ) : loading ? (
          <span className="loading loading-spinner "></span>
        ) : (
          <button
            className="btn btn-primary w-full"
            onClick={() => createWorkspace()}
          >
            Create Workspace
          </button>
        )}
        <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
      </div>
    </div>
  );
}
