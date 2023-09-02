import { SuplierFormInventoryProps } from "@/constants/props";
import React, { FC } from "react";
import AnimatedInputs from "./AnimatedInputs";
import { HiOutlinePlus } from "react-icons/hi2";

type SupplierFormProps = {
	props: SuplierFormInventoryProps;
};

const SupplierFormInventory: FC<SupplierFormProps> = ({ props }) => {
	return (
		<React.Fragment>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="supplierName"
				value={props.supplierName}
				setValue={props.setSupplierName}
				label="Supplier Name"
				key="SupplierNameKey"
			/>
			<button className="flex w-full justify-end items-center text-primary gap-x-2">
				<HiOutlinePlus /> ADD
			</button>
			<AnimatedInputs
				isDisabled={true}
				type="text"
				inputType="businessName"
				value={props.businessName}
				setValue={props.setBusinessName}
				label="Business Name"
				key="BusinessNameKey"
			/>
			<AnimatedInputs
				isDisabled={true}
				type="text"
				inputType="completeAddress"
				value={props.completeAddress}
				setValue={props.setCompleteAddress}
				label="Complete Address"
				key="CompleteAddressKey"
			/>
			<AnimatedInputs
				isDisabled={true}
				type="text"
				inputType="contactNumber"
				value={props.contactNumber}
				setValue={props.setContactNumber}
				label="Complete Address"
				key="ContactNumberKey"
			/>
		</React.Fragment>
	);
};

export default SupplierFormInventory;
