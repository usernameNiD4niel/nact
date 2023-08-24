import { ButtonList } from "@/constants/enums";
import { SupplierManagementProps } from "@/constants/props";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";

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
    <section className="w-full flex flex-col items-center justify-center px-5 py-6">
      <div className="w-full flex text-white border-b-2 md:border-b-black md:border-opacity-20 items-center text-sm gap-x-4">
        <button className="flex-1 text-center md:text-base md:flex-none pb-3 md:w-24 border-b-2 border-b-primary text-primary font-bold">
          List
        </button>
        <button className="flex-1 md:flex-none text-center md:text-base pb-3 md:w-24 text-slate-600">
          Analytics
        </button>
      </div>
      <div className="fixed bottom-2 right-4 md:bottom-6 drop-shadow-lg">
        <Link
          to="/supplier/add"
          className="flex gap-x-2 w-14 h-14 md:w-auto md:h-auto md:py-3 md:px-6 rounded-full bg-primary items-center justify-center text-white text-sm right-0"
        >
          <span className="text-white text-2xl">
            <IoAdd />
          </span>
          <span className="hidden md:block">SUPPLIER</span>
        </Link>
      </div>
      <CardSupplierManagement />
      <Outlet />
    </section>
  );
};

const CardSupplierManagement = () => {
  return (
    <div className="flex py-2 items-center flex-col w-full gap-y-2">
      {SupplierManagementProps.map((value, index) => (
        <div
          className="flex p-4 md:justify-between w-full md:items-center flex-col md:flex-row border-b-[1px] border-black border-opacity-20 hover:cursor-pointer hover:border-b-2"
          key={index}
        >
          <Link to="#" className="flex gap-y-1 flex-col justify-center">
            <h3 className="font-bold text-sm text-primary">{value.title}</h3>
            <p className="text-xs font-thin">{value.subtitle}</p>
          </Link>
          <p className="font-thin text-xs">{value.phoneNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default SupplierManagement;
