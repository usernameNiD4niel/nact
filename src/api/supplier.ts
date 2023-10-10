import {
  Payment,
  ShippingFormProps,
  SupplierDataProps,
  SupplierItem,
} from "@/constants/props";

const getSupplierTableData = async (
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
) => {
  // console.log("token, ", token);

  const response = await fetch(
    `https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/supplier`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
        // token: csrf_token!,
        // "X-CSRF-TOKEN": csrf_token!,
      },
    }
  );

  if (response.ok) {
    const data: Promise<SupplierDataProps> = await response.json();
    console.log("check nga:", (await data).suppliers);

    const extractedData = (await data).suppliers;

    const newData: Payment[] = extractedData.map((value) => {
      const d_: Payment = {
        abcde: "",
        contact: value.companyPhoneNumber,
        location: value.state + ", " + value.country,
        supplier: value.businessName,
        id: value.id,
      };
      return d_;
    });
    setIsFetching(false);
    return newData;
  } else {
    setIsFetching(false);
    throw new Error("error parin talaga");
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
  const response = await fetch(
    `https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/supplier/add/shipping`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer " + token,
      },
      body: JSON.stringify(shipping),
    }
  );

  if (response.ok) {
    const data: Promise<ResponseAddShipping> = await response.json();

    const { message } = await data;
    setMessage(message);
    setValidation("success");
    return true;
  } else {
    const data: Promise<ResponseAddShipping> = await response.json();
    setValidation("error");
    const { message } = await data;
    setMessage(message);
    return false;
  }
};

// No Token for this request
const getSpecificSupplier = async (id: string) => {
  const supplier = await fetch(
    `https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/supplier/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    }
  );

  if (supplier.ok) {
    const response: SupplierItem = await supplier.json();
    return response;
  } else {
    throw new Error("Could not find supplier");
  }
};

// No Token for this request
const updateSpecificSupplier = async (
  id: string,
  shipping: ShippingFormProps,
  setValidation: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setTitle: React.Dispatch<React.SetStateAction<string>>
) => {
  const response: Promise<ResponseAddShipping> = await fetch(
    `https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/supplier/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(shipping),
    }
  )
    .then((data) => data.json())
    .then((data) => {
      setMessage("Successfully updated the inventory details");
      setValidation("success");
      setTitle("Update Success");
      console.log(`Success: ${data}`);
      return data;
    })
    .catch((error) => {
      setTitle("Failed to update");
      setValidation("error");
      setMessage(`Error: ${error}`);
      console.log(`error: ${error}`);
    });

  return response;
};

// No Token for this request
const deleteSupplier = async (
  id: string,
  setValidation: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>
) => {
  const response = await fetch(
    `https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/supplier/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = (Promise<ResponseAddShipping> = await response.json());

    const { message } = await data;
    setMessage(message);
    setValidation("success");
    return true;
  } else {
    const data: Promise<ResponseAddShipping> = await response.json();
    setValidation("error");
    const { message } = await data;
    setMessage(message);
    return false;
  }
};

export {
  getSupplierTableData,
  addShippingSupplier,
  getSpecificSupplier,
  updateSpecificSupplier,
  deleteSupplier,
};
