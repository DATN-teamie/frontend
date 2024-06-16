import getDetailItemApi from '../../api/item/getDetailItem.api';
export default async function detailItemLoader({ params }) {
  const itemId = params.itemId;
  let response = await getDetailItemApi({ item_id: itemId });

  if (response.ok) {
    const item = response.data.item;
    return { item };
  }
  throw new Error('Failed to load item');
}
