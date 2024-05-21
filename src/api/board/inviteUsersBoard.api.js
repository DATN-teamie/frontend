import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ user_ids, board_id }) {
  try {
    await sleep(500);

    const response = await fetch(
      `${baseurl}/api/boards/${board_id}/invite`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          apikey: apikey,
        },
        body: JSON.stringify({
          user_ids: user_ids,
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
