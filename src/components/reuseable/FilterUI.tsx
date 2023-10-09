import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FilterForm } from "@/constants/props";
import { FilterIcon } from "lucide-react";
import { FC, useRef } from "react";

type FilterIUProps = {
  handleFilter: ({ contact, location, supplier }: FilterForm) => void;
};

const FilterUI: FC<FilterIUProps> = ({ handleFilter }) => {
  const supplierRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const handleSubmitFilter = () => {
    const request: FilterForm = {
      contact: contactRef.current?.value || "",
      location: locationRef.current?.value || "",
      supplier: supplierRef.current?.value || "",
    };

    console.log("filter ui component: ", request);

    handleFilter(request);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button type="button" className="py-[1.55rem]" variant="secondary">
          <FilterIcon className="text-xs" size={"22"} />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-120 p-6">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Filter</h4>
            <p className="text-sm text-muted-foreground max-w-xs">
              You can enter 1 field and submit and it will filter that data.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="supplier">Supplier</Label>
              <Input
                id="supplier"
                className="col-span-2 h-8"
                ref={supplierRef}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                className="col-span-2 h-8"
                ref={locationRef}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="contact">Contact</Label>
              <Input id="contact" className="col-span-2 h-8" ref={contactRef} />
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

export default FilterUI;
