import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ workspace_id, board_id, search }) {
  try {
    await sleep(500);
    const response = await fetch(
      `${baseurl}/api/boards/${board_id}/users-not-in?search=${search}&workspace_id=${workspace_id}`,
      {
        method: 'GET',
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
