import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({
  user_id,
  token,
  new_password,
  confirm_password,
}) {
  try {
    const response = await fetch(`${baseurl}/api/reset-forgot-password`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        apikey: apikey,
      },
      body: JSON.stringify({
        user_id,
        token,
        new_password,
        confirm_password,
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
