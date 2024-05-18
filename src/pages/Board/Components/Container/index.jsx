import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GoPlus } from 'react-icons/go';

import clsx from 'clsx';

const Container = ({ id, children, title, description, onAddItem }) => {
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
        ' flex flex-col w-80 min-w-80 max-w-80 p-4 bg-gray-50 rounded-xl h-fit cursor-default',
        isDragging && 'opacity-50'
      )}
    >
      <div className="flex items-center justify-between">
        <div
          className="flex flex-col gap-y-1 w-full p-2 -mb-4 cursor-pointer"
          {...listeners}
        >
          <h1 className="text-gray-800 text-xl">{title}</h1>
        </div>
      </div>
      {children}
      <button className="btn mt-5 bg-gray-200" onClick={onAddItem}>
        <GoPlus />
        Add Card
      </button>
    </div>
  );
};

export default Container;
