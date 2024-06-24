import { apikey, baseurl, getSocketId } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ checklist_id }) {
  try {
    const response = await fetch(
      `${baseurl}/api/checklist-items/${checklist_id}`,
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