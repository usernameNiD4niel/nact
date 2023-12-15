import ComboBox from "@/components/reuseable/ComboBox";
import FormDropdown from "@/components/reuseable/FormDropdown";
import { cities, states } from "@/constants/objects";
import { BusinessInformation } from "@/constants/props";
import { animatedInputClass } from "@/constants/reusable-class";
import React, { useEffect, useState } from "react";

interface BusinessInformationFormProps {
  isDisabled: boolean;
  id: string;
  businessInformation: BusinessInformation;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function BusinessInformationForm({
  businessInformation,
  id,
  isDisabled,
  setIsDisabled,
}: BusinessInformationFormProps) {
  const {
    businessName,
    city: city_,
    companyEmailWebsite,
    companyPhoneNumber,
    country: country_,
    state: state_,
  } = businessInformation;

  const [city, setCity] = useState(city_);
  const [state, setState] = useState(state_);
  const [country, setCountry] = useState(country_);

  useEffect(() => {
    for (const state_ in cities) {
      // @ts-expect-error - This should not happen
      // eslint-disable-next-line no-prototype-builtins
      if (cities.hasOwnProperty(state_) && cities[state_].includes(city)) {
        setState(state_);
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
        return;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);

  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold my-3">Business Information</h3>
        {/* <Dropdown setIsDisabled={setIsDisabled} key="SupplierTableItem" /> */}
        <FormDropdown
          setIsDisabled={setIsDisabled}
          key="SupplierFormDropdown"
          modalLabel="This action cannot be undone. This will permanently delete this supplier item and remove this data from our server."
          navigateTo="supplier"
          endpoint={`/supplier/${id}`}
        />
      </div>
      <div className="flex flex-col w-full gap-y-4">
        <label className="relative">
          <input
            type="text"
            className={`${animatedInputClass} disabled:bg-gray-100`}
            name="businessName"
            disabled={isDisabled}
            defaultValue={businessName}
          />
        </label>
        <ComboBox
          setInputValue={setCity}
          inputValue={city}
          isDisabled={isDisabled}
          key={"City Key"}
        />

        <label className="relative">
          <input
            type="text"
            className={`${animatedInputClass} disabled:bg-gray-100`}
            value={state}
            name="state"
            disabled
            onChange={(e) => setState(e.target.value)}
          />
        </label>
        <label className="relative">
          <input
            type="text"
            className={`${animatedInputClass} disabled:bg-gray-100`}
            value={country}
            name="country"
            disabled
            onChange={(e) => setCountry(e.target.value)}
          />
        </label>
        <label className="relative">
          <input
            type="text"
            className={`${animatedInputClass} disabled:bg-gray-100`}
            name="companyPhoneNumber"
            defaultValue={companyPhoneNumber}
            disabled={isDisabled}
          />
        </label>
        <label className="relative">
          <input
            type="text"
            className={`${animatedInputClass} disabled:bg-gray-100`}
            name="companyEmailWebsite"
            defaultValue={companyEmailWebsite}
            disabled={isDisabled}
          />
        </label>
      </div>
    </React.Fragment>
  );
}
