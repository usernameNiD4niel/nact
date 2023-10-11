import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { InventoryTypes } from "@/constants/props";
import { FilterIcon } from "lucide-react";
import { FC, useRef } from "react";

type FilteringDialogProps = {
  setData: React.Dispatch<React.SetStateAction<InventoryTypes[]>>;
};

const FilteringDialog: FC<FilteringDialogProps> = ({ setData }) => {
  const productNameRef = useRef<HTMLInputElement>(null);
  const cityRef = useRef<HTMLInputElement>(null);
  const stateRef = useRef<HTMLInputElement>(null);
  const quantityRef = useRef<HTMLInputElement>(null);
  const depotRef = useRef<HTMLInputElement>(null);
  const priceRef = useRef<HTMLInputElement>(null);

  const handleSubmitFilter = () => {
    // Fetch new data based on the filter data
    // Update the table data using setData
    // ! Delete this
    const data: InventoryTypes[] = [];
    setData(data);
  };

  return (
    <Popover modal={true}>
      <PopoverTrigger asChild>
        <Button type="button" className="py-[1.55rem]" variant="secondary">
          <FilterIcon className="text-xs" size={"22"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="px-10 py-6 w-screen md:p-6 md:w-auto">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Search by column</h4>
            <p className="text-sm text-muted-foreground max-w-xs">
              You can enter 1 field and submit and it will filter that data.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="productName">Product Name</Label>
              <Input
                id="productName"
                className="col-span-2 h-8"
                ref={productNameRef}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="city">City</Label>
              <Input id="city" className="col-span-2 h-8" ref={cityRef} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="state">State</Label>
              <Input id="state" className="col-span-2 h-8" ref={stateRef} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="quantity">Quantity</Label>
              <Input
                id="quantity"
                className="col-span-2 h-8"
                ref={quantityRef}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="depot">Depot</Label>
              <Input id="depot" className="col-span-2 h-8" ref={depotRef} />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="price">Price</Label>
              <Input id="price" className="col-span-2 h-8" ref={priceRef} />
            </div>
            <Button className="my-2" onClick={handleSubmitFilter}>
              Submit
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default FilteringDialog;
