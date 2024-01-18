import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { DataTable } from "./expired/data-table";
import { columns } from "./helper/columns";
import { useQuery } from "@tanstack/react-query";
import { getPaginatedExpired } from "@/api/inventory";
import { NewDataTable } from "./helper/new-table-data";
import { InventoryData } from "@/constants/props";

export default function Expired() {
  const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

  const { data, isLoading, isError } = useQuery(["get-paginated-expired"], {
    queryFn: () => getPaginatedExpired(1),
  });

  const [expired, setExpired] = useState<InventoryData[]>([]);

  useEffect(() => {
    setActiveTab(1);
    if (data && data.expired_inventory_items.length > 0) {
      setExpired(data.expired_inventory_items);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function content() {
    if (isLoading) {
      return (
        <div className="w-full h-[65vh] flex items-center justify-center">
          <p className="text-sm">Getting the expired inventory</p>
        </div>
      );
    }

    if (isError) {
      return (
        <div className="w-full h-[65vh] flex items-center justify-center">
          <p className="text-red-500 text-sm">
            Cannot get the expired data, please try again
          </p>
        </div>
      );
    }

    return (
      <NewDataTable
        columns={columns}
        data={expired}
        next_page_url={data.next_page}
        clone={data.expired_inventory_items}
        isAvailable={false}
        setData={setExpired}
        key={"srccomponentsmanagementinventoryexpired"}
      />
    );
  }

  return (
    <div className="w-full flex items-center justify-center">
      <div className="md:px-10 px-5 w-full">
        <div className="mt-36 mb-10 md:mt-24 w-full">{content()}</div>
      </div>
    </div>
  );
}
