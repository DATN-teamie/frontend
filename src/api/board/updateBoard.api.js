import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ board_id, cover_img, name }) {
  try {
    await sleep(1000);

    const formData = new FormData();
    if (cover_img) {
      formData.append('cover_img', cover_img, 'image');
    }
    formData.append('name', name);

    const response = await fetch(
      `${baseurl}/api/boards/${board_id}?_method=PUT`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          accept: 'application/json',
          apikey: apikey,
        },
        body: formData,
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
