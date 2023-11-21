import { IoIosAddCircle } from "react-icons/io";
import ComboBoxInput from "./ComboBoxInput";
import { animatedInputClass } from "@/constants/reusable-class";
import { Link } from "react-router-dom";
import React, { FC } from "react";
import { SupplierInventory } from "@/constants/props";

interface SupplierFormInventoryProps {
	supplierName: string;
	setSupplierName: React.Dispatch<React.SetStateAction<string>>;
	supplierInventory?: SupplierInventory;
}

const SupplierFormInventory: FC<SupplierFormInventoryProps> = ({
	setSupplierName,
	supplierName,
	supplierInventory,
}) => {
	return (
		<React.Fragment>
			<ComboBoxInput
				inputValue={supplierName}
				setInputValue={setSupplierName}
			/>
			<div className="flex w-full justify-end items-center">
				<Link
					to={"/supplier/add/shipping"}
					className="text-[#017DC3] flex items-center text-lg gap-x-2"
					type="button">
					<IoIosAddCircle /> <span className="text-sm">ADD</span>
				</Link>
			</div>
			<label className="relative" htmlFor="businessName">
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					name="businessName"
					id="businessName"
					required
					disabled
					defaultValue={supplierInventory?.businessName}
					autoComplete="no"
				/>
			</label>
			<label className="relative" htmlFor="completeAddress">
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					name="completeAddress"
					disabled
					id="completeAddress"
					required
					defaultValue={supplierInventory?.completeAddress}
					autoComplete="no"
				/>
			</label>
			<label className="relative" htmlFor="contactNumber">
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					name="contactNumber"
					disabled
					defaultValue={supplierInventory?.contactNumber}
					id="contactNumber"
					required
					autoComplete="no"
				/>
			</label>
		</React.Fragment>
	);
};

export default SupplierFormInventory;
