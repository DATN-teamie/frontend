import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ user_id, board_id, board_role_id }) {
  try {
    const response = await fetch(
      `${baseurl}/api/boards/${board_id}/roles-assign`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          apikey: apikey,
        },
        body: JSON.stringify({
          user_id,
          board_id,
          board_role_id,
        }),
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
