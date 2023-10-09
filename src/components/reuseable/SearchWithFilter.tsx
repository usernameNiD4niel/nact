import { FC, useState } from "react";
import Filter from "./Filter";
import { InventoryTableData, SupplierTableData } from "@/constants/objects";
import { AnimatePresence } from "framer-motion";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { FilterIcon } from "lucide-react";

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
        <Button type="button" className="py-[1.55rem]" variant="secondary">
          <FilterIcon className="text-xs" size={"22"} />
        </Button>
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
