/**
 * lazy loading the content of the table:
 * ? https://www.geeksforgeeks.org/lazy-loading-in-react-and-how-to-implement-it/
 *
 */

import { Suspense, lazy } from "react";

const TableComponentData = lazy(() => import("./LoadTableData"));

const Table = () => {
  return (
    <div className="overflow-x-auto w-full">
      <table className="table">
        {/* head */}
        <thead>
          <tr className="font-bold text-sm text-black">
            <th>Supplier</th>
            <th>
              <span className="hidden sm:block">Location</span>
            </th>
            <th>
              <span className="hidden lg:block">abcde</span>
            </th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {/* row 1 */}
          <Suspense
            fallback={<div>Table data is being fetched please wait...</div>}
          >
            <TableComponentData />
          </Suspense>
        </tbody>
      </table>
    </div>
  );
};

export default Table;
