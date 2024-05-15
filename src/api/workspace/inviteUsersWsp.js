import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({ user_ids, workspace_id }) {
  try {
    await sleep(500);

    const response = await fetch(
      `${baseurl}/api/workspaces/${workspace_id}/invite`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          apikey: apikey,
        },
        body: JSON.stringify({
          user_ids: user_ids,
          'wef': 'wefwefewf',
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
