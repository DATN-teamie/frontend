import getListBoardRole from '../../api/board/getListBoardRole';
export default async function listBoardRoleLoader({ params }) {
  const boardId = params.boardId;

  const response = await getListBoardRole({ board_id: boardId });
  let boardRoles = [];

  if (response.ok) {
    boardRoles = response.data.boardRoles;
  }

  return { boardRoles };
}
