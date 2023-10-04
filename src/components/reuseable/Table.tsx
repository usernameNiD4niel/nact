/**
 * lazy loading the content of the table:
 * ? https://www.geeksforgeeks.org/lazy-loading-in-react-and-how-to-implement-it/
 *
 */

import { SupplierTableProps } from "@/constants/props";
import { Suspense, lazy, useState } from "react";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const TableComponentData = lazy(() => import("./LoadTableData"));

const Table = () => {
  const [tableData, setTableData] = useState<SupplierTableProps[]>([]);
  const [shallowCopy, setShallowCopy] = useState<SupplierTableProps[]>([]);
  const [count, setCount] = useState(15);

  const handleNext = () => {
    if (shallowCopy.length <= tableData.length && tableData.length - 15 > 0) {
      const filtered = tableData.slice(count, count + 15);
      setCount((prev) => prev + 15);
      setShallowCopy((prev) => [...prev, ...filtered]);
    } else {
      console.log("cannot next page because all data has been displayed!");
    }
  };

  return (
    <div className=" pt-4">
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
            <TableComponentData
              setTableData={setTableData}
              shallowCopy={shallowCopy}
              setShallowCopy={setShallowCopy}
            />
          </Suspense>
        </tbody>
      </table>
      <div className="w-[90%] md:w-[65%] xl:w-[90%] flex justify-end gap-3 items-center">
        <button className="border-black border-[1px] rounded-lg p-3">
          <AiOutlineLeft />
        </button>
        <button
          className="border-primary text-primary border-[1px] rounded-lg p-3"
          onClick={handleNext}
        >
          <AiOutlineRight />
        </button>
      </div>
    </div>
  );
};

export default Table;
