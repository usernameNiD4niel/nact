import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import { useLocation } from "react-router-dom";
import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import React, { FC, useState } from "react";
import Dropdown from "@/components/reuseable/Dropdown";

type DisplayProps = {
  businessName: string;
  setBusinessName: React.Dispatch<React.SetStateAction<string>>;
  city: string;
  setCity: React.Dispatch<React.SetStateAction<string>>;
  state: string;
  setState: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  companyPhoneNumber: string;
  setCompanyPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  companyEmailWebsite: string;
  setCompanyEmailWebsite: React.Dispatch<React.SetStateAction<string>>;
};

type ContactInformationProps = {
  contactPersonFirstName: string;
  setContactPersonFirstName: React.Dispatch<React.SetStateAction<string>>;
  contactPersonLastName: string;
  setContactPersonLastName: React.Dispatch<React.SetStateAction<string>>;
  contactPersonMI: string;
  setContactPersonMI: React.Dispatch<React.SetStateAction<string>>;
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  contactNumber: string;
  setContactNumber: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

type FormProps = {
  businessInformation: DisplayProps;
  contactInformation: ContactInformationProps;
};

export const SupplierTableItem = () => {
  // Business Information
  const [businessName, setBusinessName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState<string>("");
  const [companyEmailWebsite, setCompanyEmailWebsite] = useState<string>("");

  /*
  contactPersonFirstName: string;
  setContactPersonFirstName: React.Dispatch<React.SetStateAction<string>>;
  contactPersonLastName: string;
  setContactPersonLastName: React.Dispatch<React.SetStateAction<string>>;
  contactPersonMI: string;
  setContactPersonMI: React.Dispatch<React.SetStateAction<string>>;
  jobTitle: string;
  setJobTitle: React.Dispatch<React.SetStateAction<string>>;
  contactNumber: string;
  setContactNumber: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};
  */

  // Contact Information
  const [contactPersonFirstName, setContactPersonFirstName] =
    useState<string>("");
  const [contactPersonLastName, setContactPersonLastName] =
    useState<string>("");
  const [contactPersonMI, setContactPersonMI] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const location = useLocation();

  const data = location.state;

  const businessInformation: DisplayProps = {
    businessName,
    setBusinessName,
    city,
    setCity,
    state,
    companyEmailWebsite,
    setCompanyEmailWebsite,
    companyPhoneNumber,
    setCompanyPhoneNumber,
    country,
    setCountry,
    setState,
  };

  const contactInformation: ContactInformationProps = {
    contactPersonFirstName,
    setContactPersonFirstName,
    contactPersonLastName,
    setContactPersonLastName,
    contactPersonMI,
    setContactPersonMI,
    jobTitle,
    setJobTitle,
    contactNumber,
    setContactNumber,
    email,
    setEmail,
  };

  const fields: FormProps = {
    businessInformation,
    contactInformation,
  };

  if (!data) {
    return <h1>No Data found!</h1>;
  }

  return (
    <div className={headerBackClass}>
      <HeaderWithBack text="Inventory Details" route="/supplier" />

      <DisplayForm {...fields} />
    </div>
  );
};

const DisplayBusinessInformation: FC<DisplayProps> = (props) => {
  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold my-3">Business Information</h3>
        <Dropdown />
      </div>
      <div className="flex flex-col w-full gap-y-4">
        <AnimatedInputs
          type="text"
          inputType="businessName"
          value={props.businessName}
          setValue={props.setBusinessName}
          label="Business Name"
          key="Business Name Key"
        />
        <AnimatedInputs
          type="text"
          inputType="city"
          value={props.city}
          setValue={props.setCity}
          label="City"
          key="City Key"
        />
        <AnimatedInputs
          type="text"
          inputType="state"
          value={props.state}
          setValue={props.setState}
          label="State"
          key="State Key"
        />
        <AnimatedInputs
          type="text"
          inputType="country"
          value={props.country}
          setValue={props.setCountry}
          label="Country"
          key="Country Key"
        />
        <AnimatedInputs
          type="text"
          inputType="companyPhoneNumber"
          value={props.companyPhoneNumber}
          setValue={props.setCompanyPhoneNumber}
          label="Company Phone Number"
          key="Company Phone Number Key"
        />
        <AnimatedInputs
          type="text"
          inputType="companyEmailWebsite"
          value={props.companyEmailWebsite}
          setValue={props.setCompanyEmailWebsite}
          label="Company Email Website"
          key="Company Email Website Key"
        />
      </div>
    </React.Fragment>
  );
};

const DisplayContactInformation: FC<ContactInformationProps> = (props) => {
  return (
    <>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold my-3">Contact Information</h3>
        <Dropdown />
      </div>
      <div className="flex flex-col w-full gap-y-4">
        <AnimatedInputs
          type="text"
          inputType="contactPersonFirstName"
          value={props.contactPersonFirstName}
          setValue={props.setContactPersonFirstName}
          label="Contact Person First Name"
          key="Contact Person First Name Key"
        />
      </div>
    </>
  );
};

const DisplayForm: FC<FormProps> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <form className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6">
        <DisplayBusinessInformation {...props.businessInformation} />
        <DisplayContactInformation {...props.contactInformation} />
        <div className="w-full flex items-center gap-3 mt-5 flex-col md:flex-row-reverse">
          <button
            type="submit"
            className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-primary"
          >
            Submit
          </button>
          <button
            type="reset"
            className="w-full text-center p-3 md:w-fit md:px-9 text-primary"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
