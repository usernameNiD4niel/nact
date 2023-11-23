import React, { FC } from "react";
import DropdownContainerType from "../management/inventory/helper/dropdown-container-type";
import CustomInput from "./CustomInput";
import { InventoryProps } from "@/constants/props";

type ContainerInformationFormProps = {
  isDisabled: boolean;
  containerInfo: InventoryProps;
};

const ContainerInformationForm: FC<ContainerInformationFormProps> = ({
  isDisabled,
  containerInfo,
}) => {
  return (
    <React.Fragment>
      <DropdownContainerType defaultValue={containerInfo?.containerType} />
      <CustomInput
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="condition"
        label="Condition"
        defaultValue={containerInfo?.condition}
        key="ConditionKey"
      />
      <CustomInput
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="city"
        label="City"
        defaultValue={containerInfo?.city}
        key="CityKey"
      />
      <CustomInput
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="state"
        label="State"
        defaultValue={containerInfo?.state}
        key="StateKey"
      />
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
        isRequired={true}
        type="text"
        inputType="country"
        defaultValue={containerInfo?.country}
        label="Country"
        key="CountryKey"
      />
      <CustomInput
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="depot"
        label="Depot"
        key="DepotKey"
        defaultValue={containerInfo?.depot}
      />
      <CustomInput
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="validUntil"
        label="Valid Until"
        defaultValue={containerInfo?.validUntil}
        key="ValidUntilKey"
      />
      <CustomInput
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="quantity"
        defaultValue={containerInfo?.quantity}
        label="Quantity"
        key="QuantityKey"
      />
      <CustomInput
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="buyingRate"
        label="Buying Rate"
        defaultValue={containerInfo?.buyingRate}
        key="BuyingRateKey"
      />
      <CustomInput
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="sellingRate"
        defaultValue={containerInfo?.sellingRate}
        label="Selling Rate"
        key="SellingRateKey"
      />
    </React.Fragment>
  );
};

export default ContainerInformationForm;
