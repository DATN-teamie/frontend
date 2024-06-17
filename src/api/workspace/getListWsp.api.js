import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function () {
  try {
    const response = await fetch(`${baseurl}/api/workspaces`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        apikey: apikey,
      },
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
