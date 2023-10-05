import { SuplierFormInventoryProps } from "@/constants/props";
import React, { FC, useEffect } from "react";
import { IoIosAddCircle } from "react-icons/io";
import ComboBoxInput from "./ComboBoxInput";
import { animatedInputClass } from "@/constants/reusable-class";

type SupplierFormProps = {
  props: SuplierFormInventoryProps;
};

const SupplierFormInventory: FC<SupplierFormProps> = ({ props }) => {
  useEffect(() => {
    if (props.supplierName.includes("1")) {
      props.setBusinessName("Business Name 1");
      props.setCompleteAddress("Complete Address 1");
      props.setContactNumber("Contact Number 1");
    } else if (props.supplierName.includes("2")) {
      props.setBusinessName("Business Name 2");
      props.setCompleteAddress("Complete Address 2");
      props.setContactNumber("Contact Number 2");
    } else if (props.supplierName.includes("3")) {
      props.setBusinessName("Business Name 3");
      props.setCompleteAddress("Complete Address 3");
      props.setContactNumber("Contact Number 3");
    } else if (props.supplierName.includes("4")) {
      props.setBusinessName("Business Name 4");
      props.setCompleteAddress("Complete Address 4");
      props.setContactNumber("Contact Number 4");
    } else {
      props.setBusinessName("Business Name 5");
      props.setCompleteAddress("Complete Address 5");
      props.setContactNumber("Contact Number 5");
    }
  }, [props]);

  return (
    <React.Fragment>
      <ComboBoxInput
        inputValue={props.supplierName}
        setInputValue={props.setSupplierName}
      />
      <div className="flex w-full justify-end items-center">
        <button className="text-[#017DC3] flex items-center text-lg gap-x-2">
          <IoIosAddCircle /> <span className="text-sm">ADD</span>
        </button>
      </div>
      <label className="relative" htmlFor="businessName">
        <input
          type="text"
          className={`${animatedInputClass} disabled:bg-gray-100`}
          value={props.businessName}
          name="businessName"
          id="businessName"
          required
          disabled
          autoComplete="no"
          onChange={(e) => props.setBusinessName(e.target.value)}
        />
      </label>
      <label className="relative" htmlFor="completeAddress">
        <input
          type="text"
          className={`${animatedInputClass} disabled:bg-gray-100`}
          value={props.completeAddress}
          name="completeAddress"
          disabled
          id="completeAddress"
          required
          autoComplete="no"
          onChange={(e) => props.setCompleteAddress(e.target.value)}
        />
      </label>
      <label className="relative" htmlFor="contactNumber">
        <input
          type="text"
          className={`${animatedInputClass} disabled:bg-gray-100`}
          value={props.contactNumber}
          name="contactNumber"
          disabled
          id="contactNumber"
          required
          autoComplete="no"
          onChange={(e) => props.setContactNumber(e.target.value)}
        />
      </label>
    </React.Fragment>
  );
};

export default SupplierFormInventory;
