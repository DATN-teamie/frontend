import { useState, useRef } from 'react';
import { useStore } from '../../hook/useStore';
import updateItemAttachments from '../../api/item/updateItemAttachments';
import file_file from '../../assets/file_file.png';
import file_pdf from '../../assets/file_pdf.png';
import file_word from '../../assets/file_word.png';
import file_excel from '../../assets/file_excel.png';
import file_ppt from '../../assets/file_ppt.png';
import default_file_image from '../../assets/default_file_image.png';
import { IMG_URL } from '../../constant/common';

import { useLoaderData, useRevalidator } from 'react-router-dom';

export default function Attachments() {
  const [fileError, setFileError] = useState('');
  const [loading, setLoading] = useState(false);
  const fileInput = useRef();
  const revalidator = useRevalidator();
  const { attachments } = useLoaderData();

  const currentItem = useStore((state) => state.currentItem);

  const selectFile = async (e) => {
    setLoading(true);
    const response = await updateItemAttachments({
      item_id: currentItem.id,
      attachments: e.target.files,
    });

    if (!response.ok) {
      setFileError('Error uploading files');
    }

    if (response.ok) {
      revalidator.revalidate();
      setFileError('');
    }

    // Reset the file input after the function is done
    fileInput.current.value = '';
    setLoading(false);
  };

  const attachmentRenders = attachments.map((attachment) => {
    let fileTypeIcon = file_file;
    let fileType = 'file';
    const linkFile = IMG_URL + attachment.file_url;
    if (attachment.file_type.includes('pdf')) {
      fileTypeIcon = file_pdf;
      fileType = 'pdf';
    }
    if (attachment.file_type.includes('word')) {
      fileTypeIcon = file_word;
      fileType = 'word';
    }
    if (attachment.file_type.includes('sheet')) {
      fileTypeIcon = file_excel;
      fileType = 'excel';
    }
    if (attachment.file_type.includes('presentation')) {
      fileTypeIcon = file_ppt;
      fileType = 'ppt';
    }
    if (attachment.file_type.includes('image')) {
      fileTypeIcon = default_file_image;
      fileType = 'image';
    }

    return (
      <tr key={attachment.id}>
        <td>
          <div className="flex items-center gap-3">
            <div className="avatar">
              <div className="mask mask-squircle w-12 h-12">
                <img src={fileTypeIcon} alt="Avatar Tailwind CSS Component" />
              </div>
            </div>
            <div>
              <div className="font-bold">{attachment.file_name}</div>
            </div>
          </div>
        </td>
        <td>
          {fileType}
          <br />
        </td>
        <th>
          <a
            href={linkFile}
            target="_blank"
            rel="noopener noreferrer"
            role="button"
            className="btn btn-ghost btn-xs"
          >
            download
          </a>
        </th>
      </tr>
    );
  });

  return (
    <div className="flex flex-row grow">
      <div className="overflow-x-auto basis-2/3 mt-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>File Name</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{attachmentRenders}</tbody>
        </table>
      </div>

      <div className="flex flex-col basis-1/3">
        <h1 className="mt-5 ">Add file attachments: </h1>
        <input
          ref={fileInput}
          type="file"
          className="file-input w-full mt-5"
          onChange={selectFile}
          multiple
        />
        <span className="text-red-500">{fileError}</span>
        {loading && <span className="loading loading-bars loading-lg"></span>}
      </div>
    </div>
  );
}
