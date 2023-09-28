import { ShippingFormProps, SupplierDataProps } from "@/constants/props";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const getSupplierTableData = async () => {
  console.log("token, ", token);

  const response = await fetch(
    `https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/supplier`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    }
  );

  if (response.ok) {
    const data: Promise<SupplierDataProps> = response.json();
    return (await data).suppliers;
  } else {
    throw new Error(response.arrayBuffer.toString());
  }
};

type ResponseAddShipping = {
  message: string;
};

const addShippingSupplier = async (
  shipping: ShippingFormProps,
  setValidation: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  console.log("Shipping ", JSON.stringify(shipping));
  console.log("token supp: ", token);

  const response = await fetch(
    `https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/api/supplier/add/shipping`,
    {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(shipping),
    }
  );

  if (response.ok) {
    const data: Promise<ResponseAddShipping> = await response.json();
    console.log("may supplier ba", data);

    const { message } = await data;
    setMessage(message);
    setValidation("success");
    return true;
  } else {
    const data: Promise<ResponseAddShipping> = await response.json();
    setValidation("error");
    console.log("error hehhe", data);
    const { message } = await data;
    setMessage(message);
    return false;
  }
};

export { getSupplierTableData, addShippingSupplier };
