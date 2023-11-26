import { IoIosAddCircle } from "react-icons/io";
import ComboBoxInput from "./ComboBoxInput";
import { animatedInputClass } from "@/constants/reusable-class";
import { Link } from "react-router-dom";
import React, { FC, useEffect, useState } from "react";
import { SupplierInventory } from "@/constants/props";
import { useQuery } from "@tanstack/react-query";
import { getSupplierInventory } from "@/api/inventory";

interface SupplierFormInventoryProps {
	supplierInventory: SupplierInventory;
}

const SupplierFormInventory: FC<SupplierFormInventoryProps> = ({
	supplierInventory,
}) => {
	const [businessName, setBusinessName] = useState(
		supplierInventory.businessName,
	);

	const [completeAddress, setCompleteAddress] = useState(
		supplierInventory.completeAddress,
	);

	const [contactNumber, setContactNumber] = useState(
		supplierInventory.contactNumber,
	);

	const [selectedSupplier, setSelectedSupplier] = useState("");

	const { data } = useQuery(["inventory-get-business-name"], {
		queryFn: () => getSupplierInventory(),
	});

	useEffect(() => {
		if (selectedSupplier && data) {
			const item = data.find((item) => item.businessName === selectedSupplier);
			if (item) {
				setBusinessName(item.businessName);
				setCompleteAddress(item.completeAddress);
				setContactNumber(item.companyPhoneNumber);
			}
		}
	}, [selectedSupplier]);

	return (
		<React.Fragment>
			{data && (
				<ComboBoxInput
					supplierName={data}
					inputValue={selectedSupplier}
					setInputValue={setSelectedSupplier}
				/>
			)}
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
					value={businessName}
					onChange={(e) => setBusinessName(e.target.value)}
					autoComplete="no"
				/>
			</label>
			<label className="relative" htmlFor="completeAddress">
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					name="completeAddress"
					disabled
					value={completeAddress}
					onChange={(e) => setCompleteAddress(e.target.value)}
					id="completeAddress"
					required
					autoComplete="no"
				/>
			</label>
			<label className="relative" htmlFor="contactNumber">
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					name="contactNumber"
					disabled
					id="contactNumber"
					value={contactNumber}
					onChange={(e) => setContactNumber(e.target.value)}
					required
					autoComplete="no"
				/>
			</label>
		</React.Fragment>
	);
};

export default SupplierFormInventory;
