import { useInventoryState } from "@/utils/InventoryState";
import React, { useEffect, useState } from "react";
import { HelperType, SupplierTableProps } from "@/constants/props";
import { columns } from "./helper/columns";
import { Link } from "react-router-dom";
import { NewDataTable } from "./helper/new-table-data";

const getInitialData = async (
  setNextPageUrl: React.Dispatch<React.SetStateAction<number | null>>
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/supplier?page=1&per_page=10`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization:
        //   "Bearer 97|OovfkjlrbXxCLGrg0CrpXmLqjDMxzN5GhXMAsDbwa3b34a8e",
      },
    }
  );

  if (response.ok) {
    const data: Promise<HelperType> = await response.json();
    const supplier: SupplierTableProps[] = (await data).suppliers;
    setNextPageUrl((await data).next_page);
    return supplier;
  }

  throw new Error("cannot get the data");
};

const List = () => {
  const [setTab] = useInventoryState((state) => [state.setActiveTab]);

  const [supplier, setSupplier] = useState<SupplierTableProps[]>([]);
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);
  // const [isFetching, setIsFetching] = useState(true);
  // const [currentPage, setCurrentPage] = useState(1);
  // const [nextPage, setNextPage] = useState<number | null>(2);
  // const [previousPage, setPreviousPage] = useState<number | null>(null);

  // const datas = async () => {
  // 	const d = await getPaginatedSupplier(currentPage, setIsFetching);

  // 	setNextPage(d.next_page);
  // 	setPreviousPage(d.previous_page);

  // 	setSupplier(d.suppliers);
  // };

  const fetchedData = async () => {
    const data = await getInitialData(setNextPageUrl);
    setSupplier(data);
  };

  useEffect(() => {
    // datas();
    fetchedData();
    setTab(0);
  }, []);

  const ContentTable = () => {
    // if (isFetching) {
    // 	return <div>Fetching data please wait...</div>;
    // }

    if (supplier) {
      if (supplier.length > 0) {
        return (
          <NewDataTable
            columns={columns}
            data={supplier}
            next_page_url={nextPageUrl}
            setData={setSupplier}
            key={"NewDataTAble"}
          />
        );
      }

      //   return (
      //     <React.Fragment>
      //       <div className="hidden md:flex w-full">
      //         <DataTable
      //           columns={columns}
      //           data={supplier}
      //           setData={setSupplier}
      //           nextPageUrl={nextPageUrl}
      //         />
      //       </div>
      //       <div className="md:hidden w-full">
      //         {/* <DataTable
      //           columns={mobileColumn}
      //           data={supplier}
      //           setData={setSupplier}
      //           nextPageUrl={nextPageUrl}
      //         /> */}
      //       </div>
      //     </React.Fragment>
      //   );
    }

    return (
      <div>
        No supplier data yet, <Link to="/supplier/add">create new entry</Link>
      </div>
    );
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="md:px-10 px-5 w-full">
        <div className="mt-36 md:mt-24 w-full">
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
