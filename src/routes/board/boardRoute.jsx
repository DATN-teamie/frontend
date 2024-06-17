import BoardMemberInvite from '../../pages/Board/BoardMemberInvite';
import BoardMemberList from '../../pages/Board/BoardMemberList';
import BoardMemberTab from '../../pages/Board/BoardMemberTab';
import BoardTopBar from '../../pages/Board/BoardTopBar';
import BoardViewMain from '../../pages/Board/BoardViewMain';
import ItemMembers from '../../pages/Item/ItemMembers';
import UpdateBoard from '../../pages/Board/UpdateBoard';
import ItemOverview from '../../pages/Item/ItemOverview';
import ItemTab from '../../pages/Item/ItemTab';
import detailBoardLoader from './detailBoardLoader';
import listUsersBoardLoader from './listUsersBoardLoader';
import Attachments from '../../pages/Item/Attachments';
import Checklists from '../../pages/Item/Checklists';
import detailItemLoader from '../item/detailItemLoader';
import listUsersItemLoader from '../item/listUsersItemLoader';
import listItemAttachmentsLoader from '../item/listItemAttachmentsLoader';
import checkListItemLoader from '../item/checkListItemLoader';

export default {
  path: 'b/:boardId',
  element: <BoardTopBar />,
  loader: detailBoardLoader,
  children: [
    {
      path: '',
      element: <BoardViewMain />,
    },
    {
      path: 'board-update',
      element: <UpdateBoard />,
    },
    {
      path: 'members',
      element: <BoardMemberTab />,
      children: [
        {
          path: '',
          element: <BoardMemberList />,
          index: true,
          loader: listUsersBoardLoader,
        },
        {
          path: 'invite',
          element: <BoardMemberInvite />,
        },
      ],
    },
    {
      path: 'i/:itemId',
      element: <ItemTab />,
      loader: detailItemLoader,
      children: [
        {
          path: '',
          element: <ItemOverview />,
          index: true,
        },
        {
          path: 'members',
          element: <ItemMembers />,
          loader: listUsersItemLoader,
        },
        {
          path: 'attachments',
          element: <Attachments />,
          loader: listItemAttachmentsLoader,
        },
        {
          path: 'checklists',
          element: <Checklists />,
          loader: checkListItemLoader,
        },
      ],
    },
  ],
};
