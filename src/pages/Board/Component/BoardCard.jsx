import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export default function BoardCard(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <div className="w-44 h-[5rem] border-2 my-3 rounded-lg bg-slate-100">
        <div className="text-center p-4">{props.id}</div>
      </div>
    </div>
  );
}
