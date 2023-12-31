import { TableMutatorProps } from "@/constants/props";
import { FC, useState } from "react";
import DynamicDropdown from "./DynamicDropdown";
import { HiXMark } from "react-icons/hi2";

const TableMutator: FC<TableMutatorProps> = ({ data }) => {
  const [uniqueItems, setUniqueItems] = useState<string[]>([]);

  const handleRemoveSelected = (selectedItem: string) => {
    const removeItem = uniqueItems.filter((item) => item !== selectedItem);
    setUniqueItems(removeItem);
  };

  const getSupplier = () => {
    const supplier = data.map((item) => item.supplier);
    return supplier;
  };

  const getLocation = () => {
    const location = data.map((item) => item.location);
    return location;
  };

  const getContact = () => {
    const contact = data.map((item) => item.contact);
    return contact;
  };

  return (
    <div>
      <div className="w-full flex items-center justify-end flex-wrap">
        <div className="items-center hidden lg:flex">
          <DynamicDropdown
            dropdownText="Supplier"
            dropDownItems={getSupplier()}
            uniqueItems={uniqueItems}
            setUniqueItems={setUniqueItems}
            // handleFiltering={handleFiltering}
          />
          <DynamicDropdown
            dropdownText="Location"
            dropDownItems={getLocation()}
            setUniqueItems={setUniqueItems}
            uniqueItems={uniqueItems}
            // handleFiltering={handleFiltering}
          />
          <DynamicDropdown
            dropdownText="Abcde"
            dropDownItems={null}
            setUniqueItems={setUniqueItems}
            uniqueItems={uniqueItems}
            // handleFiltering={handleFiltering}
          />
          <DynamicDropdown
            dropdownText="Contact"
            dropDownItems={getContact()}
            setUniqueItems={setUniqueItems}
            uniqueItems={uniqueItems}
            // handleFiltering={handleFiltering}
          />
        </div>
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

export default TableMutator;
