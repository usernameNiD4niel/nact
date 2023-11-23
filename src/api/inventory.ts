import {
  InventorySupplierAlter,
  InventorySupplierType,
  InventoryUniqueItems,
  PaginatedInventory,
} from "@/constants/props";

export const isInventoryAdded = async (inventory: InventorySupplierType) => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/inventory/add`,
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

export const getUniqueItems = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/inventory/unique`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const data: InventoryUniqueItems = await response.json();
    return data;
  }
  throw new Error("Unable to retrieve unique items");
};

export async function getColumnSearch<T>(searchQuery: string, column: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/inventory/${column}/${searchQuery}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  )
    .then((response) => response.json())
    .then((d) => {
      const data: T[] = d[`${column}s`];
      return data;
    })
    .catch((error) => {
      console.log("the error: ", error);
      return [] as T[];
    });

  return response;
}

export async function getPaginatedData() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/inventory?page=1&per_page=10`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (response.ok) {
    const data = await response.json();
    console.log(JSON.stringify(data, null, 2));

    return data as PaginatedInventory;
  }

  throw new Error("Cannot get the data...");
}

export async function getSpecificItem(id: string) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/inventory/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot fetch the specified inventory");
  }

  const data = await response.json();
  return data as InventorySupplierType;
}

export async function getSupplierInventory() {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/api/inventory/data`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Cannot fetch all of the avaialble supplier");
  }

  const data = await response.json();
  return data.suppliers as InventorySupplierAlter[];
}
