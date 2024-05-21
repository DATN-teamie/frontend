import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GoPlus } from 'react-icons/go';

import clsx from 'clsx';

const Container = ({ id, children, title, onAddItem }) => {
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
      <div className="flex items-center justify-between w-72">
        <div className="flex flex-col gap-y-1 w-full cursor-pointer" {...listeners}>
          <h1 className="text-gray-800 text-xl">{title}</h1>
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
