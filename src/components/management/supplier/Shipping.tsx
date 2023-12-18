import { addShippingSupplier } from "@/api/supplier";
import DisplayErrorMessage from "@/components/DisplayErrorMessage";
import ComboBox from "@/components/reuseable/ComboBox";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import LoadingButton from "@/components/reuseable/LoadingButton";
import SuccessModal from "@/components/reuseable/SuccessModal";
import { cities, states } from "@/constants/objects";
import { ShippingFormProps } from "@/constants/props";
import {
  animatedInputClass,
  animatedSpanClass,
} from "@/constants/reusable-class";
import React, { FC, useEffect, useRef, useState } from "react";

const Shipping = () => {
  const [validation, setValidation] = useState("");
  const [message, setMessage] = useState("");
  return (
    <>
      <div
        className={`z-10 absolute inset-0 bg-white h-full w-full ${
          validation ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        <HeaderWithBack text="Shipping" />
        <BusinessInformationForm
          validation={validation}
          setValidation={setValidation}
          setMessage={setMessage}
        />
      </div>
      {validation && (
        <SuccessModal
          message={message}
          redirectText="Go back to supplier table"
          redirectTo="/supplier"
          title={`${
            validation === "error"
              ? "Data Failed to Add"
              : "Data Successfully Added"
          }`}
          validation={validation}
          setValidation={setValidation}
        />
      )}
    </>
  );
};

type ShippingProps = {
  validation: string;
  setValidation: React.Dispatch<React.SetStateAction<string>>;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const BusinessInformationForm: FC<ShippingProps> = ({
  validation,
  setValidation,
  setMessage,
}) => {
  const [businessName, setBusinessName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState<string>("");
  const [companyEmailWebsite, setCompanyEmailWebsite] = useState<string>("");

  const [cityError, setCityError] = useState<string>("");
  const [businessNameError, setBusinessNameError] = useState<string>("");
  const [companyEmailWebsiteError, setCompanyEmailWebsiteError] =
    useState<string>("");
  const [companyPhoneNumberError, setCompanyPhoneNumberError] =
    useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Contact Info Fields
  const contactFirstNameRef = useRef<HTMLInputElement>(null);
  const contactLastNameRef = useRef<HTMLInputElement>(null);
  const contactMIRef = useRef<HTMLInputElement>(null);
  const jobTitleRef = useRef<HTMLInputElement>(null);
  const contactNumberRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const businessNameRef = useRef<HTMLInputElement>(null);

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
  }, [state]);

  const handleOnClick = () => {
    if (!businessName) {
      setBusinessNameError("Business name is required");
    } else {
      setBusinessNameError("");
    }
    if (!city) {
      setCityError("City is required");
    } else if (!country || !state) {
      setCityError("Set enter a valid city");
    } else {
      setCityError("");
    }

    if (!companyEmailWebsite) {
      setCompanyEmailWebsiteError("Please enter company email");
    } else {
      setCompanyEmailWebsiteError("");
    }

    if (!companyPhoneNumber) {
      setCompanyPhoneNumberError("Please enter company phone number");
    } else {
      setCompanyPhoneNumberError("");
    }

    if (
      !businessName ||
      !city ||
      !companyEmailWebsite ||
      !companyPhoneNumber ||
      !country
    ) {
      return;
    }

    setIsLoading(true);

    const contactInfos = [
      {
        contactPersonFirstName: contactFirstNameRef.current!.value,
        contactPersonLastName: contactLastNameRef.current!.value,
        contactPersonMI: contactMIRef.current!.value,
        jobTitle: jobTitleRef.current!.value,
        contactNumber: contactNumberRef.current!.value,
        email: emailRef.current!.value,
      },
    ];

    const shipping: ShippingFormProps = {
      businessInformation: {
        businessName,
        city,
        companyEmailWebsite,
        companyPhoneNumber,
        country,
        state,
      },
      contactInformation: contactInfos,
    };

    createNewShipping(shipping);
  };

  const createNewShipping = async (shipping: ShippingFormProps) => {
    const isAddedSuccessfully = await addShippingSupplier(
      shipping,
      setValidation,
      setMessage
    );
    setIsLoading(false);
    if (isAddedSuccessfully) {
      //! Clear the forms and focus the input at the top
      handleClearFields();
    }
  };

  const handleClearFields = () => {
    contactFirstNameRef.current!.value = "";
    contactLastNameRef.current!.value = "";
    contactMIRef.current!.value = "";
    jobTitleRef.current!.value = "";
    contactNumberRef.current!.value = "";
    emailRef.current!.value = "";

    setBusinessName("");
    setCity("");
    setCountry("");
    setState("");
    setCompanyPhoneNumber("");
    setCompanyEmailWebsite("");

    businessNameRef.current?.focus();
  };

  return (
    <div
      className={`flex flex-col items-center justify-center mt-10 ${
        validation ? "overflow-y-hidden" : "overflow-y-auto"
      }`}
    >
      <div className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6">
        <h3 className="text-sm font-bold my-3">Business Information</h3>
        <div className="flex flex-col w-full gap-y-4">
          <label className="relative" htmlFor="businessName">
            <input
              type="text"
              className={`${animatedInputClass} disabled:bg-gray-100`}
              value={businessName}
              name="businessName"
              id="businessName"
              ref={businessNameRef}
              autoFocus={true}
              autoComplete="no"
              onChange={(e) => setBusinessName(e.target.value)}
            />
            <span
              className={`${`${animatedSpanClass} whitespace-nowrap`} ${
                businessName && "input-contains"
              }`}
            >
              Business Name
            </span>
            {businessNameError && (
              <DisplayErrorMessage errorMessage={`${businessNameError}`} />
            )}
          </label>
          <ComboBox
            setInputValue={setCity}
            inputValue={city}
            key={"ShippingComboBox"}
          />
          {cityError && <DisplayErrorMessage errorMessage={cityError} />}
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
          <label className="relative" htmlFor="companyPhoneNumber">
            <input
              type="text"
              className={`${animatedInputClass} disabled:bg-gray-100`}
              value={companyPhoneNumber}
              name="companyPhoneNumber"
              id="companyPhoneNumber"
              autoComplete="no"
              onChange={(e) => setCompanyPhoneNumber(e.target.value)}
            />
            <span
              className={`${`${animatedSpanClass} whitespace-nowrap`} ${
                companyPhoneNumber && "input-contains"
              }`}
            >
              Company Phone Number
            </span>
            {companyPhoneNumberError && (
              <DisplayErrorMessage
                errorMessage={`${companyPhoneNumberError}`}
              />
            )}
          </label>
          <label className="relative" htmlFor="companyEmailWebsite">
            <input
              type="text"
              className={`${animatedInputClass} disabled:bg-gray-100`}
              value={companyEmailWebsite}
              name="companyEmailWebsite"
              id="companyEmailWebsite"
              onChange={(e) => setCompanyEmailWebsite(e.target.value)}
              autoComplete="no"
            />
            <span
              className={`${`${animatedSpanClass} whitespace-nowrap`} ${
                companyEmailWebsite && "input-contains"
              }`}
            >
              Company Email Website
            </span>
            {companyEmailWebsiteError && (
              <DisplayErrorMessage
                errorMessage={`${companyEmailWebsiteError}`}
              />
            )}
          </label>
          <ContactInformation
            contactFirstNameRef={contactFirstNameRef}
            contactLastNameRef={contactLastNameRef}
            contactMIRef={contactMIRef}
            contactNumberRef={contactNumberRef}
            emailRef={emailRef}
            jobTitleRef={jobTitleRef}
          />
        </div>

        <div className="w-full flex items-center gap-3 mt-5 flex-col md:flex-row-reverse">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <button
              className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-[#017DC3]"
              onClick={handleOnClick}
            >
              Submit
            </button>
          )}
          <button className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

type ContactInformationAdds = {
  contactFirstNameRef: React.RefObject<HTMLInputElement>;
  contactLastNameRef: React.RefObject<HTMLInputElement>;
  contactMIRef: React.RefObject<HTMLInputElement>;
  jobTitleRef: React.RefObject<HTMLInputElement>;
  contactNumberRef: React.RefObject<HTMLInputElement>;
  emailRef: React.RefObject<HTMLInputElement>;
};
//when the users

const ContactInformation: FC<ContactInformationAdds> = ({
  contactFirstNameRef,
  contactLastNameRef,
  contactMIRef,
  contactNumberRef,
  emailRef,
  jobTitleRef,
}) => {
  return (
    <React.Fragment>
      <hr className="mt-10" />
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold mt-5">Contact Information</h3>
      </div>
      <DisplayInput
        label="Contact Person First Name"
        type="text"
        inputRef={contactFirstNameRef}
      />
      <DisplayInput
        label="Contact Person Last Name"
        type="text"
        inputRef={contactLastNameRef}
      />

      <DisplayInput
        type="text"
        inputRef={contactMIRef}
        label="Contact Person MI Name"
      />
      <DisplayInput type="text" inputRef={jobTitleRef} label="Job Title" />
      <DisplayInput
        type="text"
        inputRef={contactNumberRef}
        label="Contact Number"
      />
      <DisplayInput type="text" label="Email" inputRef={emailRef} />
    </React.Fragment>
  );
};

type DisplayInputProps = {
  type: string;
  label: string;
  inputRef: React.RefObject<HTMLInputElement>;
};

const DisplayInput: FC<DisplayInputProps> = ({ type, label, inputRef }) => {
  const [value, setValue] = useState<string>("");
  return (
    <label className="relative">
      <input
        type={type}
        className={`${animatedInputClass} disabled:bg-gray-100`}
        autoComplete="no"
        ref={inputRef}
        onChange={(e) => setValue(e.target.value)}
        required
      />
      <span
        className={`${`${animatedSpanClass} whitespace-nowrap`} ${
          value && "input-contains"
        }`}
      >
        {label}
      </span>
    </label>
  );
};

export default Shipping;
