import getListWspRoleApi from '../../api/workspace/getListWspRole';
export default async function listWspRoleLoader({params}) {
  const workspaceId = params.workspaceId;

  const response = await getListWspRoleApi({ workspace_id: workspaceId});
  let workspaceRoles = [];

  if (response.ok) {
    workspaceRoles = response.data.workspaceRoles;
  }

  return { workspaceRoles };
}
