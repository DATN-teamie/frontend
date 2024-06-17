import { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import addChecklistItemApi from '../../api/item/addChecklistItem';
import { useStore } from '../../hook/useStore';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import updateChecklistItem from '../../api/item/updateChecklistItem';

export default function Checklists() {
  const revalidator = useRevalidator();
  const { checklist_items } = useLoaderData();
  const currentItem = useStore((state) => state.currentItem);
  const [ChecklistItemName, setChecklistItemName] = useState('');
  const [error, setError] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const addChecklistItem = async () => {
    setError('');
    setAddLoading(true);
    if (ChecklistItemName === '') {
      setError('Checklist item name is required');
      setAddLoading(false);
      return;
    }
    const response = await addChecklistItemApi({
      item_id: currentItem.id,
      name: ChecklistItemName,
    });
    if (!response.ok) {
      setError('Failed to add checklist item');
      setAddLoading(false);
      return;
    }
    revalidator.revalidate();
    setChecklistItemName('');
    setAddLoading(false);
  };

  const renderChecklistItems = checklist_items.map((checklist_item) => {
    const handleCheck = async () => {
      setError('');
      console.log('hello');
      const response = await updateChecklistItem({
        item_id: currentItem.id,
        checklist_item_id: checklist_item.id,
        name: checklist_item.name,
        is_completed: !checklist_item.is_completed,
      });
      if (!response.ok) {
        setError('Failed to update checklist item');
        return;
      }
      revalidator.revalidate();
    };
    return (
      <>
        <tr key={checklist_item.id}>
          <th>
            <label>
              <input
                type="checkbox"
                className="checkbox checkbox-success"
                checked={checklist_item.is_completed}
                onChange={handleCheck}
              />
            </label>
          </th>
          <td>
            <div className="flex items-center gap-3">
              <div className="avatar">
                <div className="mask mask-squircle w-12 h-12"></div>
              </div>
              <div>
                <div
                  className={
                    checklist_item.is_completed
                      ? 'font-bold line-through text-gray-500'
                      : 'font-bold'
                  }
                >
                  {checklist_item.name}
                </div>
              </div>
            </div>
          </td>
          <th>
            <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
          </th>
        </tr>
      </>
    );
  });
  return (
    <div className="flex flex-row grow mt-4">
      <div className="overflow-x-auto basis-1/2 mt-5">
        <table className="table">
          {/* head */}
          <thead></thead>
          <tbody>{renderChecklistItems}</tbody>
        </table>
      </div>
      <div className="flex flex-col  grow mt-5">
        <div className="flex flex-row">
          <input
            type="text"
            placeholder="Type here"
            className="input input-bordered w-80"
            value={ChecklistItemName}
            onChange={(e) => setChecklistItemName(e.target.value)}
          />
          {addLoading ? (
            <span className="loading loading-spinner text-primary ml-5"></span>
          ) : (
            <button
              className="btn btn-primary ml-5 w-20"
              onClick={addChecklistItem}
            >
              Add
            </button>
          )}
        </div>
        {error && <div className="text-red-500 mt-5">{error}</div>}
      </div>
    </div>
  );
}
