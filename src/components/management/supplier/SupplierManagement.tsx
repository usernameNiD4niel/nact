import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Tabs from "@/components/reuseable/Tabs";
import Table from "@/components/Table";
import { IoMdAdd } from "react-icons/io";

const SupplierManagement = () => {
  const [selected, setSelected] = useSelectedStore((state) => [
    state.selected,
    state.setSelected,
  ]);

  useEffect(() => {
    if (selected !== ButtonList.Supplier) {
      setSelected(ButtonList.Supplier);
    }
  }, []);
  return (
    <section className="w-full flex flex-col items-center justify-center gap-y-4">
      <div className="w-full bg-primary mx-5 mb-0 pt-6">
        <Tabs
          activeTabIndex={0}
          arrayOfText={["List", "Analytics"]}
          key="Tabs Supplier Management key"
        />
      </div>
      <div className="md:px-10 w-full space-y-5 px-5 py-6">
        <SearchWithFilter placeHolder="Search Supplier" />
        <Table />
      </div>
      <AddButton />
      <Outlet />
    </section>
  );
};

const AddButton = () => {
  return (
    <Link
      to="/supplier/add"
      className="absolute bottom-4 right-10 hover:opacity-90 flex rounded-full items-center justify-center gap-x-2 w-12 h-12 bg-primary md:w-32 text-white text-2xl"
    >
      <IoMdAdd />
      <span className="hidden md:block text-sm">SUPPLIER</span>
    </Link>
  );
};

export default SupplierManagement;
