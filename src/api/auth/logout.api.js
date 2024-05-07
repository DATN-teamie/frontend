import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function () {
  try {
    await sleep(500);
    const response = await fetch(`${baseurl}/api/logout`, {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        apikey: apikey,
      },
    });
    return response;
  } catch (error) {
    return error;
  }
}
