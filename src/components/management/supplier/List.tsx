import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { Payment } from "@/constants/props";
import Filter from "@/components/reuseable/Filter";
import { SupplierTableData, payments } from "@/constants/objects";
import { DataTable } from "./helper/data-table";
import { columns } from "./helper/columns";

function getData(): Payment[] {
  return payments;
}

const List = () => {
  const [setTab] = useInventoryState((state) => [state.setActiveTab]);
  const [isShowingFilter, setIsShowingFilter] = useState(false);

  const data = getData();

  useEffect(() => setTab(0), []);

  return (
    <div className="w-full">
      <div className="md:px-10 px-5">
        <div className="mt-36 md:mt-24">
          <DataTable
            columns={columns}
            data={data}
            setIsShowingFilter={setIsShowingFilter}
          />
        </div>
      </div>
      {/* <AddButton /> */}
      {isShowingFilter && (
        <Filter
          data={SupplierTableData}
          setIsShowingFilter={setIsShowingFilter}
        />
      )}
    </div>
  );
};

// const AddButton = () => {
//   return (
//     <Link
//       to="/supplier/add"
//       className="fixed left-2 bottom-4 md:left-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-[#017DC3] md:w-32 text-white text-2xl"
//     >
//       <HiOutlinePlus />
//       <span className="hidden md:block text-sm">SUPPLIER</span>
//     </Link>
//   );
// };

export default List;
