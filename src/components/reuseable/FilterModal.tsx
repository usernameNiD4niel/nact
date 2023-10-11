import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterIcon } from "lucide-react";
import { FC } from "react";

type FilterModalProps = {
  supplier: string;
  location: string;
  contact: string;
  setSupplier: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setContact: React.Dispatch<React.SetStateAction<string>>;
  handleSubmitFilter: () => void;
};

const FilterModal: FC<FilterModalProps> = ({
  contact,
  location,
  supplier,
  handleSubmitFilter,
  setContact,
  setLocation,
  setSupplier,
}) => {
  const handleOnChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button type="button" className="py-[1.55rem]" variant="secondary">
          <FilterIcon className="text-xs" size={"22"} />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search by column</DialogTitle>
          <DialogDescription>
            You can enter 1 field and submit and it will filter that data.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-2">
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="supplier">Supplier</Label>
            <Input
              id="supplier"
              className="col-span-2 h-8"
              value={supplier}
              onChange={(event) => handleOnChange(event, setSupplier)}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              className="col-span-2 h-8"
              value={location}
              onChange={(event) => handleOnChange(event, setLocation)}
            />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="contact">Contact</Label>
            <Input
              id="contact"
              className="col-span-2 h-8"
              value={contact}
              onChange={(event) => handleOnChange(event, setContact)}
            />
          </div>
          <Button className="my-2" onClick={handleSubmitFilter}>
            Submit
          </Button>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
