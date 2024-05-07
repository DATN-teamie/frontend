import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function () {
  try {
    await sleep(1000);
    console.log('hello');
    const response = await fetch(`${baseurl}/api/verify-login`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
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
