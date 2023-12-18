import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import { useLocation } from "react-router-dom";
import { getSpecificSupplier } from "@/api/supplier";
import SupplierAddForm from "./helper/supplier-add-form";
import { useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";

export const SupplierTableItem = () => {
  const location = useLocation();

  const arrayEndpoint = location.pathname.split("/");
  const id = arrayEndpoint[arrayEndpoint.length - 1];

  const { data, isLoading } = useQuery({
    queryKey: ["supplier", id],
    queryFn: () => getSpecificSupplier(id),
  });

  return (
    <div className={headerBackClass}>
      <HeaderWithBack text="Inventory Details" />
      {isLoading ? (
        <div className="h-[80vh] w-full flex items-center justify-center">
          Loading please wait...
        </div>
      ) : (
        data && <SupplierAddForm formValues={data} id={id} />
      )}
      <Toaster />
    </div>
  );
};
