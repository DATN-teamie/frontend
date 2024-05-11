import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ avatar, name, description }) {
  try {
    await sleep(1000);

    const formData = new FormData();
    if (avatar) {
      formData.append('avatar', avatar, 'image');
    }
    formData.append('name', name);
    formData.append('description', description);


    const response = await fetch(`${baseurl}/api/user?_method=PUT`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        apikey: apikey,
      },
      body: formData,
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
