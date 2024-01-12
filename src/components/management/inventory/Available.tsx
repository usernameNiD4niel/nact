import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { columns } from "./helper/columns";
import AddButton from "@/components/reuseable/AddButton";
import { NewDataTable } from "./helper/new-table-data";
import { InventoryData } from "@/constants/props";
import { getPaginatedData } from "@/api/inventory";
import { useSearchParams } from "react-router-dom";

const Available = (): JSX.Element => {
  const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

  const [data, setData] = useState<InventoryData[]>([]);

  const [clone, setClone] = useState<InventoryData[]>([]);

  const [queryParams] = useSearchParams();

  const shouldRefetch = queryParams.get("shouldRefetch");

  const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);

  const fetchedData = async () => {
    const data_ = await getPaginatedData();
    setNextPageUrl(data_.next_page);
    setData(data_.products);
    setClone(data_.products);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      localStorage.setItem("table_data", JSON.stringify(data));
    }
  }, [data]);
  const tableData = localStorage.getItem("table_data");

  useEffect(() => {
    if (tableData) {
      if (shouldRefetch && shouldRefetch === "true") {
        fetchedData();
      } else {
        setData(JSON.parse(tableData));
      }
    } else {
      fetchedData();
      setActiveTab(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <div className="md:px-10 px-5 w-full">
          <div className="mt-36 md:mt-24 w-full">
            <NewDataTable
              columns={columns}
              data={data}
              next_page_url={nextPageUrl}
              clone={clone}
              setData={setData}
            />
            {/* <div className="w-full md:flex hidden">
							<NewDataTable
								columns={columns}
								data={data}
								next_page_url={nextPageUrl}
								clone={clone}
								setData={setData}
							/>
						</div>
						<div className="md:hidden w-full">
							<NewDataTable
								columns={mobileColumn}
								data={data}
								clone={clone}
								next_page_url={nextPageUrl}
								setData={setData}
							/>
						</div> */}
          </div>
        </div>
        <AddButton
          redirectUrl="/inventory/add"
          textButton="Inventory"
          key={"InventoryAddTable"}
        />
      </div>
    </>
  );
};

export default Available;
