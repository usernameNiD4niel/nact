import { FC, useState } from "react";
import Filter from "./Filter";
import { InventoryTableData, SupplierTableData } from "@/constants/objects";
import { AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import FilterUI from "./FilterUI";
import { FilterForm, Payment } from "@/constants/props";
import FilterModal from "./FilterModal";

type SearchWithFilterProps = {
  placeHolder: string;
  isList: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
  placeHolder,
  isList,
  onChange,
  value,
  setData,
}) => {
  const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  const [supplier, setSupplier] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");

  const data: Payment[] = [];

  const handleSubmitFilter = () => {
    // Update the data state to update the table according to the filtered data
  };

  return (
    <>
      <form
        className="w-full flex items-center gap-x-1 justify-center relative"
        onSubmit={handleOnSubmit}
      >
        <Input
          type="text"
          placeholder={placeHolder}
          className="py-6"
          value={value}
          onChange={onChange}
          // className="border-[1px] rounded-lg border-black border-opacity-10 w-full p-3 focus:outline-primary focus:outline-1"
        />
        <FilterUI handleFilter={handleFilter} />
        <FilterModal
          contact={contact}
          handleSubmitFilter={handleSubmitFilter}
          location={location}
          setContact={setContact}
          setLocation={setLocation}
          setSupplier={setSupplier}
          supplier={supplier}
        />
      </form>
      <AnimatePresence>
        {isShowingFilter && (
          <>
            {isList ? (
              <Filter
                setIsShowingFilter={setIsShowingFilter}
                data={SupplierTableData}
              />
            ) : (
              <Filter
                setIsShowingFilter={setIsShowingFilter}
                data={InventoryTableData}
              />
            )}
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchWithFilter;
