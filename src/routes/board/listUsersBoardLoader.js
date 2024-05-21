import getusersInBoardApi from '../../api/board/getUsersInBoard.api';
export default async function listUsersBoardLoader({ params }) {
  const board_id = params.boardId;
  const response = await getusersInBoardApi({ board_id });
  let users = [];

  if (response.ok) {
    if (Array.isArray(response.data.users.data)) {
      users = response.data.users.data;
    }
  }
  return { users };
}
