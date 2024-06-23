import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({
  workspace_id,
  role_wsp_id,
  name,
  create_board,
  update_board,
  delete_board,
  invite_user,
  remove_user,
  create_role,
  update_role,
  remove_role,
  assign_role,
}) {
  try {
    const response = await fetch(
      `${baseurl}/api/workspaces/${workspace_id}/roles/${role_wsp_id}`,
      {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          apikey: apikey,
        },
        body: JSON.stringify({
          name,
          create_board,
          update_board,
          delete_board,
          invite_user,
          remove_user,
          create_role,
          update_role,
          remove_role,
          assign_role,
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
