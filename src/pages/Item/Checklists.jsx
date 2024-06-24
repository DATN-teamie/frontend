import { useState } from 'react';
import { CiTrash } from 'react-icons/ci';
import addChecklistItemApi from '../../api/item/addChecklistItem';
import { useStore } from '../../hook/useStore';
import { useLoaderData, useRevalidator } from 'react-router-dom';
import updateChecklistItem from '../../api/item/updateChecklistItem';
import AlertBar from '../../components/AlertBar';
import deleteChecklistItem from '../../api/item/deleteChecklistItem';

export default function Checklists() {
  const revalidator = useRevalidator();
  const { checklist_items } = useLoaderData();
  console.log(checklist_items);
  const currentItem = useStore((state) => state.currentItem);
  const [ChecklistItemName, setChecklistItemName] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [alertBar, setAlertBar] = useState({
    isAlertVisible: false,
    message: '',
    type: 'success',
  });
  const addChecklistItem = async () => {
    setAddLoading(true);
    if (ChecklistItemName === '') {
      setAlertBar({
        isAlertVisible: true,
        message: 'Checklist item name is required',
        type: 'error',
      });
      setAddLoading(false);
      return;
    }
    const response = await addChecklistItemApi({
      item_id: currentItem.id,
      name: ChecklistItemName,
    });
    if (response.status == 403) {
      setAlertBar({
        isAlertVisible: true,
        message: 'You do not have permission to add checklist item',
        type: 'error',
      });
      setAddLoading(false);
      return;
    }
    if (!response.ok) {
      setAlertBar({
        isAlertVisible: true,
        message: 'something went wrong',
        type: 'error',
      });
      setAddLoading(false);
      return;
    }
    revalidator.revalidate();
    setChecklistItemName('');
    setAddLoading(false);
  };

  const renderChecklistItems = checklist_items.map((checklist_item) => {
    const handleCheck = async () => {
      const response = await updateChecklistItem({
        item_id: currentItem.id,
        checklist_item_id: checklist_item.id,
        name: checklist_item.name,
        is_completed: !checklist_item.is_completed,
      });
      if (response.status == 403) {
        setAlertBar({
          isAlertVisible: true,
          message: 'You do not have permission to update checklist item',
          type: 'error',
        });
        return;
      }
      if (!response.ok) {
        setAlertBar({
          isAlertVisible: true,
          message: 'Failed to update checklist item',
          type: 'error',
        });
        return;
      }
      revalidator.revalidate();
    };

    const deleteChecklistItemHandler = async (checklist_id) => {
      const response = await deleteChecklistItem({
        checklist_id: checklist_id,
      });
      if (response.status == 403) {
        setAlertBar({
          isAlertVisible: true,
          message: 'You do not have permission to delete checklist item',
          type: 'error',
        });
        return;
      }
      if (!response.ok) {
        setAlertBar({
          isAlertVisible: true,
          message: 'Failed to delete checklist item',
          type: 'error',
        });
        return;
      }
      setAlertBar({
        isAlertVisible: true,
        message: 'Checklist item deleted',
        type: 'success',
      });
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
            <CiTrash
              onClick={() => deleteChecklistItemHandler(checklist_item.id)}
              className="size-6 cursor-pointer text-red-500 hover:bg-gray-200"
            />
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
      </div>
      <AlertBar alertBar={alertBar} setAlertBar={setAlertBar} />
    </div>
  );
}
