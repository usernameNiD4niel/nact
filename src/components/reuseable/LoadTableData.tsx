import {
  SupplierManagementCard,
  SupplierManagementProps,
} from "@/constants/props";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadTableData = () => {
  const navigate = useNavigate();
  const [supplierData, setSupplierData] = useState<SupplierManagementCard[]>(
    SupplierManagementProps
  );
  const handleAddingNewForm = (data: SupplierManagementCard) => {
    navigate(`${data.route}`, { state: data });
  };
  return (
    <>
      {supplierData.map((value) => (
        <tr
          key={`SupplierManagementKey${value.route}`}
          className="hover:cursor-pointer hover:text-primary"
          onClick={() => handleAddingNewForm(value)}
        >
          <td className="flex flex-col gap-y-2">
            {value.title} <span className="sm:hidden">{value.subtitle}</span>
          </td>
          <td>
            <span className="hidden sm:block">{value.subtitle}</span>
          </td>
          <td>
            <span className="hidden lg:block"></span>
          </td>
          <td>{value.phoneNumber}</td>
        </tr>
      ))}
    </>
  );
};

export default LoadTableData;
