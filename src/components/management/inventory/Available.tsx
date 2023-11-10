import { inventoryData } from "@/constants/objects";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import { columns } from "./helper/columns";
import { mobileColumn } from "./helper/mobile-column";
import AddButton from "@/components/reuseable/AddButton";
import { NewDataTable } from "./helper/new-table-data";
import { InventoryTypes } from "@/constants/props";

const getInitialData = async (
	setNextPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/supplier?page=1&per_page=10`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		const inventory: InventoryTypes[] = (await data).inventory;
		setNextPageUrl((await data).next_page);
		return inventory;
	}

	throw new Error("cannot get the data");
};

const Available = (): JSX.Element => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const [nextPageUrl, setNextPageUrl] = useState<number | null>(null);

	const [data, setData] = useState(inventoryData);

	const fetchedData = async () => {
		const data = await getInitialData(setNextPageUrl);
		setData(data);
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
