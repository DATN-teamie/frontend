import { useState } from 'react';
import { IoIosArrowRoundBack } from 'react-icons/io';
import default_file_image from '../../assets/default_file_image.png';
import updateBoardApi from '../../api/board/updateBoard.api';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';
import default_board_cover from '../../assets/default_board_cover.jpg';
import { IMG_URL } from '../../constant/common';
import AlertBar from '../../components/AlertBar';

export default function UpdateBoard() {
  const navigate = useNavigate();
  const currentBoard = useStore((state) => state.currentBoard);
  const revalidator = useRevalidator();

  const srcImg = currentBoard.cover_img
    ? IMG_URL + currentBoard.cover_img
    : default_board_cover;

  const [boardName, setBoardName] = useState(currentBoard.name);
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

  const updateBoard = async () => {
    clearState();
    setLoading(true);
    const response = await updateBoardApi({
      board_id: currentBoard.id,
      cover_img: imageFile,
      name: boardName,
    });
    console.log(response);
    if (response.status === 403) {
      clearState();
      setAlertBar({
        type: 'error',
        message: 'You dont have permission to update this board',
        isAlertVisible: true,
      });
      return;
    }
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
    navigate('..');
    revalidator.revalidate();
  };

  const clearState = () => {
    setSuccess(false);
    setLoading(false);
  };

  return (
    <div className="flex grow justify-center">
      <IoIosArrowRoundBack
        onClick={() => navigate('..')}
        className="size-10 cursor-pointer"
      />
      <div className="flex flex-col  w-[40rem] px-16 space-y-10 border-2  shadow-lg">
        <h1 className="mt-5 font-bold text-3xl">Update Board</h1>
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
        <label className="input input-bordered flex items-center gap-2">
          <input
            type="text"
            className="w-full"
            placeholder="Board Name"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </label>
        <label className="label cursor-pointer">
          <span className="label-text">is Private</span>
          <input
            type="checkbox"
            className="toggle checked:bg-black"
            disabled
            checked={currentBoard.is_private ? true : false}
          />
        </label>

        {success ? (
          <div className="flex space-x-3 items-center">
            <img src={success_verify_svg} alt="success" className="size-8" />
            <span className="text-green-500">success update board</span>
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
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
