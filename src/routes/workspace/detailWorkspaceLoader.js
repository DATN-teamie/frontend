import getDetailWspApi from '../../api/workspace/getDetailWsp';
export default async function detailWorkspaceLoader({ params }) {
  const workspaceId = params.workspaceId;
  const response = await getDetailWspApi(workspaceId);

  if (response.ok) {
    const workspace = response.data.workspace;
    return { workspace };
  }
  throw new Error('Failed to load workspace');
}
