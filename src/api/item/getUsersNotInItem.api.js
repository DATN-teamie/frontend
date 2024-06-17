import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ board_id, item_id, search }) {
  try {
    const response = await fetch(
      `${baseurl}/api/items/${item_id}/users-not-in?search=${search}&board_id=${board_id}`,
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
