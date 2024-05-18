import BoardTopBar from "../../pages/Board/BoardTopBar";
import BoardViewMain from "../../pages/Board/BoardViewMain";
import detailBoardLoader from "./detailBoardLoader";

export default {
  path: 'b/:boardId',
  element: <BoardTopBar />,
    loader: detailBoardLoader,
  children: [
    {
      path: '',
      element: <BoardViewMain />,
      //   loader: detailBoardLoader,
    },
  ],
};
