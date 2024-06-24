import { apikey, baseurl, getSocketId } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ item_id, user_id }) {
  try {
    const response = await fetch(
      `${baseurl}/api/items/${item_id}/user-in-item/${user_id}`,
      {
        method: 'DELETE',
        credentials: 'include',
        headers: {
          'X-Socket-ID': getSocketId(),
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
