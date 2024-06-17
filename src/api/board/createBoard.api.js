import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ workspace_id, cover_img, name, isPrivate }) {
  try {
    const formData = new FormData();
    if (cover_img) {
      formData.append('cover_img', cover_img, 'image');
    }
    formData.append('workspace_id', workspace_id);
    formData.append('name', name);

    isPrivate = isPrivate == true ? '1' : '0';
    formData.append('is_private', isPrivate);

    const response = await fetch(`${baseurl}/api/boards`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        accept: 'application/json',
        apikey: apikey,
      },
      body: formData,
    });
    console.log(response);
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
