import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { CustomerType } from "@/constants/objects";
import { headerBackClass } from "@/constants/reusable-class";
import { Link, Outlet } from "react-router-dom";

const AddSupplier = () => {
  return (
    <div className={headerBackClass}>
      <HeaderWithBack text="Add Supplier" route="/supplier" />
      <div className="py-2 px-4">
        <p className="text-sm py-2">Select customer type</p>
        <hr className="mb-5" />
        <ul className="space-y-2 lg:flex lg:space-y-0 lg:gap-x-4">
          {CustomerType.map((value, index) => (
            <li key={index}>
              <Link
                to={`/supplier/add/${value.route}`}
                className="flex flex-col md:p-4 p-2 border-black border-opacity-40 rounded-md border-[1px] hover:bg-primary group hover:border-0 transition-all duration-150 ease-in-out"
              >
                <h3 className="font-bold text-primary group-hover:text-white">
                  {value.title}
                </h3>
                <p className="font-thin text-xs group-hover:text-white">
                  {value.description}
                </p>
                {/* <hr className="mt-2" /> */}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

export default AddSupplier;
