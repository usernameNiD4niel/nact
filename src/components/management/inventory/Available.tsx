import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { columns } from "./helper/columns";
import { mobileColumn } from "./helper/mobile-column";
import AddButton from "@/components/reuseable/AddButton";
import { NewDataTable } from "./helper/new-table-data";
import { getPaginatedData } from "@/api/inventory";
import { InventoryData } from "@/constants/props";

const Available = (): JSX.Element => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);

	const [data, setData] = useState<InventoryData[]>([]);

	const fetchedData = async () => {
		if (nextPageUrl && nextPageUrl !== null) {
			const data_ = await getPaginatedData(nextPageUrl);
			setNextPageUrl(data_.next_page);
			setData(data_.products);
		}
	};

	useEffect(() => {
		fetchedData();
		setActiveTab(0);
	}, []);

	return (
		<>
			<div className="w-full flex items-center justify-center">
				<div className="md:px-10 px-5 w-full">
					<div className="mt-36 md:mt-24 w-full">
						<div className="w-full md:flex hidden">
							<NewDataTable
								columns={columns}
								data={data}
								next_page_url={nextPageUrl}
								setData={setData}
							/>
						</div>
						<div className="md:hidden w-full">
							<NewDataTable
								columns={mobileColumn}
								data={data}
								next_page_url={nextPageUrl}
								setData={setData}
							/>
						</div>
					</div>
				</div>
				<AddButton
					redirectUrl="/inventory/add"
					textButton="Inventory"
					key={"InventoryAddTable"}
				/>
			</div>
		</>
	);
};

// const AddButton = () => {
//   return (
//     <Link
//       to="/inventory/add"
//       className="fixed right-2 bottom-4 md:right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-primary md:w-32 text-white text-2xl"
//     >
//       <HiOutlinePlus />
//       <span className="hidden md:block text-sm">INVENTORY</span>
//     </Link>
//   );
// };

export default Available;
