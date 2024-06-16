import { useState } from 'react';
import updateItemOverviewApi from '../../api/item/updateItemOverview.api';
import success_verify_svg from '../../assets/success_verify.svg';
import { useNavigate, useRevalidator } from 'react-router-dom';
import { useStore } from '../../hook/useStore';

export default function ItemOverview() {
  const navigate = useNavigate();
  const currentItem = useStore((state) => state.currentItem);
  const currentBoard = useStore((state) => state.currentBoard);

  const revalidator = useRevalidator();

  const [title, setTitle] = useState(currentItem.title);
  const [description, setDescription] = useState(currentItem.description || '');
  const [isStartDate, setIsStartDate] = useState(
    currentItem.start_date ? true : false
  );
  const [isDueDate, setIsDueDate] = useState(
    currentItem.due_date ? true : false
  );
  const [startDate, setStartDate] = useState(currentItem.start_date || '');
  const [dueDate, setDueDate] = useState(currentItem.due_date || '');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const updateItem = async () => {
    clearState();
    setLoading(true);

    const response = await updateItemOverviewApi({
      board_id: currentBoard.id,
      item_id: currentItem.id,
      title: title,
      description: description,
      start_date: isStartDate ? startDate : null,
      due_date: isDueDate ? dueDate : null,
    });

    console.log(response);
    if (!response.ok) {
      clearState();
      setError(response.data.message);
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <h1 className="mt-7 font-bold">description</h1>
        <textarea
          onChange={(e) => setDescription(e.target.value)}
          className="textarea textarea-bordered h-36 mt-3"
          value={description}
        />

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
            disabled={!isStartDate}
            onChange={(e) => setStartDate(e.target.value)}
            value={startDate}
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
            onChange={(e) => setDueDate(e.target.value)}
            disabled={!isDueDate}
            value={dueDate}
          />
        </div>

        <div className="flex mt-7 text-red-500">{error}</div>

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
              onClick={() => updateItem()}
            >
              Save
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
