import { useSortable } from '@dnd-kit/sortable';
import { GoPencil } from 'react-icons/go';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';

const Items = ({ id, title }) => {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: id,
    data: {
      type: 'item',
    },
  });
  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        transition,
        transform: CSS.Translate.toString(transform),
      }}
      className={clsx(
        'group flex  mt-4 bg-white shadow-md rounded-xl w-full border border-transparent hover:border-gray-200 cursor-pointer',
        isDragging && 'opacity-50'
      )}
    >
      <div
        className="flex basis-4/5 items-center justify-between p-3"
        {...listeners}
      >
        <span>{title}</span>
      </div>
      <div
        className="flex basis-1/5 justify-center items-center hover:bg-gray-100"
        onClick={() => navigate(`i/${id}`)}
      >
        <GoPencil className="size-4 hidden group-hover:flex" />
      </div>
    </div>
  );
};

export default Items;
