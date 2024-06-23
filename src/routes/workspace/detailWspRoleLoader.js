import getDetailRoleWsp from '../../api/workspace/getDetailRoleWsp';

export default async function detailWspRoleLoader({ params }) {
  const workspaceId = params.workspaceId;
  const roleWspId = params.roleWspId;
  const response = await getDetailRoleWsp({
    workspace_id: workspaceId,
    role_wsp_id: roleWspId,
  });

  if (response.ok) {
    const roleWsp = response.data.roleWsp;
    return { roleWsp };
  }
  throw new Error('Failed to load workspace');
}
