import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ email, password }) {
  try {
    const response = await fetch(`${baseurl}/api/login`, {
      method: 'POST',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        apikey: apikey,
      },
      body: JSON.stringify({
        email: email,
        password: password,
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
