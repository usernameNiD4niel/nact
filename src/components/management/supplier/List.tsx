import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { FilterForm, Payment } from "@/constants/props";
import Filter from "@/components/reuseable/Filter";
import { SupplierTableData } from "@/constants/objects";
import { DataTable } from "./helper/data-table";
import { columns } from "./helper/columns";
import { getSupplierTableData } from "@/api/supplier";
import { Link } from "react-router-dom";

const List = () => {
  const [setTab] = useInventoryState((state) => [state.setActiveTab]);
  const [isShowingFilter, setIsShowingFilter] = useState(false);

  const [supplier, setSupplier] = useState<Payment[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const datas = async () => {
    console.log("endpoint test list, ", process.env.VITE_BASE_URL);
    const d = await getSupplierTableData(setIsFetching);
    console.log("the data: ", d);
    setSupplier(d);
  };

  useEffect(() => {
    datas();
    setTab(0);
  }, []);

  const handleFilter = ({ contact, location, supplier }: FilterForm) => {
    // Fetch the filtered data from the backend
    // Update the data using setData
    console.log("contact: ", contact);
    console.log("location: ", location);
    console.log("supplier: ", supplier);
  };

  const ContentTable = () => {
    if (isFetching) {
      return <div>Fetching data please wait...</div>;
    }

    if (supplier && supplier.length > 0) {
      return (
        <DataTable
          columns={columns}
          data={supplier}
          handleFilter={handleFilter}
        />
      );
    }

    return (
      <div>
        No supplier data yet, <Link to="/supplier/add">create new entry</Link>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="md:px-10 px-2">
        <div className="mt-36 md:mt-24">
          <ContentTable />
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

export default List;
