import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({
  item_id,
  checklist_item_id,
  name,
  is_completed,
}) {
  try {
    const response = await fetch(
      `${baseurl}/api/items/${item_id}/checklist-items/${checklist_item_id}`,
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
          is_completed: is_completed,
          checklist_item_id: checklist_item_id,
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
