import React, { FC } from "react";
import AnimatedInputs from "./AnimatedInputs";
import { ContainerInformationProps } from "@/constants/props";

type ContainerInformationFormProps = {
	isDisabled: boolean;
	props: ContainerInformationProps;
};

const ContainerInformationForm: FC<ContainerInformationFormProps> = ({
	isDisabled,
	props,
}) => {
	return (
		<React.Fragment>
			<AnimatedInputs
				isDisabled={isDisabled}
				type="text"
				inputType="containerType"
				value={props.containerType}
				setValue={props.setContainerType}
				label="Container Type"
				key="ContainerTypeKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
				type="text"
				inputType="condition"
				value={props.condition}
				setValue={props.setCondition}
				label="Condition"
				key="ConditionKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
				type="text"
				inputType="city"
				value={props.city}
				setValue={props.setCity}
				label="City"
				key="CityKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
				type="text"
				inputType="city"
				value={props.state}
				setValue={props.setState}
				label="State"
				key="StateKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
				type="text"
				inputType="region"
				value={props.region}
				setValue={props.setRegion}
				label="Region"
				key="RegionKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
				type="text"
				inputType="country"
				value={props.country}
				setValue={props.setCountry}
				label="Country"
				key="CountryKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
				type="text"
				inputType="depot"
				value={props.depot}
				setValue={props.setDepot}
				label="Depot"
				key="DepotKey"
			/>
			<AnimatedInputs
				isDisabled={isDisabled}
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

export default ContainerInformationForm;
