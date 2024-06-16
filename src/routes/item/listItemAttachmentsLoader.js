import getListItemAttachments from '../../api/item/getListItemAttachments';
export default async function listItemAttachmentsLoader({ params }) {
  const item_id = params.itemId;
  const response = await getListItemAttachments({ item_id });
  let attachments = [];

  if (response.ok) {
    if (Array.isArray(response.data.attachments)) {
      attachments = response.data.attachments;
    }
  }
  return { attachments };
}
