import getCheckListItem from '../../api/item/getChecklistItem';
export default async function checkListItemLoader({ params }) {
  const item_id = params.itemId;
  const response = await getCheckListItem({ item_id });
  let checklist_items = [];

  if (response.ok) {
    if (Array.isArray(response.data.checklist_items)) {
      checklist_items = response.data.checklist_items;
    }
  }
  return { checklist_items };
}
