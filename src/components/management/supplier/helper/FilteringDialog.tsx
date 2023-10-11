import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Payment } from "@/constants/props";
import { FilterIcon } from "lucide-react";
import { FC, useRef } from "react";

type FilteringDialogProps = {
  setData: React.Dispatch<React.SetStateAction<Payment[]>>;
};

const FilteringDialog: FC<FilteringDialogProps> = ({ setData }) => {
  const supplierRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);

  const handleSubmitFilter = () => {
    // Fetch new data based on the filter data
    // Update the table data using setData
    // ! Delete this
    const data: Payment[] = [
      {
        id: "100",
        supplier: "No",
        abcde: "code",
        contact: "yet",
        location: "backend",
      },
    ];
    setData(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="py-[1.55rem]" variant="secondary">
          <FilterIcon className="text-xs" size={"22"} />
        </Button>
      </DialogTrigger>
      <DialogContent className="px-10 py-6 w-screen md:p-6 md:w-auto">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Search by column</h4>
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
      </DialogContent>
    </Dialog>
  );
};

export default FilteringDialog;
