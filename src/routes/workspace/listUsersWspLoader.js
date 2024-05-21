import getUsersInWspApi from '../../api/workspace/getUsersInWsp';
export default async function listUsersWspLoader({ params }) {
  const workspace_id = params.workspaceId;
  const response = await getUsersInWspApi({ workspace_id });
  let users = [];

  if (response.ok) {
    if (Array.isArray(response.data.users.data)) {
      users = response.data.users.data;
    }
  }
  return { users };
}
