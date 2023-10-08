import DynamicDropdown from "@/components/reuseable/DynamicDropdown";
import { Button } from "@/components/ui/button";
import { TableMutatorProps } from "@/constants/props";
import { FC, useState } from "react";
import { HiOutlinePlus, HiXMark } from "react-icons/hi2";
import { Link } from "react-router-dom";

const TableMutator: FC<TableMutatorProps> = ({ setIsShowingFilter }) => {
	const [uniqueItems, setUniqueItems] = useState<string[]>([]);

	const handleRemoveSelected = (selectedItem: string) => {
		const removeItem = uniqueItems.filter((item) => item !== selectedItem);
		setUniqueItems(removeItem);
	};

	return (
		<div>
			<div className="w-full flex items-center justify-between flex-wrap">
				{/* <div>
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
        </div> */}
				<div>
					<Button className="text-xl">
						<Link to="/inventory/add" className="flex gap-1">
							<HiOutlinePlus />
							<span className="hidden md:block text-sm">INVENTORY</span>
						</Link>
					</Button>
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

export default TableMutator;
