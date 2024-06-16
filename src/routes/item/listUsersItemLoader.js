import getusersInItemApi from '../../api/item/getUsersInIttem.api';
export default async function listUsersItemLoader({ params }) {
  const item_id = params.itemId;
  const response = await getusersInItemApi({ item_id });
  let users = [];

  if (response.ok) {
    if (Array.isArray(response.data.users.data)) {
      users = response.data.users.data;
    }
  }
  return { users };
}
