import React, { FC, useEffect, useRef, useState } from "react";
import DropdownContainerType from "../management/inventory/helper/dropdown-container-type";
import CustomInput from "./CustomInput";
import { InventoryProps } from "@/constants/props";
import ComboBox from "./ComboBox";
import { cities, states } from "@/constants/objects";
import {
	animatedInputClass,
	animatedSpanClass,
} from "@/constants/reusable-class";
import { HiOutlineCalendarDays } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Label } from "../ui/label";

type ContainerInformationFormProps = {
	isDisabled: boolean;
	containerInfo: InventoryProps;

	state: string;
	country: string;
	validUntil: string;

	setState: React.Dispatch<React.SetStateAction<string>>;
	setCountry: React.Dispatch<React.SetStateAction<string>>;
	setValidUntil: React.Dispatch<React.SetStateAction<string>>;
};

const ContainerInformationForm: FC<ContainerInformationFormProps> = ({
	isDisabled,
	containerInfo,
	country,
	setCountry,
	setState,
	setValidUntil,
	state,
	validUntil,
}) => {
	const birthdateRef = useRef<HTMLInputElement | null>(null);

	const [city, setCity] = useState(containerInfo.city);

	const handleValidUntil = () => {
		birthdateRef.current?.showPicker();
	};

	useEffect(() => {
		for (const state_ in cities) {
			// @ts-expect-error - This should not happen
			// eslint-disable-next-line no-prototype-builtins
			if (cities.hasOwnProperty(state_) && cities[state_].includes(city)) {
				setState(state_);
				console.log(state_);

				return;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city]);

	useEffect(() => {
		for (const country_ in states) {
			// @ts-expect-error - This should not happen
			// eslint-disable-next-line no-prototype-builtins
			if (states.hasOwnProperty(country_) && states[country_].includes(state)) {
				setCountry(country_);
				console.log(country_);

				return;
			}
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [state]);

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

			<div className="w-full flex flex-col gap-y-1">
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
			</div>
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
