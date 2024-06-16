import { useSortable } from '@dnd-kit/sortable';
import { GoPencil } from 'react-icons/go';
import { CSS } from '@dnd-kit/utilities';
import clsx from 'clsx';
import { useNavigate } from 'react-router-dom';
import getDetailItemApi from '../../../../api/item/getDetailItem.api';
import { IMG_URL } from '../../../../constant/common';
import default_avatar from '../../../../assets/default_avatar.jpg';
import { MdKeyboardArrowRight, MdKeyboardArrowDown } from 'react-icons/md';
import { GrAttachment } from 'react-icons/gr';

import { useState } from 'react';

const Items = ({ id, title, item }) => {
  const navigate = useNavigate();

  const [isExpanded, setIsExpanded] = useState(false);
  const [users, setUsers] = useState([]);
  const [lengthUsers, setLengthUsers] = useState(0);
  const [attachmentCount, setAttachmentCount] = useState(0);

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

  const navigateItem = async () => {
    navigate(`i/${id}`);
  };

  const expandItemDetail = async () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) {
      return;
    }
    const response = await getDetailItemApi({ item_id: id });
    setUsers(response.data.item.user_in_item);
    setLengthUsers(response.data.item.user_in_item.length);
    setAttachmentCount(response.data.item.attachments.length);
  };

  const usersRender = users.slice(0, 3).map((user) => {
    const avatar = user.avatar ? IMG_URL + user.avatar : default_avatar;
    return (
      <div className="avatar ml-2" key={user.id}>
        <div className="w-5 rounded-full">
          <img src={avatar} />
        </div>
      </div>
    );
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
        onClick={expandItemDetail}
        className="flex w-10 justify-center items-center hover:bg-gray-50"
      >
        {isExpanded ? (
          <MdKeyboardArrowDown className="size-5 text-gray-400" />
        ) : (
          <MdKeyboardArrowRight className="size-5 text-gray-400" />
        )}
      </div>
      <div
        className="flex flex-col basis-4/5 justify-between p-3"
        {...listeners}
      >
        <span>{title}</span>
        {item?.start_date && (
          <div className="bg-gray-200 rounded-lg w-fit px-2">
            <span className="text-xs text-gray-500">
              start date: {item.start_date}
            </span>
          </div>
        )}
        {item?.due_date && (
          <div
            className={`rounded-lg w-fit px-2 mt-2 ${
              new Date(item.due_date) < new Date()
                ? 'bg-red-200'
                : 'bg-green-300'
            }`}
          >
            <span className="text-xs text-gray-500">
              due date: {item.due_date}
            </span>
          </div>
        )}

        {isExpanded && (
          <div className="flex flex-row mt-2 items-center">
            <div className="text-xs text-gray-400">{lengthUsers} members </div>
            {usersRender}
            {lengthUsers > 3 && (
              <div className="text-xs text-gray-400 ml-2">...</div>
            )}
          </div>
        )}
        {isExpanded && (
          <div className="flex flex-row mt-2 items-center">
            <GrAttachment className="size-4 text-gray-400" />
            <div className="text-xs text-gray-400 ml-2">
              {attachmentCount} attachments
            </div>
          </div>
        )}
      </div>
      <div
        className="flex basis-1/5 justify-center items-center hover:bg-gray-100"
        onClick={navigateItem}
      >
        <GoPencil className="size-4 hidden group-hover:flex" />
      </div>
    </div>
  );
};

export default Items;
