import { apikey, baseurl, getSocketId } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ board_id, title, position }) {
  try {

    const response = await fetch(`${baseurl}/api/containers`, {
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
        title: title,
        position: position,
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
