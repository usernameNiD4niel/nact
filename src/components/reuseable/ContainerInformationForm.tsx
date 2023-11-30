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
			<DropdownContainerType
				defaultValue={containerInfo?.containerType}
				isDisabled={isDisabled}
			/>
			<CustomInput
				isDisabled={isDisabled}
				isRequired={true}
				type="text"
				inputType="condition"
				label="Condition"
				defaultValue={containerInfo?.condition}
				key="ConditionKey"
			/>
			{isDisabled ? (
				<CustomInput
					isDisabled={isDisabled}
					isRequired={false}
					type="text"
					inputType="__blank"
					label="__blank"
					defaultValue={containerInfo.city}
					key="CityKey"
				/>
			) : (
				<ComboBox
					setInputValue={setCity}
					inputValue={city}
					key={"ContainerInformationFormComboBox"}
				/>
			)}
			<label className="relative" htmlFor="state">
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
			<CustomInput
				isDisabled={isDisabled}
				isRequired={true}
				type="text"
				inputType="region"
				label="Region"
				defaultValue={containerInfo?.region}
				key="RegionKey"
			/>
			<CustomInput
				isDisabled={isDisabled}
				isRequired={false}
				type="text"
				inputType="depot"
				label="Depot"
				key="DepotKey"
				defaultValue={containerInfo?.depot}
			/>
			<label className="relative rounded-lg" htmlFor="validUntil">
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
						"absolute w-10 h-8 flex items-center justify-center bg-white  z-[5] right-[2px] top-2 text-black hover:text-primary",
						isDisabled && "bg-gray-100",
					)}
					onClick={handleValidUntil}>
					<HiOutlineCalendarDays />
				</button>
				<span
					className={`${`${animatedSpanClass} whitespace-nowrap ${
						isDisabled && "hidden"
					}`} ${validUntil && "input-contains"} ${
						isDisabled && "disabled-label"
					}`}>
					Valid Until
				</span>
				<button
					type="button"
					className="absolute right-4 top-4 z-100 text-black opacity-90 bg-white md:bg-gray-500 hover:text-[#017DC3] hover:opacity-100"
					onClick={handleValidUntil}>
					<HiOutlineCalendarDays />
				</button>
			</label>
			<CustomInput
				isDisabled={isDisabled}
				isRequired={true}
				type="number"
				inputType="quantity"
				defaultValue={containerInfo?.quantity}
				label="Quantity"
				key="QuantityKey"
			/>
			<CustomInput
				isDisabled={isDisabled}
				isRequired={true}
				type="number"
				inputType="buyingRate"
				label="Buying Rate"
				defaultValue={containerInfo?.buyingRate}
				key="BuyingRateKey"
			/>
			<CustomInput
				isDisabled={isDisabled}
				isRequired={false}
				type="number"
				inputType="sellingRate"
				defaultValue={containerInfo?.sellingRate}
				label="Selling Rate"
				key="SellingRateKey"
			/>
		</React.Fragment>
	);
};

export default ContainerInformationForm;
