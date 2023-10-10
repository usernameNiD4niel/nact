import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import { useLocation } from "react-router-dom";
import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import React, { FC, useEffect, useState } from "react";
import { getSpecificSupplier, updateSpecificSupplier } from "@/api/supplier";
import SuccessModal from "@/components/reuseable/SuccessModal";
import LoadingButton from "@/components/reuseable/LoadingButton";
import { ShippingFormProps } from "@/constants/props";
import FormDropdown from "@/components/reuseable/FormDropdown";

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

type ComponentFormProps = {
  businessInfo: DisplayProps;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  isDisabled: boolean;
};

type ContactFormInfoProps = {
  contactInfo: ContactInformationProps;
  isDisabled: boolean;
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
  isDisabled: boolean;
  setIsDisabled: React.Dispatch<React.SetStateAction<boolean>>;
  businessInformation: DisplayProps;
  contactInformation: ContactInformationProps;
  handleOnClick: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
  handleCleanInputs: () => void;
};

export const SupplierTableItem = () => {
  const location = useLocation();

  const arrayEndpoint = location.pathname.split("/");
  const id = arrayEndpoint[arrayEndpoint.length - 1];

  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");

  // Business Information
  const [businessName, setBusinessName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState<string>("");
  const [companyEmailWebsite, setCompanyEmailWebsite] = useState<string>("");

  // Contact information
  const [contactPersonFirstName, setContactPersonFirstName] =
    useState<string>("");
  const [contactPersonLastName, setContactPersonLastName] =
    useState<string>("");
  const [contactPersonMI, setContactPersonMI] = useState<string>("");
  const [jobTitle, setJobTitle] = useState<string>("");
  const [contactNumber, setContactNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const [validation, setValidation] = useState<string>("");

  const [isDisabled, setIsDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const getSupplier = async () => {
    const data = await getSpecificSupplier(id);

    if (data.message) {
      setMessage(data.message);
      setTitle(
        "Cannot retrieve the data of the selected table supplier item. Please refresh your browser"
      );
      setValidation("error");
      return;
    }
    setValidation("");
    setTitle("");
    setBusinessName(data.supplier.businessInformation.businessName);
    setCity(data.supplier.businessInformation.city);
    setState(data.supplier.businessInformation.state);
    setCountry(data.supplier.businessInformation.country);
    setCompanyPhoneNumber(data.supplier.businessInformation.companyPhoneNumber);
    setCompanyEmailWebsite(
      data.supplier.businessInformation.companyEmailWebsite
    );

    // Check first if the contact information is filled
    if (data.contactInformation && data.contactInformation.length > 0) {
      setContactPersonFirstName(
        data.contactInformation[0].contactPersonFirstName
      );
      setContactPersonLastName(
        data.contactInformation[0].contactPersonLastName
      );
      setContactPersonMI(data.contactInformation[0].contactPersonMI);
      setJobTitle(data.contactInformation[0].jobTitle);
      setContactNumber(data.contactInformation[0].contactNumber);
      setEmail(data.contactInformation[0].email);
    }
  };
  useEffect(() => {
    getSupplier();
  }, []);

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

  const isUpdated = async () => {
    const shipping: ShippingFormProps = {
      businessInformation: {
        businessName,
        city,
        companyEmailWebsite,
        companyPhoneNumber,
        country,
        state,
      },
      contactInformation: [
        {
          contactNumber,
          contactPersonFirstName,
          contactPersonLastName,
          contactPersonMI,
          email,
          jobTitle,
        },
      ],
    };

    await updateSpecificSupplier(
      id,
      shipping,
      setValidation,
      setMessage,
      setTitle
    );
    setIsLoading(false);
  };

  const handleOnClick = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    // Create an update request
    isUpdated();

    // Show modal if success or failure
  };

  const handleCleanInputs = () => {
    setBusinessName("");
    setCity("");
    setState("");
    setCountry("");
    setCompanyPhoneNumber("");
    setCompanyEmailWebsite("");
    setContactPersonFirstName("");
    setContactPersonLastName("");
    setContactPersonMI("");
    setJobTitle("");
    setContactNumber("");
    setEmail("");
  };

  const fields: FormProps = {
    businessInformation,
    contactInformation,
    handleOnClick,
    isDisabled,
    isLoading,
    setIsDisabled,
    handleCleanInputs,
  };

  return (
    <div className={headerBackClass}>
      <HeaderWithBack text="Inventory Details" route="/supplier" />
      <DisplayForm
        businessInformation={fields.businessInformation}
        contactInformation={fields.contactInformation}
        setIsDisabled={setIsDisabled}
        isDisabled={isDisabled}
        handleOnClick={handleOnClick}
        isLoading={isLoading}
        handleCleanInputs={handleCleanInputs}
      />
      {validation && (
        <SuccessModal
          message={message}
          redirectText="Go back to Supplier Table"
          redirectTo="/supplier"
          setValidation={setValidation}
          title={title}
          validation={validation}
          key="SupplierFormDaniel"
        />
      )}
    </div>
  );
};

const DisplayBusinessInformation: FC<ComponentFormProps> = ({
  businessInfo,
  isDisabled,
  setIsDisabled,
}) => {
  const [validation, setValidation] = useState("");
  return (
    <React.Fragment>
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-bold my-3">Business Information</h3>
        {/* <Dropdown setIsDisabled={setIsDisabled} key="SupplierTableItem" /> */}
        <FormDropdown
          setIsDisabled={setIsDisabled}
          key="SupplierFormDropdown"
        />
      </div>
      <div className="flex flex-col w-full gap-y-4">
        <AnimatedInputs
          isDisabled={isDisabled}
          isRequired={true}
          type="text"
          inputType="businessName"
          value={businessInfo.businessName}
          setValue={businessInfo.setBusinessName}
          label="Business Name"
          key="Business Name Key"
        />
        <AnimatedInputs
          isDisabled={isDisabled}
          isRequired={true}
          type="text"
          inputType="city"
          value={businessInfo.city}
          setValue={businessInfo.setCity}
          label="City"
          key="City Key"
        />
        <AnimatedInputs
          isDisabled={isDisabled}
          isRequired={true}
          type="text"
          inputType="state"
          value={businessInfo.state}
          setValue={businessInfo.setState}
          label="State"
          key="State Key"
        />
        <AnimatedInputs
          isDisabled={isDisabled}
          isRequired={true}
          type="text"
          inputType="country"
          value={businessInfo.country}
          setValue={businessInfo.setCountry}
          label="Country"
          key="Country Key"
        />
        <AnimatedInputs
          isDisabled={isDisabled}
          isRequired={true}
          type="text"
          inputType="companyPhoneNumber"
          value={businessInfo.companyPhoneNumber}
          setValue={businessInfo.setCompanyPhoneNumber}
          label="Company Phone Number"
          key="Company Phone Number Key"
        />
        <AnimatedInputs
          isDisabled={isDisabled}
          isRequired={true}
          type="text"
          inputType="companyEmailWebsite"
          value={businessInfo.companyEmailWebsite}
          setValue={businessInfo.setCompanyEmailWebsite}
          label="Company Email Website"
          key="Company Email Website Key"
        />
      </div>
      {/* <SuccessModal
				message="Are you sure you want to delete this supplier item? You cannot undo this action"
				redirectText="Go to Supplier Table"
				redirectTo="/supplier"
				setValidation={setValidation}
				title="Are you sure?"
				validation={validation}
				key="SupplierFormRey"
			/> */}
    </React.Fragment>
  );
};

const DisplayContactInformation: FC<ContactFormInfoProps> = ({
  contactInfo,
  isDisabled,
}) => {
  return (
    <React.Fragment>
      <hr className="mt-10" />
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-bold mt-5">Contact Information</h3>
      </div>
      <AnimatedInputs
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="contactPersonFirstName"
        value={contactInfo.contactPersonFirstName}
        setValue={contactInfo.setContactPersonFirstName}
        label="Contact Person First Name"
        key="ContactPersonFirstKey"
      />
      <AnimatedInputs
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="contactPersonLastName"
        value={contactInfo.contactPersonLastName}
        setValue={contactInfo.setContactPersonLastName}
        label="Contact Person Last Name"
        key="ContactPersonLastKey"
      />
      <AnimatedInputs
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="contactPersonMI"
        value={contactInfo.contactPersonMI}
        setValue={contactInfo.setContactPersonMI}
        label="Contact Person MI Name"
        key="ContactPersonMIKey"
      />
      <AnimatedInputs
        isDisabled={isDisabled}
        isRequired={true}
        type="text"
        inputType="jobTitle"
        value={contactInfo.jobTitle}
        setValue={contactInfo.setJobTitle}
        label="Job Title"
        key="JobTitleKey"
      />
      <AnimatedInputs
        isDisabled={isDisabled}
        isRequired={true}
        type="tel"
        inputType="contactNumber"
        value={contactInfo.contactNumber}
        setValue={contactInfo.setContactNumber}
        label="Contact Number"
        key="ContactNumberKey"
      />
      <AnimatedInputs
        isDisabled={isDisabled}
        isRequired={true}
        type="email"
        inputType="email"
        value={contactInfo.email}
        setValue={contactInfo.setEmail}
        label="Email"
        key="EmailKey"
      />
    </React.Fragment>
  );
};

const DisplayForm: FC<FormProps> = ({
  businessInformation,
  contactInformation,
  isDisabled,
  setIsDisabled,
  handleOnClick,
  isLoading,
  handleCleanInputs,
}) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <form
        className="p-2 flex flex-col gap-y-4 w-full lg:w-[60%] py-10 bg-white px-6"
        onSubmit={handleOnClick}
      >
        <DisplayBusinessInformation
          businessInfo={businessInformation}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
        <DisplayContactInformation
          contactInfo={contactInformation}
          isDisabled={isDisabled}
        />
        {!isDisabled && (
          <div className="w-full flex items-center gap-3 mt-5 flex-col md:flex-row-reverse">
            {isLoading ? (
              <LoadingButton />
            ) : (
              <button
                className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-[#017DC3]"
                // onClick={handleOnClick}
              >
                Submit
              </button>
            )}
            <button
              type="button"
              className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]"
              onClick={handleCleanInputs}
            >
              Reset
            </button>
          </div>
        )}
      </form>
    </div>
  );
};
