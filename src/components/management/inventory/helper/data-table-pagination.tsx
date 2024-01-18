"use client";
import { Button } from "@/components/ui/button";
import { InventoryData } from "@/constants/props";
import { Table } from "@tanstack/react-table";
import { useEffect, useState } from "react";

const getInitialData = async (
  setNextPageUrl: React.Dispatch<React.SetStateAction<number | null>>,
  setData: React.Dispatch<React.SetStateAction<InventoryData[]>>,
  page: number | null,
  isAvailable: boolean
) => {
  if (page) {
    let url = "";
    if (isAvailable) {
      url = `inventory?page=${page}&per_page=10`;
    } else {
      url = `expire/inventory?page=${page}&per_page=10`;
    }

    const response = await fetch(
      `${import.meta.env.VITE_BASE_URL}/api/${url}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const data = await response.json();
      const inventory: InventoryData[] = (await data).products;

      setNextPageUrl((await data).next_page);
      setData((prev) => [...prev, ...inventory]);
      return;
    }

    throw new Error("cannot get the data");
  }
};

interface DataTablePaginationProps<TData> {
  table: Table<TData>;
  setData: React.Dispatch<React.SetStateAction<InventoryData[]>>;
  next_page_url: number | null;
  isFiltering: boolean;
  isAvailable: boolean;
}

export function DataTablePagination<TData>({
  table,
  next_page_url,
  setData,
  isFiltering,
  isAvailable,
}: DataTablePaginationProps<TData>) {
  const [nextPageUrl, setNextPageUrl] = useState<number | null>(1);

  useEffect(() => {
    if (next_page_url) {
      setNextPageUrl(next_page_url);
    }
  }, [next_page_url]);

  const handleLoadMore = () => {
    getInitialData(setNextPageUrl, setData, nextPageUrl, isAvailable);

    // * Allow the table to append new items
    if (nextPageUrl) {
      table.setPageSize(nextPageUrl * 10);
    }
  };

  return (
    <div className="flex items-center justify-center py-4 w-full">
      <Button
        variant={"custom"}
        onClick={handleLoadMore}
        disabled={!nextPageUrl || isFiltering}
      >
        {nextPageUrl && !isFiltering ? `Load More` : "End of List"}
      </Button>
    </div>
  );
}
