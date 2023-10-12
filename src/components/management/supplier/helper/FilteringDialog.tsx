import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Payment } from "@/constants/props";
import { FC, useRef } from "react";
import { CiCircleList } from "react-icons/ci";

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
				<Button
					type="button"
					className="absolute right-0 top-0 h-full rounded-none border-s-[1px] border-s-black group border-opacity-20"
					variant="noVariant">
					{/* <FilterIcon className="text-xs text-[#017DC3]" size={15} /> */}
					<span className="text-xl group-hover:text-[#017DC3]">
						<CiCircleList />
					</span>
				</Button>
			</DialogTrigger>
			<DialogContent className="px-10 py-6 md:p-6 w-full max-w-sm md:w-auto">
				<div className="grid gap-4">
					<div className="space-y-2">
						<h4 className="font-medium leading-none">Search by column</h4>
						<p className="text-sm text-muted-foreground max-w-xs">
							You can enter 1 field and submit and it will filter that data.
						</p>
					</div>
					<div className="flex flex-col gap-2">
						<Input
							id="supplier"
							className="w-full"
							ref={supplierRef}
							placeholder="Supplier"
						/>
						<Input
							id="location"
							className="w-full"
							ref={locationRef}
							placeholder="Location"
						/>
						<Input
							id="contact"
							className="w-full "
							ref={contactRef}
							placeholder="Contact"
						/>
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
