import { FC } from "react";
import { InventoryTypes } from "@/constants/props";
import { Input } from "@/components/ui/input";
import FilteringDialog from "./FilteringDialog";

type SearchWithFilterProps = {
  placeHolder: string;
  isList: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  setData: React.Dispatch<React.SetStateAction<InventoryTypes[]>>;
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
  placeHolder,
  onChange,
  value,
  setData,
}) => {
  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
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
        {/* <FilterUI handleFilter={handleFilter} /> */}
        <FilteringDialog setData={setData} />
        {/* <FilteringModal /> */}
        {/* <FilterModal
          contact={contact}
          location={location}
          setContact={setContact}
          setLocation={setLocation}
          handleFilter={handleFilter}
          setSupplier={setSupplier}
          supplier={supplier}
        /> */}
      </form>
    </>
  );
};

export default SearchWithFilter;
