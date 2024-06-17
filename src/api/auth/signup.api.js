import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ email, password, confirmPassword }) {
  try {
    const response = await fetch(`${baseurl}/api/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        apikey: apikey,
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirmation: confirmPassword,
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
