import { InventoryProps, SupplierTableProps } from "@/constants/props";

// ! Store the endpoints to env file
export const isInventoryAdded = async (inventory: InventoryProps) => {
  const response = await fetch(
    "https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/inventory/add",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventory),
    }
  );

  if (response.ok) {
    return response.json();
  } else {
    return new Error("Please enter a valid input");
  }
};

// ? Fetch the data and display it to the table
export const getTableData = async () => {
  const response = await fetch("", {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data: Promise<SupplierTableProps> = response.json();
    return data;
  } else {
    return new Error("Please enter a valid input");
  }
};

// ? this method is for search functionality
export const getSearchData = async (query: string) => {
  const response = await fetch(`api/supplier/${query}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (response.ok) {
    const data: Promise<SupplierTableProps> = response.json();
    return data;
  } else {
    return new Error("Please enter a valid input");
  }
};

// ! Plan to search implementation
// pass the query
// create a GET request this endpoint - api/supplier/{query}

// ! to the backend
// fetch the query params
// query to the database if that "query" exist to the "supplier" column store it to a variable
// query to "location" column and get all the data that contains the "query"
// and do it to the other column that you want to search by the user
