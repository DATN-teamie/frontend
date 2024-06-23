import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GoPencil } from 'react-icons/go';
import { CiTrash } from 'react-icons/ci';

import clsx from 'clsx';

const Container = ({
  id,
  children,
  title,
  onAddItem,
  setCurrentSelectContainer,
  setCurrentSelectDeleteContainerId,
}) => {
  const {
    attributes,
    setNodeRef,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'container',
    },
  });
  return (
    <div
      {...attributes}
      ref={setNodeRef}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'w-full h-full p-4 bg-gray-50 rounded-xl flex flex-col gap-y-4 cursor-default',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-center justify-between w-72 group">
        <div className="flex flex-row gap-y-1 w-full cursor-pointer">
          <div {...listeners} className="flex grow">
            <h1 className="text-gray-800 text-xl">{title}</h1>
          </div>
        </div>
        <div className="flex flex-row gap-x-2">
          <GoPencil
            onClick={() => {
              document.getElementById('edit_container_modal').showModal();
              setCurrentSelectContainer({
                id,
                title,
              });
            }}
            className="cursor-pointer hidden group-hover:block hover:bg-gray-300 size-5"
          />
          <CiTrash
            onClick={() => {
              document.getElementById('delete_container_modal').showModal();
              setCurrentSelectDeleteContainerId(id);
            }}
            className="cursor-pointer hidden group-hover:block hover:bg-gray-300 size-5 text-red-500"
          />
        </div>
      </div>

      {children}
      <button className="btn" onClick={onAddItem}>
        Add Item
      </button>
    </div>
  );
};

export default Container;
