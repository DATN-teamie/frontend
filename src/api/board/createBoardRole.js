import { apikey, baseurl } from '../constant.api';
import { sleep } from '../../helper/sleep';

export default async function ({
  board_id,
  name,
  create_container,
  remove_container,
  create_item,
  remove_item,
  member_board_management,
  role_board_management,
  item_member_management,
  attachment_management,
  checklist_management,
}) {
  try {
    const response = await fetch(`${baseurl}/api/boards/${board_id}/roles`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
        apikey: apikey,
      },
      body: JSON.stringify({
        board_id,
        name,
        create_container,
        remove_container,
        create_item,
        remove_item,
        member_board_management,
        role_board_management,
        item_member_management,
        attachment_management,
        checklist_management,
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
