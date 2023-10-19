import {
  ShippingFormProps,
  SupplierDataProps,
  SupplierItem,
  SupplierTableProps,
} from "@/constants/props";
import Cookies from "js-cookie";

const getSupplierTableData = async (
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
) => {
  console.log("endpoint, get ", import.meta.env.VITE_BASE_URL);

  const response = await fetch(`${import.meta.env.VITE_BASE_URL}/supplier`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + Cookies.get("token")!,
      // token: csrf_token!,
      // "X-CSRF-TOKEN": csrf_token!,
    },
  });

  if (response.ok) {
    const data: Promise<SupplierDataProps> = await response.json();
    console.log("check nga:", (await data).suppliers);

    const extractedData = (await data).suppliers;

    setIsFetching(false);
    return extractedData;
  } else {
    setIsFetching(false);
    throw new Error("error parin talaga");
  }
};

const getPaginatedSupplier = async (
  page: number,
  setIsFetching: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/supplier?page=${page}&per_page=10`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const data: SupplierDataProps = await response.json();
    setIsFetching(false);
    return data;
  }
  setIsFetching(false);
  throw new Error("Cannot get suppliers data from server");
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
    `${import.meta.env.VITE_BASE_URL}/supplier/add/shipping`,
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

const getBusinessNameFilter = async (searchQuery: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/supplier/business/${searchQuery}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const businessName = await response.json();
    const data: SupplierTableProps[] = businessName.suppliers;
    return data;
  }
  throw new Error("Could not find supplier");
};

const getContactFilter = async (searchQuery: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/supplier/contact/${searchQuery}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const businessName = await response.json();
    const data: SupplierTableProps[] = businessName.suppliers;
    return data;
  }
  throw new Error("Could not find contact");
};

const getLocationFilter = async (searchQuery: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/supplier/location/${searchQuery}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const businessName = await response.json();
    const data: SupplierTableProps[] = businessName.suppliers;
    return data;
  }
  throw new Error("Could not find contact");
};

const getSpecificSupplier = async (id: string) => {
  const supplier = await fetch(
    `${import.meta.env.VITE_BASE_URL}/supplier/${id}`,
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

const updateSpecificSupplier = async (
  id: string,
  shipping: ShippingFormProps,
  setValidation: React.Dispatch<React.SetStateAction<string>>,
  setMessage: React.Dispatch<React.SetStateAction<string>>,
  setTitle: React.Dispatch<React.SetStateAction<string>>
) => {
  const response: Promise<ResponseAddShipping> = await fetch(
    `${import.meta.env.VITE_BASE_URL}/supplier/${id}`,
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

const deleteSupplier = async (id: string) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/supplier/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    }
  );

  if (response.ok) {
    const data = await response.json();

    const { message } = await data;
    return message;
  } else {
    const data = await response.json();
    const { message } = await data;
    return message;
  }
};

// ! Gagamitin ito sa dropdown filtering --- magrerequest dito kapag may nagbabago sa selected checkboxes(useEffect)
const filterVastData = async (searchedQueries: string[]) => {
  /**
   * URL: /api/supplier
   * REQUEST: POST
   * {
   * 		searchedQueries: [
   * 			"data 1",
   * 			"data 2",
   * 			"data 3",
   * 			"data 4",
   * 			"data 5",
   * 			...
   * 		]
   * }
   *
   * RESPONSE
   * {
   * 		suppliers: [
   * 			{
   * 				id: ...,
   * 				location: ...,
   * 				businessName: ...,
   * 				companyPhoneNumber: ...,
   * 				city: ...
   * 			},
   * 			...
   * 		]
   * }
   */

  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/supplier`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(searchedQueries),
    }
  );

  if (response.ok) {
    const data = await response.json();
    const suppliers: SupplierTableProps[] = data.suppliers;

    return suppliers;
  }

  throw new Error(
    "Fetching suppliers error, please try to reconnect to your internet or refresh your browser"
  );
};

// ! Ito dapat ang invoke kapag magsesend si user ng search query --- make this reactive and delay
const searchData = async (query: string) => {
  /**
   * URL: /api/supplier/search/dito_nakalagay_yung_sinearch_ni_user
   * REQUEST: GET
   * {
   * 		searchedQuery: ...
   * }
   *
   * RESPONSE
   * {
   * 		suppliers: [
   * 			{
   * 				id: ...,
   * 				location: ...,
   * 				businessName: ...,
   * 				companyPhoneNumber: ...,
   * 				city: ...
   * 			},
   * 			...
   * 		]
   * }
   *
   */
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/supplier/search/${query}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    const suppliers: SupplierTableProps[] = data.suppliers;

    return suppliers;
  }

  throw new Error(
    "Cannot search your data, please check your search query or reset your internet"
  );
};

export {
  getSupplierTableData,
  addShippingSupplier,
  getSpecificSupplier,
  updateSpecificSupplier,
  deleteSupplier,
  getPaginatedSupplier,

  // ! use this function
  getBusinessNameFilter,
  getContactFilter,
  filterVastData,
  searchData,
  getLocationFilter,
};
