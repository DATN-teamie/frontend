import { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import default_file_image from '../../assets/default_file_image.png';
import updateBoardApi from '../../api/board/updateBoard.api';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import { IMG_URL } from '../../constant/common';

export default function ItemOverview() {
  const navigate = useNavigate();
  const currentBoard = useStore((state) => state.currentBoard);
  const revalidator = useRevalidator();

  const [itemName, setItemName] = useState(currentBoard.name);
  const [description, setDescription] = useState('');
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

  const updateBoard = async () => {
    clearState();
    setLoading(true);
    const response = await updateBoardApi({
      board_id: currentBoard.id,
      cover_img: imageFile,
      name: itemName,
    });
    console.log(response);
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
    <div className="flex grow justify-center">
      <div className="flex flex-col w-[40rem] px-16  border-2  shadow-lg">
        <label className="mt-5 input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="w-full"
            placeholder="Item Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
          />
        </label>

        <h1 className="mt-7 font-bold">description</h1>
        <textarea className="textarea textarea-bordered h-36 mt-3"></textarea>

        <div className="flex  mt-7">{error}</div>

        <div className="mt-7">
          {success ? (
            <div className="flex space-x-3 items-center">
              <img src={success_verify_svg} alt="success" className="size-8" />
              <span className="text-green-500">success update item</span>
            </div>
          ) : loading ? (
            <span className="loading loading-spinner "></span>
          ) : (
            <button
              className="btn btn-primary w-full"
              onClick={() => updateBoard()}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
