import React, { FC, useRef } from "react";
import DropdownContainerType from "../management/inventory/helper/dropdown-container-type";
import CustomInput from "./CustomInput";
import { InventoryWithLocationProps } from "@/constants/props";
import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";
import LocationForm from "./LocationForm";

type ContainerInformationFormProps = {
	isDisabled: boolean;
	containerInfo: InventoryWithLocationProps;

	validUntil: string;
	setValidUntil: React.Dispatch<React.SetStateAction<string>>;
};

const ContainerInformationForm: FC<ContainerInformationFormProps> = ({
	isDisabled,
	containerInfo,
	setValidUntil,
	validUntil,
}) => {
	const birthdateRef = useRef<HTMLInputElement | null>(null);

	const handleValidUntil = () => {
		birthdateRef.current?.showPicker();
	};

	return (
		<React.Fragment>
			<div className="w-full flex flex-col gap-y-1">
				<Label className={cn(isDisabled ? "flex" : "hidden")}>
					Container Type
				</Label>
				<DropdownContainerType
					defaultValue={containerInfo?.containerType}
					isDisabled={isDisabled}
				/>
			</div>

			<div className="w-full flex flex-col gap-y-1">
				<Label className={cn(isDisabled ? "flex" : "hidden")}>Condition</Label>
				<CustomInput
					isDisabled={isDisabled}
					isRequired={true}
					type="text"
					inputType="condition"
					label="Condition"
					defaultValue={containerInfo?.condition}
					key="ConditionKey"
				/>
			</div>

			{/* //! fix the get, the inventory should have a location object and extractable data */}
			<LocationForm
				hasRegion={true}
				isDisabled={isDisabled}
				defaultCity={containerInfo.location.city}
			/>

			{/* <div className="w-full flex flex-col gap-y-1">
				<Label className={cn(isDisabled ? "flex" : "hidden")}>City</Label>
				<ComboBox
					setInputValue={setCity}
					inputValue={city}
					isDisabled={isDisabled}
					key={"ContainerInformationFormComboBox"}
				/>
			</div>

			<label className="relative" htmlFor="state">
				<span className={cn(isDisabled ? "flex" : "hidden", "text-sm")}>
					State
				</span>
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					value={state}
					name="state"
					disabled
					id="state"
					onChange={(e) => setState(e.target.value)}
				/>
			</label>
			<label className="relative" htmlFor="country">
				<span className={cn(isDisabled ? "flex" : "hidden", "text-sm")}>
					Country
				</span>
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					value={country}
					name="country"
					disabled
					id="country"
					onChange={(e) => setCountry(e.target.value)}
				/>
			</label>
			<div className="w-full flex flex-col gap-y-1">
				<Label className={cn(isDisabled ? "flex" : "hidden")}>Region</Label>
				<CustomInput
					isDisabled={isDisabled}
					isRequired={false}
					type="text"
					inputType="region"
					label="Region"
					defaultValue={containerInfo?.region}
					key="RegionKey"
				/>
			</div> */}
			<div className="w-full flex flex-col gap-y-1">
				<Label className={cn(isDisabled ? "flex" : "hidden")}>Depot</Label>
				<CustomInput
					isDisabled={isDisabled}
					isRequired={false}
					type="text"
					inputType="depot"
					label="Depot"
					key="DepotKey"
					defaultValue={containerInfo?.depot}
				/>
			</div>
			<label className="relative rounded-lg" htmlFor="validUntil">
				<span className={cn(isDisabled ? "flex" : "hidden", "text-sm")}>
					Valid Until
				</span>
				<input
					type="date"
					className={`hover:cursor-pointer ${animatedInputClass} disabled:bg-gray-100`}
					ref={birthdateRef}
					id="validUntil"
					autoComplete="no"
					value={validUntil}
					disabled={isDisabled}
					onFocus={() => handleValidUntil()}
					name="validUntil"
					onChange={(e) => setValidUntil(e.target.value)}
					required
				/>
				<button
					type="button"
					className={cn(
						"absolute w-10 h-8 flex items-center justify-center bg-white  z-[5] right-[2px] bottom-2 hover:text-primary",
						isDisabled && "bg-gray-100",
					)}
					onClick={handleValidUntil}>
					<span
						className={cn(isDisabled ? "text-slate-400" : "text-slate-600")}>
						<HiOutlineCalendarDays />
					</span>
				</button>
				<span
					className={`${`${animatedSpanClass} whitespace-nowrap ${
						isDisabled && "hidden"
					}`} ${validUntil && "input-contains"} ${
						isDisabled && "disabled-label"
					}`}>
					Valid Until
				</span>
			</label>
			<div className="w-full flex flex-col gap-y-1">
				<Label className={cn(isDisabled ? "flex" : "hidden")}>Quantity</Label>
				<CustomInput
					isDisabled={isDisabled}
					isRequired={true}
					type="number"
					inputType="quantity"
					defaultValue={containerInfo?.quantity}
					label="Quantity"
					key="QuantityKey"
				/>
			</div>
			<div className="w-full flex flex-col gap-y-1">
				<Label className={cn(isDisabled ? "flex" : "hidden")}>
					Buying Rate
				</Label>
				<CustomInput
					isDisabled={isDisabled}
					isRequired={true}
					type="number"
					inputType="buyingRate"
					label="Buying Rate"
					defaultValue={containerInfo?.buyingRate}
					key="BuyingRateKey"
				/>
			</div>
			<div className="w-full flex flex-col gap-y-1">
				<Label className={cn(isDisabled ? "flex" : "hidden")}>
					Selling Rate
				</Label>
				<CustomInput
					isDisabled={true}
					isRequired={false}
					type="number"
					inputType="sellingRate"
					defaultValue={containerInfo?.sellingRate ?? 0}
					label="Selling Rate"
					key="SellingRateKey"
				/>
			</div>
		</React.Fragment>
	);
};

export default ContainerInformationForm;
