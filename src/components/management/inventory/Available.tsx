import DynamicDropdown from "@/components/reuseable/DynamicDropdown";
import Filter from "@/components/reuseable/Filter";
import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import TableSixCol from "@/components/reuseable/TableSixCol";
import { useInventoryState } from "@/utils/InventoryState";
import { FC, useEffect, useState } from "react";
import { HiOutlinePlus } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Available = (): JSX.Element => {
  const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

  const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

  useEffect(() => setActiveTab(0), []);
  return (
    <>
      <div className="md:px-10 w-full space-y-5 px-5 py-6">
        <SearchWithFilter placeHolder="Search Inventory" />
        <AddButton />
        <TableMutator setIsShowingFilter={setIsShowingFilter} />
        <DisplayInventoryData />
      </div>
      {isShowingFilter && <Filter setIsShowingFilter={setIsShowingFilter} />}
    </>
  );
};

type TableMutatorProps = {
  setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
};

const TableMutator: FC<TableMutatorProps> = ({ setIsShowingFilter }) => {
  return (
    <div className="w-full flex items-center justify-between flex-wrap">
      <div>
        <DynamicDropdown
          dropdownText="Sort"
          dropDownItems={[
            "Product Name",
            "City",
            "State",
            "Quantity",
            "Depot",
            "Price",
          ]}
        />
      </div>
      <div className="items-center hidden lg:flex">
        <DynamicDropdown
          dropdownText="Product Name"
          dropDownItems={["20 STD - CW", "40 HC - CW", "20 STD - OT"]}
        />
        <DynamicDropdown dropdownText="City" dropDownItems={["Chicago"]} />
        <DynamicDropdown dropdownText="State" dropDownItems={["USA"]} />
        <DynamicDropdown dropdownText="Quantity" dropDownItems={["12 PCS"]} />
        <DynamicDropdown dropdownText="Depot" dropDownItems={["Depot"]} />
        <DynamicDropdown dropdownText="Price" dropDownItems={["$1,250"]} />
      </div>
      <button
        className="text-gray-700 lg:hidden"
        type="button"
        onClick={() => setIsShowingFilter((prev) => !prev)}
      >
        Filter
      </button>
    </div>
  );
};

const DisplayInventoryData = (): JSX.Element => {
  return (
    <section className="w-full flex items-center justify-center flex-col gap-y-2">
      <TableSixCol />
    </section>
  );
};

const AddButton = () => {
  return (
    <Link
      to="/inventory/add"
      className="absolute right-2 bottom-4 md:right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-primary md:w-32 text-white text-2xl"
    >
      <HiOutlinePlus />
      <span className="hidden md:block text-sm">INVENTORY</span>
    </Link>
  );
};

export default Available;
