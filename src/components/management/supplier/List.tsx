import { useInventoryState } from "@/utils/InventoryState";
import React, { useEffect, useState } from "react";
import { Payment } from "@/constants/props";
import { DataTable } from "./helper/data-table";
import { columns } from "./helper/columns";
import { getSupplierTableData } from "@/api/supplier";
import { Link } from "react-router-dom";
import { mobileColumn } from "./helper/mobile-column";

const List = () => {
  const [setTab] = useInventoryState((state) => [state.setActiveTab]);

  const [supplier, setSupplier] = useState<Payment[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  const datas = async () => {
    const d = await getSupplierTableData(setIsFetching);
    setSupplier(d);
  };

  useEffect(() => {
    datas();
    setTab(0);
  }, []);

  const ContentTable = () => {
    if (isFetching) {
      return <div>Fetching data please wait...</div>;
    }

    if (supplier && supplier.length > 0) {
      return (
        <React.Fragment>
          <div className="hidden md:flex">
            <DataTable
              columns={columns}
              data={supplier}
              setData={setSupplier}
            />
          </div>
          <div className="md:hidden">
            <DataTable
              columns={mobileColumn}
              data={supplier}
              setData={setSupplier}
            />
          </div>
        </React.Fragment>
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
      {/* {isShowingFilter && (
        <Filter
          data={SupplierTableData}
          setIsShowingFilter={setIsShowingFilter}
        />
      )} */}
    </div>
  );
};

export default List;
