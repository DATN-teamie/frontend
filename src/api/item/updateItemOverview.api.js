import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({
  board_id,
  item_id,
  title,
  description,
  start_date,
  due_date,
}) {
  try {
    await sleep(1000);

    const response = await fetch(
      `${baseurl}/api/items/${item_id}/overview?_method=PUT`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          apikey: apikey,
        },
        body: JSON.stringify({
          board_id: board_id,
          title: title,
          description: description,
          start_date: start_date,
          due_date: due_date,
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
