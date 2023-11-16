import ContainerInformationForm from "@/components/reuseable/ContainerInformationForm";
import FormDropdown from "@/components/reuseable/FormDropdown";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import SupplierFormInventory from "@/components/reuseable/SupplierFormInventory";
import {
  ContainerInformationProps,
  SuplierFormInventoryProps,
} from "@/constants/props";
import { headerBackClass } from "@/constants/reusable-class";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const InventoryTableItem = () => {
  const location = useLocation();

  // Container Information state fields
  const [containerType, setContainerType] = useState<string>("Container Type");
  const [condition, setCondition] = useState<string>("Condition");
  const [city, setCity] = useState<string>("City");
  const [state, setState] = useState<string>("State");
  const [region, setRegion] = useState<string>("Region");
  const [country, setCountry] = useState<string>("Country");
  const [depot, setDepot] = useState<string>("Depot");
  const [validUntil, setValidUntil] = useState<string>("Valid until");
  const [quantity, setQuantity] = useState<string>("Quantity");
  const [buyingRate, setBuyingRate] = useState<string>("Buying rate");
  const [sellingRate, setSellingRate] = useState<string>("Selling rate");

  // Supplier state fields
  const [supplierName, setSupplierName] = useState<string>("Supplier Name");
  const [businessName, setBusinessName] = useState<string>("Business Name");
  const [completeAddress, setCompleteAddress] =
    useState<string>("Complete Address");
  const [contactNumber, setContactNumber] = useState<string>("Contact Number");

  const [isDisabled, setIsDisabled] = useState(true);

  const data = location.state;
  const arrayEndpoint = location.pathname.split("/");
  const id = arrayEndpoint[arrayEndpoint.length - 1];

  if (!data) {
    return <h1>No data found in the table!</h1>;
  }

  const [containerTypeError, setContainerTypeError] = useState("");

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

  const supplierStateFieldObject: SuplierFormInventoryProps = {
    businessName,
    completeAddress,
    contactNumber,
    setBusinessName,
    setCompleteAddress,
    setContactNumber,
    setSupplierName,
    supplierName,
  };

  const handleOnSubmitForm = () => {
    if (!containerType || containerType === null) {
      setContainerTypeError("Container type is a required field");
      return;
    }
    // ! add a code here
  };

  return (
    <div className={headerBackClass}>
      <div className="flex items-center justify-center flex-col w-full mt-10">
        <HeaderWithBack text="Inventory Details" />
        <form
          className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6"
          onSubmit={handleOnSubmitForm}
        >
          <div className="flex justify-between items-center w-full">
            <h3 className="text-sm font-bold my-3">Container Information</h3>
            {/* <Dropdown setIsDisabled={setIsDisabled} key="InventoryTableItem" /> */}
            <FormDropdown
              setIsDisabled={setIsDisabled}
              key="InventoryFormDropdown"
              endpoint={`api/inventory/${id}`}
            />
          </div>
          <div className="flex flex-col w-full gap-y-4">
            <ContainerInformationForm
              isDisabled={isDisabled}
              containerTypeError={containerTypeError}
              props={containerInformation}
              key="InventoryTableItemFormKey"
            />
          </div>
          <hr className="mb-3 mt-5" />
          <h3 className="text-sm font-bold mb-3">Supplier</h3>
          <div className="flex flex-col w-full gap-y-4">
            <SupplierFormInventory props={supplierStateFieldObject} />
          </div>
        </form>
      </div>
    </div>
  );
};

export default InventoryTableItem;
