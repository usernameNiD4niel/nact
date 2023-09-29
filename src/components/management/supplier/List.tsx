import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import Table from "@/components/reuseable/Table";
import { useInventoryState } from "@/utils/InventoryState";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlinePlus, HiXMark } from "react-icons/hi2";
import DynamicDropdown from "@/components/reuseable/DynamicDropdown";
import { TableMutatorProps } from "@/constants/props";
import Filter from "@/components/reuseable/Filter";
import { SupplierTableData } from "@/constants/objects";

const List = () => {
  const [setTab] = useInventoryState((state) => [state.setActiveTab]);
  const [isShowingFilter, setIsShowingFilter] = useState(false);

  useEffect(() => setTab(0), []);

  return (
    <div className="w-full">
      <div className="md:px-10 w-full space-y-5 px-5 py-6">
        <SearchWithFilter placeHolder="Search Supplier" isList={true} />
        <TableMutator setIsShowingFilter={setIsShowingFilter} />
        <Table />
      </div>
      <AddButton />
      {isShowingFilter && (
        <Filter
          data={SupplierTableData}
          setIsShowingFilter={setIsShowingFilter}
        />
      )}
    </div>
  );
};

const TableMutator: FC<TableMutatorProps> = ({ setIsShowingFilter }) => {
  const [uniqueItems, setUniqueItems] = useState<string[]>([]);

  const handleRemoveSelected = (selectedItem: string) => {
    const removeItem = uniqueItems.filter((item) => item !== selectedItem);
    setUniqueItems(removeItem);
  };

  return (
    <div>
      <div className="w-full flex items-center justify-between flex-wrap">
        <div>
          <DynamicDropdown
            dropdownText="Sort"
            dropDownItems={["Supplier", "Location", "Abcde", "Contact"]}
            uniqueItems={uniqueItems}
            setUniqueItems={setUniqueItems}
          />
        </div>
        <div className="items-center hidden lg:flex">
          <DynamicDropdown
            dropdownText="Supplier"
            dropDownItems={[
              "East Pacific Container",
              "North Pacific",
              "South Pacific",
            ]}
            uniqueItems={uniqueItems}
            setUniqueItems={setUniqueItems}
          />
          <DynamicDropdown
            dropdownText="Location"
            dropDownItems={["Chicago, USA", "New York", "California"]}
            setUniqueItems={setUniqueItems}
            uniqueItems={uniqueItems}
          />
          <DynamicDropdown
            dropdownText="Abcde"
            dropDownItems={null}
            setUniqueItems={setUniqueItems}
            uniqueItems={uniqueItems}
          />
          <DynamicDropdown
            dropdownText="Contact"
            dropDownItems={["09154814993", "09154814993", "09154814993"]}
            setUniqueItems={setUniqueItems}
            uniqueItems={uniqueItems}
          />
        </div>
        <button
          className="text-gray-700 lg:hidden text-sm"
          type="button"
          onClick={() => setIsShowingFilter((prev) => !prev)}
        >
          Filter
        </button>
      </div>
      {uniqueItems.length !== 0 && (
        <ul className="flex w-full items-center gap-x-3 bg-[#f3f4f6] py-2 px-4 flex-wrap">
          <li className="flex items-center gap-x-4">
            <span className=" text-xs">Filter</span>
            <div className="h-5 w-[1px] bg-slate-200" />
          </li>
          {uniqueItems.map((unique) => (
            <li
              key={unique}
              className="text-xs bg-white rounded-2xl p-2 flex items-center gap-x-2"
            >
              {unique}{" "}
              <span
                className="text-sm hover:cursor-pointer"
                onClick={() => handleRemoveSelected(unique)}
              >
                <HiXMark />
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const AddButton = () => {
  return (
    <Link
      to="/supplier/add"
      className="fixed right-2 bottom-4 md:right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-primary md:w-32 text-white text-2xl"
    >
      <HiOutlinePlus />
      <span className="hidden md:block text-sm">SUPPLIER</span>
    </Link>
  );
};

export default List;
