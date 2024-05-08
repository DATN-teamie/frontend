import getListWspApi from '../../api/workspace/getListWsp.api';
export default async function listWorkspaceLoader() {
  const response = await getListWspApi();
  let workspaces = [];

  if (response.ok) {
    workspaces = response.data.workspaces;
  }
  return { workspaces };
}
