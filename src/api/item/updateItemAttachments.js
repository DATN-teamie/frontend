import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ item_id, attachments }) {
  try {
    await sleep(1000);

    const formData = new FormData();
    formData.append('item_id', item_id);
    
    Array.from(attachments).forEach((file) => {
      formData.append('attachments[]', file, file.name);
    });

    const response = await fetch(
      `${baseurl}/api/items/${item_id}/attachments`,
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
