import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import AddButton from "@/components/reuseable/AddButton";
import { DataTable } from "./helper/data-table";
import { columns, customer } from "./helper/column";

const CustomerList = () => {
  const [setTab] = useInventoryState((state) => [state.setActiveTab]);

  const data = customer;

  useEffect(() => {
    setTab(0);
  }, []);

  return (
    <div className="w-full flex items-center justify-center">
      <div className="md:px-10 px-5 w-full">
        <div className="mt-36 md:mt-24 w-full">
          <DataTable columns={columns} data={data} />
        </div>
      </div>
      <AddButton
        redirectUrl="/customer/add"
        textButton="Customer"
        key={"CustomerAddTable"}
      />
    </div>
  );
};

export default CustomerList;
