import { useState } from 'react';
import default_file_image from '../../assets/default_file_image.png';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate, useRevalidator } from 'react-router-dom';
import createBoardApi from '../../api/board/createBoard.api';
import { useStore } from '../../hook/useStore';

export default function CreateBoard() {
  const navigate = useNavigate();
  const revalidator = useRevalidator();
  const currentWorkspace = useStore((state) => state.currentWorkspace);
  const [boardName, setBoardName] = useState('');
  const [isPrivate, setIsPrivate] = useState(false);
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

  const createBoard = async () => {
    clearState();
    setLoading(true);
    const response = await createBoardApi({
      workspace_id: currentWorkspace.id,
      cover_img: imageFile,
      name: boardName,
      isPrivate: isPrivate,
    });
    if (!response.ok) {
      clearState();
      setError(response.data.message);
      return;
    }
    clearState();
    setSuccess(true);
    navigate('..');
    revalidator.revalidate();
  };

  const clearState = () => {
    setFileError('');
    setError('');
    setSuccess(false);
    setLoading(false);
  };

  return (
    <div className="flex grow justify-center ">
      <div className="flex flex-col  w-[40rem] px-16 space-y-10 border-2  shadow-lg">
        <h1 className="mt-5 font-bold text-3xl">Create Board</h1>
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
        <span className="text-red-500">{fileError}</span>
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="w-full"
            placeholder="Board Name"
            onChange={(e) => setBoardName(e.target.value)}
          />
        </label>
        <div className="form-control">
          <label className="label cursor-pointer">
            <div
              className="tooltip tooltip-right"
              data-tip="if board is private, you must invite people to this board"
            >
              <span className="">Is Private?</span>
            </div>

            <input
              type="checkbox"
              className="toggle toggle-primary"
              checked={isPrivate}
              onChange={(e) => setIsPrivate(e.target.checked)}
            />
          </label>
        </div>
        {success ? (
          <div className="flex space-x-3 items-center">
            <img src={success_verify_svg} alt="success" className="size-8" />
            <span className="text-green-500">success create new board</span>
          </div>
        ) : loading ? (
          <span className="loading loading-spinner "></span>
        ) : (
          <button
            className="btn btn-primary w-full"
            onClick={() => createBoard()}
          >
            Create Board
          </button>
        )}

        <span className="text-red-500">{error}</span>
      </div>
    </div>
  );
}
