import getDetailBoardApi from '../../api/board/getDetailBoard.api';
export default async function detailWorkspaceLoader({ params }) {
  const boardId = params.boardId;
  let response = await getDetailBoardApi({ board_id: boardId });


  if (response.ok) {
    const board = response.data.board;
    return { board };
  }
  throw new Error('Failed to load board');
}
