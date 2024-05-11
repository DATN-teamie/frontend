import getListBoardApi from '../../api/board/getListBoard.api';
import getDetailWspApi from '../../api/workspace/getDetailWsp';
export default async function detailWorkspaceLoader({ params }) {
  const workspaceId = params.workspaceId;
  const response = await getDetailWspApi(workspaceId);
  let boards = await getListBoardApi({ workspace_id: workspaceId });

  if (boards.ok) {
    boards = boards.data.boards;
  }

  if (response.ok) {
    const workspace = response.data.workspace;
    return { workspace, boards };
  }
  throw new Error('Failed to load workspace');
}
