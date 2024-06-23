import { apikey, baseurl, getSocketId } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ container_id, title }) {
  try {
    const response = await fetch(`${baseurl}/api/containers/${container_id}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'X-Socket-ID': getSocketId(),
        accept: 'application/json',
        apikey: apikey,
      },
      body: JSON.stringify({
        title: title,
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
