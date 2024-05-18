import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import {
  SortableContext,
  verticalListSortingStrategy,
  horizontalListSortingStrategy
} from '@dnd-kit/sortable';
import BoardCard from './BoardCard';

export default function BoardList(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  return (
    <SortableContext
      items={props.boardList.cards}
      strategy={verticalListSortingStrategy}
      id={props.id}
    >
      <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
        <div className="flex flex-col w-60 h-[30rem] bg-gray-200 border-2 mx-3 rounded-lg items-center">
          <h1 className=" p-4">{props.boardList.title}</h1>
          <div>
            {props.boardList.cards.map((card) => (
              <BoardCard key={card.id} id={card.id} card={card} />
            ))}
          </div>
        </div>
      </div>
    </SortableContext>
  );
}
