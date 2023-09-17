import { SuplierFormInventoryProps } from "@/constants/props";
import React, { FC } from "react";
import AnimatedInputs from "./AnimatedInputs";
import { IoIosAddCircle } from "react-icons/io";

type SupplierFormProps = {
	props: SuplierFormInventoryProps;
	isDisabled: boolean;
};

const SupplierFormInventory: FC<SupplierFormProps> = ({
	props,
	isDisabled,
}) => {
	return (
		<React.Fragment>
			<AnimatedInputs
				isDisabled={isDisabled}
				isRequired={true}
				type="text"
				inputType="supplierName"
				value={props.supplierName}
				setValue={props.setSupplierName}
				label="Supplier Name"
				key="SupplierNameKey"
			/>
			<div className="flex w-full justify-end items-center">
				<button className="text-primary flex items-center text-lg gap-x-2">
					<IoIosAddCircle /> <span className="text-sm">ADD</span>
				</button>
			</div>
			<AnimatedInputs
				isDisabled={isDisabled}
				isRequired={true}
				type="text"
				inputType="businessName"
				value={props.businessName}
				setValue={props.setBusinessName}
				label="Business Name"
				key="BusinessNameKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
				isRequired={true}
				type="text"
				inputType="completeAddress"
				value={props.completeAddress}
				setValue={props.setCompleteAddress}
				label="Complete Address"
				key="CompleteAddressKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
				isRequired={true}
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
