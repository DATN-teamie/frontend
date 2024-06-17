import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ item_id, name }) {
  try {

    const response = await fetch(
      `${baseurl}/api/items/${item_id}/checklist-items`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          apikey: apikey,
        },
        body: JSON.stringify({
          item_id: item_id,
          name: name,
        }),
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
