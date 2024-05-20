import { apikey, baseurl, getSocketId } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ container_id, title, position }) {
  try {
    await sleep(500);

    const response = await fetch(`${baseurl}/api/items`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Socket-ID': getSocketId(),
        accept: 'application/json',
        apikey: apikey,
      },
      body: JSON.stringify({
        container_id: container_id,
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
