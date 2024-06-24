import { apikey, baseurl } from '../constant.api';

export default async function ({ board_id, board_role_id }) {
  try {
    const response = await fetch(
      `${baseurl}/api/boards/${board_id}/roles/${board_role_id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          accept: 'application/json',
          apikey: apikey,
        },
      }
    );
    const data = await response.json();
    return {
      data: data,
      status: response.status,
      ok: response.ok,
    };
  } catch (error) {
    return error;
  }
}
