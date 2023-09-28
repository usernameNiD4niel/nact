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
import React, { FC, useEffect, useState } from "react";
import { IoIosAddCircle, IoMdRemoveCircle } from "react-icons/io";

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
        <HeaderWithBack text="Shipping" route="/supplier/add" />
        <BusinessInformationForm
          validation={validation}
          setValidation={setValidation}
          setMessage={setMessage}
        />
      </div>
      {validation && (
        <SuccessModal
          message={message}
          redirectText="Go back to dashboard"
          redirectTo="/supplier/add/shipping"
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

type ContactInfoFields = {
  contactPersonFirstName: string;
  contactPersonLastName: string;
  contactPersonMI: string;
  jobTitle: string;
  contactNumber: string;
  email: string;
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

  const [contactInformation, setContactInformation] = useState<number[]>([0]);

  const [cityError, setCityError] = useState<string>("");
  const [businessNameError, setBusinessNameError] = useState<string>("");
  const [companyEmailWebsiteError, setCompanyEmailWebsiteError] =
    useState<string>("");
  const [companyPhoneNumberError, setCompanyPhoneNumberError] =
    useState<string>("");

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [contactInformationObject, setContactInformatiionObject] = useState<
    ContactInfoFields[]
  >([]);

  const handleRemoveContactInformation = (index: number) => {
    const newContact = contactInformation.filter((_, i) => i !== index);
    setContactInformation(newContact);
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

    const shipping: ShippingFormProps = {
      businessInformation: {
        businessName,
        city,
        companyEmailWebsite,
        companyPhoneNumber,
        country,
        state,
      },
      contactInformation: contactInformationObject,
    };
    console.log("top shipping: " + JSON.stringify(shipping));
    console.log(
      "contact information object: " + JSON.stringify(contactInformationObject)
    );

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
    }
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
          <ComboBox setInputValue={setCity} inputValue={city} />
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
          {contactInformation.map((value, index) => (
            <ContactInformation
              handleRemoveContact={handleRemoveContactInformation}
              index={index}
              setContactInformation={setContactInformation}
              setContactInformatiionObject={setContactInformatiionObject}
              key={value}
            />
          ))}
        </div>

        <div className="w-full flex items-center gap-3 mt-5 flex-col md:flex-row-reverse">
          {isLoading ? (
            <LoadingButton />
          ) : (
            <button
              className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-primary"
              onClick={handleOnClick}
            >
              Submit
            </button>
          )}
          <button className="w-full text-center p-3 md:w-fit md:px-9 text-primary">
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

type ContactInformationAdds = {
  handleRemoveContact: (index: number) => void;
  setContactInformation: React.Dispatch<React.SetStateAction<number[]>>;
  index: number;
  setContactInformatiionObject: React.Dispatch<
    React.SetStateAction<ContactInfoFields[]>
  >;
};

const ContactInformation: FC<ContactInformationAdds> = ({
  handleRemoveContact,
  setContactInformatiionObject,
  setContactInformation,
  index,
}) => {
  const [contactPersonFirstName, setContactPersonFirstName] =
    useState<string>("");
  const [contactPersonLastName, setContactPersonLastName] =
    useState<string>("");
  const [contactPersonMI, setContactPersonMI] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const handleOnChangeEvent = (
    event: React.ChangeEvent<HTMLInputElement>,
    setState: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setState(event.target.value);
    const newObject: ContactInfoFields = {
      contactPersonFirstName,
      contactPersonLastName,
      contactPersonMI,
      email,
      jobTitle,
      contactNumber,
    };
    setContactInformatiionObject([newObject]);
  };

  return (
    <React.Fragment>
      <hr className="mt-10" />
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold mt-5">Contact Information</h3>
        {index !== 0 && (
          <button
            type="button"
            onClick={() => handleRemoveContact(index)}
            className="flex items-center text-red-600 uppercase gap-x-2 text-sm"
          >
            <IoMdRemoveCircle /> Remove
          </button>
        )}
      </div>
      <DisplayInput
        label="Contact Person First Name"
        type="text"
        value={contactPersonFirstName}
        setValue={setContactPersonFirstName}
        onChangeTrigger={handleOnChangeEvent}
      />
      <DisplayInput
        label="Contact Person Last Name"
        type="text"
        value={contactPersonLastName}
        setValue={setContactPersonLastName}
        onChangeTrigger={handleOnChangeEvent}
      />

      <DisplayInput
        type="text"
        onChangeTrigger={handleOnChangeEvent}
        value={contactPersonMI}
        setValue={setContactPersonMI}
        label="Contact Person MI Name"
      />
      <DisplayInput
        type="text"
        onChangeTrigger={handleOnChangeEvent}
        value={jobTitle}
        label="Job Title"
        setValue={setJobTitle}
      />
      <DisplayInput
        type="text"
        onChangeTrigger={handleOnChangeEvent}
        value={contactNumber}
        setValue={setContactNumber}
        label="Contact Number"
      />
      <DisplayInput
        type="text"
        onChangeTrigger={handleOnChangeEvent}
        value={email}
        setValue={setEmail}
        label="Email"
      />

      <div className="flex w-full justify-end items-center">
        <button
          type="button"
          onClick={() => {
            setContactInformation((prev) => [...prev, prev.length]);
          }}
          className="text-primary pb-2 flex gap-x-2 items-center text-sm"
        >
          <IoIosAddCircle />
          ADD OTHER CONTACT PERSON
        </button>
      </div>
    </React.Fragment>
  );
};

type DisplayInputProps = {
  type: string;
  value: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  onChangeTrigger: (
    event: React.ChangeEvent<HTMLInputElement>,
    setValue: React.Dispatch<React.SetStateAction<string>>
  ) => void;
};

const DisplayInput: FC<DisplayInputProps> = ({
  type,
  value,
  setValue,
  label,
  onChangeTrigger,
}) => {
  return (
    <label className="relative">
      <input
        type={type}
        className={`${animatedInputClass} disabled:bg-gray-100`}
        autoComplete="no"
        onChange={(event) => onChangeTrigger(event, setValue)}
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
