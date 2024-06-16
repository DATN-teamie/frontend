import { CiTrash } from 'react-icons/ci';

export default function Checklists() {
  return (
    <div className="flex flex-row grow mt-4">
      <div className="overflow-x-auto basis-1/2">
        <table className="table">
          {/* head */}
          <thead></thead>
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
                    <div className="mask mask-squircle w-12 h-12"></div>
                  </div>
                  <div>
                    <div className="font-bold">This is task list 1</div>
                  </div>
                </div>
              </td>
              <th>
                <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
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
                    <div className="mask mask-squircle w-12 h-12"></div>
                  </div>
                  <div>
                    <div className="font-bold">This is task list 2</div>
                  </div>
                </div>
              </td>
              <th>
                <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
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
                    <div className="mask mask-squircle w-12 h-12"></div>
                  </div>
                  <div>
                    <div className="font-bold">This is task list 3</div>
                  </div>
                </div>
              </td>
              <th>
                <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
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
                    <div className="mask mask-squircle w-12 h-12"></div>
                  </div>
                  <div>
                    <div className="font-bold">This is task list 4</div>
                  </div>
                </div>
              </td>
              <th>
                <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
              </th>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="flex flex-row  grow mt-5">
        <input
          type="text"
          placeholder="Type here"
          className="input input-bordered w-80"
        />
        <button className="btn btn-primary w-32 ml-5">Add</button>
      </div>
    </div>
  );
}
