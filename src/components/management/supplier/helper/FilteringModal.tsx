import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FilterIcon } from "lucide-react";

const FilteringModal = () => {
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
            <Input id="supplier" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="location">Location</Label>
            <Input id="location" className="col-span-2 h-8" />
          </div>
          <div className="grid grid-cols-3 items-center gap-4">
            <Label htmlFor="contact">Contact</Label>
            <Input id="contact" className="col-span-2 h-8" />
          </div>
          <Button className="my-2">Submit</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilteringModal;
