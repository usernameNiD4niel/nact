import { FC, useState } from "react";
import Filter from "./Filter";
import { InventoryTableData, SupplierTableData } from "@/constants/objects";
import { AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";

type SearchWithFilterProps = {
  placeHolder: string;
  isList: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
};

const SearchWithFilter: FC<SearchWithFilterProps> = ({
  placeHolder,
  isList,
  onChange,
  value,
}) => {
  const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

  const handleOnSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  return (
    <>
      <form
        className="w-full flex items-center justify-center relative"
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
