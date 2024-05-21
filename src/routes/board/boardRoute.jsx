import BoardMemberInvite from "../../pages/Board/BoardMemberInvite";
import BoardMemberList from "../../pages/Board/BoardMemberList";
import BoardMemberTab from "../../pages/Board/BoardMemberTab";
import BoardTopBar from "../../pages/Board/BoardTopBar";
import BoardViewMain from "../../pages/Board/BoardViewMain";
import detailBoardLoader from "./detailBoardLoader";
import listUsersBoardLoader from "./listUsersBoardLoader";

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
    }
  ],
};
