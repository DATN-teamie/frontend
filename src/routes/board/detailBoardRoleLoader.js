import getDetailRoleBoard from '../../api/board/getDetailRoleBoard';

export default async function detailBoardRoleLoader({ params }) {
  const boardId = params.boardId;
  const roleBoardId = params.roleBoardId;
  const response = await getDetailRoleBoard({
    board_id: boardId,
    role_board_id: roleBoardId,
  });

  if (response.ok) {
    const roleBoard = response.data.roleBoard;
    return { roleBoard };
  }
  throw new Error('Failed to load board');
}
