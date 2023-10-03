import DynamicDropdown from "@/components/reuseable/DynamicDropdown";
import Filter from "@/components/reuseable/Filter";
import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import TableSixCol from "@/components/reuseable/TableSixCol";
import { InventoryTableData } from "@/constants/objects";
import { TableMutatorProps } from "@/constants/props";
import { useInventoryState } from "@/utils/InventoryState";
import { FC, useEffect, useState } from "react";
import { HiOutlinePlus, HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

const Available = (): JSX.Element => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);

	const [isShowingFilter, setIsShowingFilter] = useState<boolean>(false);

	useEffect(() => setActiveTab(0), []);
	return (
		<>
			<div className="md:px-10 px-5 w-full">
				<div className="space-y-5 z-[5] fixed top-[7.85rem] md:top-[4.10rem] py-6 bg-white w-[90%] md:w-[65%] xl:w-[70%]">
					<SearchWithFilter placeHolder="Search Inventory" isList={false} />
					<TableMutator setIsShowingFilter={setIsShowingFilter} />
				</div>
				<AddButton />
				<div className="mt-72 md:mt-52">
					<DisplayInventoryData />
				</div>
			</div>
			{isShowingFilter && (
				<Filter
					setIsShowingFilter={setIsShowingFilter}
					data={InventoryTableData}
				/>
			)}
		</>
	);
};

const TableMutator: FC<TableMutatorProps> = ({ setIsShowingFilter }) => {
	const [uniqueItems, setUniqueItems] = useState<string[]>([]);

	const handleRemoveSelected = (selectedItem: string) => {
		const removeItem = uniqueItems.filter((item) => item !== selectedItem);
		setUniqueItems(removeItem);
	};

	return (
		<div>
			<div className="w-full flex items-center justify-between flex-wrap">
				<div>
					<DynamicDropdown
						dropdownText="Sort"
						dropDownItems={[
							"Product Name",
							"City",
							"State",
							"Quantity",
							"Depot",
							"Price",
						]}
						uniqueItems={uniqueItems}
						setUniqueItems={setUniqueItems}
					/>
				</div>
				<div className="items-center hidden lg:flex">
					<DynamicDropdown
						dropdownText="Product Name"
						dropDownItems={["20 STD - CW", "40 HC - CW", "20 STD - OT"]}
						uniqueItems={uniqueItems}
						setUniqueItems={setUniqueItems}
					/>
					<DynamicDropdown
						dropdownText="City"
						dropDownItems={["Chicago"]}
						setUniqueItems={setUniqueItems}
						uniqueItems={uniqueItems}
					/>
					<DynamicDropdown
						dropdownText="State"
						dropDownItems={["USA"]}
						setUniqueItems={setUniqueItems}
						uniqueItems={uniqueItems}
					/>
					<DynamicDropdown
						dropdownText="Quantity"
						dropDownItems={["12 PCS"]}
						setUniqueItems={setUniqueItems}
						uniqueItems={uniqueItems}
					/>
					<DynamicDropdown
						dropdownText="Depot"
						dropDownItems={["Depot"]}
						setUniqueItems={setUniqueItems}
						uniqueItems={uniqueItems}
					/>
					<DynamicDropdown
						dropdownText="Price"
						dropDownItems={["$1,250"]}
						setUniqueItems={setUniqueItems}
						uniqueItems={uniqueItems}
					/>
				</div>
				<button
					className="text-gray-700 lg:hidden text-xs"
					type="button"
					onClick={() => setIsShowingFilter((prev) => !prev)}>
					Filter
				</button>
			</div>
			{uniqueItems.length !== 0 && (
				<ul className="flex w-full items-center gap-x-3 gap-y-2 bg-[#f3f4f6] py-2 px-4 flex-wrap">
					<li className="flex items-center gap-x-4">
						<span className=" text-xs">Filter</span>
						<div className="h-5 w-[1px] bg-slate-200" />
					</li>
					{uniqueItems.map((unique) => (
						<li
							key={unique}
							className="text-xs bg-white rounded-2xl p-2 flex items-center gap-x-2">
							{unique}{" "}
							<span
								className="text-xs hover:cursor-pointer"
								onClick={() => handleRemoveSelected(unique)}>
								<HiXMark />
							</span>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

const DisplayInventoryData = (): JSX.Element => {
	return (
		<section className="w-full flex items-center justify-center flex-col gap-y-2">
			<TableSixCol />
		</section>
	);
};

const AddButton = () => {
	return (
		<Link
			to="/inventory/add"
			className="fixed right-2 bottom-4 md:right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-14 h-14 bg-primary md:w-32 text-white text-2xl">
			<HiOutlinePlus />
			<span className="hidden md:block text-sm">INVENTORY</span>
		</Link>
	);
};

export default Available;
