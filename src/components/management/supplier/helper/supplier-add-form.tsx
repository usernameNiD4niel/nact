import { useState } from "react";
import BusinessInformationForm from "./business-information-form";
import { SupplierItem } from "@/constants/props";
import LoadingButton from "@/components/reuseable/LoadingButton";
import ContactInformationForm from "./contact-information-form";

interface SupplierAddFormProps {
  id: string;
  formValues: SupplierItem;
  isLoading: boolean;
}

export default function SupplierAddForm({
  formValues,
  isLoading,
  id,
}: SupplierAddFormProps) {
  const [isDisabled, setIsDisabled] = useState(true);

  const {
    contactInformation,
    supplier: { businessInformation },
  } = formValues;

  return (
    <div className="flex flex-col items-center justify-center mt-10">
      <form className="p-2 flex flex-col gap-y-4 w-full lg:w-[60%] py-10 bg-white px-6">
        <BusinessInformationForm
          businessInformation={businessInformation}
          id={id}
          isDisabled={isDisabled}
          setIsDisabled={setIsDisabled}
        />
        <ContactInformationForm
          contactInformation={contactInformation}
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
              type="reset"
              className="w-full text-center p-3 md:w-fit md:px-9 text-[#017DC3]"
            >
              Reset
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
