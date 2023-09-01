import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { ContainerInformationProps } from "@/constants/props";
import { headerBackClass } from "@/constants/reusable-class";
import React, { FC, useState } from "react";

const AddInventory = () => {
	// Container Information state fields
	const [containerType, setContainerType] = useState<string>("");
	const [condition, setCondition] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [region, setRegion] = useState<string>("");
	const [country, setCountry] = useState<string>("");
	const [depot, setDepot] = useState<string>("");
	const [validUntil, setValidUntil] = useState<string>("");
	const [quantity, setQuantity] = useState<string>("");
	const [buyingRate, setBuyingRate] = useState<string>("");
	const [sellingRate, setSellingRate] = useState<string>("");

	const containerInformation: ContainerInformationProps = {
		buyingRate,
		city,
		country,
		condition,
		state,
		containerType,
		depot,
		quantity,
		region,
		sellingRate,
		validUntil,
		setBuyingRate,
		setCity,
		setCountry,
		setCondition,
		setContainerType,
		setDepot,
		setQuantity,
		setRegion,
		setSellingRate,
		setState,
		setValidUntil,
	};

	return (
		<div className={headerBackClass}>
			<div className="flex items-center justify-center flex-col w-full mt-10">
				<HeaderWithBack text="Add Inventory" route="/inventory" />
				<form className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6">
					<h3 className="text-sm font-bold my-3">Container Information</h3>
					<div className="flex flex-col w-full gap-y-4">
						<ContainerInformation {...containerInformation} />
					</div>
					<div className="w-full flex flex-col md:flex-row-reverse items-center gap-3 mt-5">
						<button
							type="submit"
							className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-primary">
							Submit
						</button>
						<button
							type="reset"
							className="w-full text-center p-3 md:w-fit md:px-9 text-primary">
							Reset
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

const ContainerInformation: FC<ContainerInformationProps> = (props) => {
	return (
		<React.Fragment>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="containerType"
				value={props.containerType}
				setValue={props.setContainerType}
				label="Container Type"
				key="ContainerTypeKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="condition"
				value={props.condition}
				setValue={props.setCondition}
				label="Condition"
				key="ConditionKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="city"
				value={props.city}
				setValue={props.setCity}
				label="City"
				key="CityKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="city"
				value={props.state}
				setValue={props.setState}
				label="State"
				key="StateKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="region"
				value={props.region}
				setValue={props.setRegion}
				label="Region"
				key="RegionKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="country"
				value={props.country}
				setValue={props.setCountry}
				label="Country"
				key="CountryKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="depot"
				value={props.depot}
				setValue={props.setDepot}
				label="Depot"
				key="DepotKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="validUntil"
				value={props.validUntil}
				setValue={props.setValidUntil}
				label="Valid Until"
				key="ValidUntilKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="quantity"
				value={props.quantity}
				setValue={props.setQuantity}
				label="Quantity"
				key="QuantityKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="buyingRates"
				value={props.buyingRate}
				setValue={props.setBuyingRate}
				label="Buying Rate"
				key="BuyingRateKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				type="text"
				inputType="sellingRate"
				value={props.sellingRate}
				setValue={props.setSellingRate}
				label="Selling Rate"
				key="SellingRateKey"
			/>
		</React.Fragment>
	);
};

export default AddInventory;
