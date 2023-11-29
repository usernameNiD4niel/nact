import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { InventoryData, SupplierTableProps } from "@/constants/props";
import { FC, useState } from "react";
import { RiFileDownloadFill } from "react-icons/ri";
import { CSVLink } from "react-csv";
import { Label } from "@/components/ui/label";
import { AiOutlineClose } from "react-icons/ai";
import { Customer } from "../../customer/helper/column";

type FilteringDialogProps = {
  data: SupplierTableProps[] | InventoryData[] | Customer[];
};

function getFormattedDate(): string {
  const today = new Date();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Month is zero-based
  const day = today.getDate().toString().padStart(2, "0");
  const year = today.getFullYear().toString();

  return `${month}-${day}-${year}`;
}

const FilteringDialog: FC<FilteringDialogProps> = ({ data }) => {
  // const supplierRef = useRef<HTMLInputElement>(null);

  const [fileName, setFileName] = useState(getFormattedDate());
  const [isOpen, setIsOpen] = useState(false);

  const handleDownload = () => {
    setIsOpen(false);
    console.log("Downloading");
  };

  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          type="button"
          className="absolute right-0 top-0 h-full rounded-none border-s-[1px] border-s-black group border-opacity-20"
          variant="noVariant"
          onClick={() => setIsOpen(true)}
        >
          <span className="text-xl group-hover:text-[#017DC3]">
            {/* <CiCircleList /> */}
            <RiFileDownloadFill />
          </span>
        </Button>
      </DialogTrigger>
      <DialogContent className="px-10 py-6 md:p-6 w-full max-w-sm sm:max-w-[425px]">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Export as CSV</h4>
            <p className="text-sm text-muted-foreground max-w-xs">
              Take note: You can download only loaded data from the table
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <Label className="flex flex-col gap-y-2">
              <span>File name</span>
              <Input
                id="location"
                className="w-full"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                placeholder="File Name"
              />
            </Label>

            <Button asChild>
              <CSVLink
                data={data}
                filename={fileName}
                target="_blank"
                onClick={handleDownload}
              >
                Download
              </CSVLink>
            </Button>
          </div>
        </div>
        <div
          className="absolute top-3 right-3 w-6 flex items-center justify-center cursor-pointer h-6 z-10"
          onClick={handleDownload}
        >
          <span>
            <AiOutlineClose />
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default FilteringDialog;
