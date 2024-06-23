import { apikey, baseurl, getSocketId } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ board_id, items }) {
  try {
    const response = await fetch(`${baseurl}/api/items-position?_method=PUT`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Socket-ID': getSocketId(),
        accept: 'application/json',
        apikey: apikey,
      },
      body: JSON.stringify({
        board_id: board_id,
        items: items,
      }),
    });
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
