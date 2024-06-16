import file_excel from '../../assets/file_excel.png';
import file_file from '../../assets/file_file.png';
import file_pdf from '../../assets/file_pdf.png';
import file_ppt from '../../assets/file_ppt.png';

export default function Attachments() {
  return (
    <div className='flex flex-row grow'>
      <div className="overflow-x-auto basis-1/2 mt-4">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <th>File Name</th>
              <th>Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={file_excel}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">file 1</div>
                  </div>
                </div>
              </td>
              <td>
                excel
                <br />
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">download</button>
              </th>
            </tr>
            {/* row 2 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img
                        src={file_file}
                        alt="Avatar Tailwind CSS Component"
                      />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">file 2</div>
                  </div>
                </div>
              </td>
              <td>
                file
                <br />
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">download</button>
              </th>
            </tr>
            {/* row 3 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={file_pdf} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">file 3</div>
                  </div>
                </div>
              </td>
              <td>
                pdf
                <br />
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">download</button>
              </th>
            </tr>
            {/* row 4 */}
            <tr>
              <th>
                <label>
                  <input type="checkbox" className="checkbox" />
                </label>
              </th>
              <td>
                <div className="flex items-center gap-3">
                  <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                      <img src={file_ppt} alt="Avatar Tailwind CSS Component" />
                    </div>
                  </div>
                  <div>
                    <div className="font-bold">file 4</div>
                  </div>
                </div>
              </td>
              <td>
                ppt
                <br />
              </td>
              <th>
                <button className="btn btn-ghost btn-xs">Download</button>
              </th>
            </tr>
          </tbody>
        </table>
      </div>

      <div className='flex flex-col basis-1/2'>
        <h1 className='mt-5 '>Add file attachments: </h1>
      <input
            type="file"
            className="file-input w-full mt-5"
            // onChange={selectFile}
          />
      </div>
    </div>
  );
}
