import { isInventoryAdded } from "@/api/inventory";
import ContainerInformationForm from "@/components/reuseable/ContainerInformationForm";
import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import LoadingButton from "@/components/reuseable/LoadingButton";
import SupplierFormInventory from "@/components/reuseable/SupplierFormInventory";
import {
  InventoryProps,
  InventorySupplierType,
  SupplierInventory,
} from "@/constants/props";
import { headerBackClass } from "@/constants/reusable-class";
import { useState } from "react";
import AlertDialog from "./helper/alert-dialog";
import { useMutation } from "@tanstack/react-query";

const AddInventory = () => {
  const [isLoadingButton, setIsLoadingButton] = useState(false);

  const [businessName, setBusinessName] = useState("");
  const [completeAddress, setCompleteAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const initialInventory: InventoryProps = {
    buyingRate: "",
    city: "",
    condition: "",
    containerType: "",
    country: "",
    depot: "",
    quantity: "",
    region: "",
    sellingRate: "",
    state: "",
    validUntil: "",
  };

  const mutation = useMutation({
    mutationKey: ["inventory", "add"],
    mutationFn: isInventoryAdded,
    onSuccess: () => {
      setIsLoadingButton(false);
    },
    onError: () => {
      setIsLoadingButton(false);
    },
  });

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    setIsLoadingButton(true);

    const inventory: InventoryProps = {
      buyingRate: formData.get("buyingRate")?.toString()!,
      city: formData.get("city")?.toString()!,
      condition: formData.get("condition")?.toString()!,
      containerType: formData.get("containerType")?.toString()!,
      country: formData.get("country")?.toString()!,
      depot: formData.get("depot")?.toString()!,
      quantity: formData.get("quantity")?.toString()!,
      region: formData.get("region")?.toString()!,
      sellingRate: formData.get("sellingRate")?.toString()!,
      state: formData.get("state")?.toString()!,
      validUntil: formData.get("validUntil")?.toString()!,
    };

    const supplier: SupplierInventory = {
      businessName,
      completeAddress,
      contactNumber,
    };

    console.log(`the supplier ::: ${JSON.stringify(supplier, null, 2)}`);

    const request: InventorySupplierType = {
      containerInformation: inventory,
      supplier,
    };

    mutation.mutate(request);

    console.log(`the inventory data ::: ${JSON.stringify(request, null, 2)}`);
  };

  return (
    <div className={headerBackClass}>
      <div className="flex items-center justify-center flex-col w-full mt-10">
        <HeaderWithBack text="Add Inventory" />
        <form
          className="p-2 flex flex-col gap-y-2 w-full lg:w-[60%] py-10 bg-white px-6"
          onSubmit={handleFormSubmit}
        >
          <h3 className="text-sm font-bold my-3">Container Information</h3>
          <div className="flex flex-col w-full gap-y-4">
            <ContainerInformationForm
              isDisabled={false}
              containerInfo={initialInventory}
              key="AddInventoryFormKey"
            />
          </div>
          <hr className="mt-7 mb-2" />
          <h3 className="text-sm font-bold my-3">Supplier</h3>
          <div className="flex flex-col w-full gap-y-4">
            <SupplierFormInventory
              businessName={businessName}
              setBusinessName={setBusinessName}
              completeAddress={completeAddress}
              setCompleteAddress={setCompleteAddress}
              contactNumber={contactNumber}
              setContactNumber={setContactNumber}
            />
          </div>
          <div className="w-full flex flex-col md:flex-row-reverse items-center gap-3 mt-5">
            {isLoadingButton ? (
              <LoadingButton />
            ) : (
              <button
                type="submit"
                className="w-full text-center p-3 md:w-fit md:px-9 text-white rounded-md bg-[#017DC3]"
              >
                Submit
              </button>
            )}
            <button
              type="reset"
              className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]"
            >
              Reset
            </button>
          </div>
        </form>
      </div>
      {mutation.isError ? (
        <AlertDialog error={mutation.error as unknown as string} />
      ) : (
        mutation.isSuccess && <AlertDialog error={""} />
      )}
    </div>
  );
};

export default AddInventory;
