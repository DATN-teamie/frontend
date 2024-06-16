import { CiTrash } from 'react-icons/ci';

export default function WspRoleSetting() {
  return (
    <div className="flex  grow p-5">
      <div className="overflow-x-auto basis-1/3">
        <h1 className="font-bold text-lg mb-5">Workspace role settings</h1>

        <button className="btn btn-primary mb-5">create new role</button>

        <table className="table">
          <tbody>
            {/* row 1 */}
            <tr>
              <td>role 1</td>
              <td>
                <button className="btn btn-ghost">edit</button>
              </td>
              <td>
                <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
              </td>
            </tr>
            {/* row 2 */}
            <tr>
              <td>role 2</td>
              <td>
                <button className="btn btn-ghost">edit</button>
              </td>
              <td>
                <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
              </td>
            </tr>
            {/* row 3 */}
            <tr>
              <td>role 3</td>
              <td>
                <button className="btn btn-ghost">edit</button>
              </td>
              <td>
                <CiTrash className="size-6 cursor-pointer text-red-500 hover:bg-gray-200" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
