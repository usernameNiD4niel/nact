import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import { useLocation } from "react-router-dom";
import { BiPencil } from "react-icons/bi";
import { BsTrash } from "react-icons/bs";
import AnimatedInputs from "@/components/reuseable/AnimatedInputs";
import { FC, useState } from "react";
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

export const SupplierTableItem = () => {
  const [businessName, setBusinessName] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [companyPhoneNumber, setCompanyPhoneNumber] = useState<string>("");
  const [companyEmailWebsite, setCompanyEmailWebsite] = useState<string>("");

  const location = useLocation();

  const data = location.state;

  const supplierFields: DisplayProps = {
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

  if (!data) {
    return <h1>No Data found!</h1>;
  }

  return (
    <div className={headerBackClass}>
      <HeaderWithBack text="Inventory Details" route="/supplier" />

      <DisplayForm {...supplierFields} />
    </div>
  );
};

const DisplayForm: FC<DisplayProps> = (props) => {
  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <form className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6">
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
