import BoardMemberInvite from '../../pages/Board/BoardMemberInvite';
import BoardMemberList from '../../pages/Board/BoardMemberList';
import BoardMemberTab from '../../pages/Board/BoardMemberTab';
import BoardTopBar from '../../pages/Board/BoardTopBar';
import BoardViewMain from '../../pages/Board/BoardViewMain';
import UpdateBoard from '../../pages/Board/UpdateBoard';
import ItemOverview from '../../pages/Item/ItemOverview';
import ItemTab from '../../pages/Item/ItemTab';
import detailBoardLoader from './detailBoardLoader';
import listUsersBoardLoader from './listUsersBoardLoader';

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
      children: [
        {
          path: '',
          element: <ItemOverview />,
          index: true,
        },
        {
          path: 'members',
          element: <h1>hello</h1>,
        },
        {
          path: 'attachments',
          element: <h1>hello</h1>,
        },
        {
          path: 'checklists',
          element: <h1>hello</h1>,
        },
      ],
    },
  ],
};
