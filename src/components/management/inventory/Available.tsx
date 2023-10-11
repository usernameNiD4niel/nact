import Filter from "@/components/reuseable/Filter";
import { InventoryTableData, inventoryData } from "@/constants/objects";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { DataTable } from "./helper/data-table";
import { columns } from "./helper/columns";

const Available = (): JSX.Element => {
  const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

  const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

  const [data, setData] = useState(inventoryData);

  useEffect(() => setActiveTab(0), []);

  return (
    <>
      <div className="w-full">
        <div className="md:px-10 px-5">
          <div className="mt-36 md:mt-24">
            <DataTable data={data} setData={setData} columns={columns} />
          </div>
        </div>
        {/* <AddButton /> */}
        {isShowingFilter && (
          <Filter
            setIsShowingFilter={setIsShowingFilter}
            data={InventoryTableData}
          />
        )}
      </div>
    </>
  );
};

// const AddButton = () => {
//   return (
//     <Link
//       to="/inventory/add"
//       className="fixed right-2 bottom-4 md:right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-primary md:w-32 text-white text-2xl"
//     >
//       <HiOutlinePlus />
//       <span className="hidden md:block text-sm">INVENTORY</span>
//     </Link>
//   );
// };

export default Available;
