import { useState } from 'react';
import updateBoardApi from '../../api/board/updateBoard.api';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';

export default function ItemOverview() {
  const navigate = useNavigate();
  const currentBoard = useStore((state) => state.currentBoard);
  const revalidator = useRevalidator();

  const [itemName, setItemName] = useState(currentBoard.name);
  const [description, setDescription] = useState('');
  const [isStartDate, setIsStartDate] = useState(false);
  const [isDueDate, setIsDueDate] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [dueDate, setDueDate] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const updateBoard = async () => {
    clearState();
    setLoading(true);
    const response = await updateBoardApi({
      board_id: currentBoard.id,
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

        <h1 className="mt-7 font-bold">start date</h1>
        <div className="flex flex-row mt-3 items-center">
          <input
            type="checkbox"
            checked={isStartDate}
            className="size-5 mr-10"
            onChange={(e) => setIsStartDate(e.target.checked)}
          />
          <input
            aria-label="Date and time"
            type="date"
            disabled={isStartDate}
          />
        </div>

        <h1 className="mt-7 font-bold">due date</h1>
        <div className="flex flex-row mt-3 items-center">
          <input
            type="checkbox"
            checked={isDueDate}
            className="size-5 mr-10"
            onChange={(e) => setIsDueDate(e.target.checked)}
          />
          <input
            aria-label="Date and time"
            type="datetime-local"
            disabled={isDueDate}
          />
        </div>

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
