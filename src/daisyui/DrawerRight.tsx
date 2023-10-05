import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelectedStore } from "@/utils/HomePageState";
import { ButtonList } from "@/constants/enums";
import { FC } from "react";

type DrawerRightProps = {
  isDrawerOpen: boolean;
  setIsDrawerOpen: React.Dispatch<React.SetStateAction<boolean>>;
  drawerId: string;
};

const DrawerRight: FC<DrawerRightProps> = ({
  isDrawerOpen,
  setIsDrawerOpen,
  drawerId,
}) => {
  const [selected] = useSelectedStore((state) => [state.selected]);

  const buttonClass =
    "flex gap-x-3 py-2 mb-2 font-medium mx-3 px-2 text-md rounded-md items-center transition-opacity duration-300";
  const hoverButtonClass =
    "hover:text-blue-500 hover:font-semibold hover:bg-white";

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div className={`drawer drawer-end ${isDrawerOpen ? "active" : ""}`}>
      <input
        id={drawerId}
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content">
        <label
          htmlFor={drawerId}
          className="cursor-pointer text-2xl text-white"
        >
          {/* <RiMenu2Fill /> */}
          <HiOutlineMenuAlt3 />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor={drawerId} className="drawer-overlay"></label>
        <ul className="menu w-80 h-full text-base-content bg-[#017DC3] flex flex-col justify-between">
          {/* Sidebar content here */}
          <div>
            <li className="my-5">
              <label
                className="drawer-overlay text-white text-lg font-semibold hover:text-[#017DC3] hover:bg-white"
                htmlFor={drawerId}
              >
                <IoChevronBackOutline />
                <span className="text-sm">Menu</span>
              </label>
            </li>
            <li>
              <Link
                to="/"
                className={`${buttonClass} ${
                  selected === ButtonList.Home
                    ? "text-[#017DC3] font-semibold bg-slate-50"
                    : "text-white"
                } ${hoverButtonClass}`}
                onClick={toggleDrawer}
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/module"
                className={`${buttonClass} ${
                  selected === ButtonList.Module
                    ? "text-[#017DC3] font-semibold bg-slate-50"
                    : "text-white"
                } ${hoverButtonClass}`}
                onClick={toggleDrawer}
              >
                Module
              </Link>
            </li>
            <li>
              <Link
                to="/costumer"
                className={`${buttonClass} ${
                  selected === ButtonList.Costumer
                    ? "text-[#017DC3] font-semibold bg-slate-50"
                    : "text-white"
                } ${hoverButtonClass}`}
                onClick={toggleDrawer}
              >
                Customer
              </Link>
            </li>
            <li>
              <Link
                to="/supplier"
                className={`${buttonClass} ${
                  selected === ButtonList.Supplier
                    ? "text-[#017DC3] font-semibold bg-slate-50"
                    : "text-white"
                } ${hoverButtonClass}`}
                onClick={toggleDrawer}
              >
                Supplier Management
              </Link>
            </li>
            <li>
              <Link
                to="/sales-agent"
                className={`${buttonClass} ${
                  selected === ButtonList.SalesAgent
                    ? "text-[#017DC3] font-semibold bg-slate-50"
                    : "text-white"
                } ${hoverButtonClass}`}
                onClick={toggleDrawer}
              >
                Sales Agent
              </Link>
            </li>
            <li>
              <Link
                to="/inventory-officer"
                className={`${buttonClass} ${
                  selected === ButtonList.InventoryOfficer
                    ? "text-[#017DC3] font-semibold bg-slate-50"
                    : "text-white"
                } ${hoverButtonClass}`}
                onClick={toggleDrawer}
              >
                Inventory Officer
              </Link>
            </li>
            <li>
              <Link
                to="/inventory"
                className={`${buttonClass} ${
                  selected === ButtonList.Inventory
                    ? "text-[#017DC3] font-semibold bg-slate-50"
                    : "text-white"
                } ${hoverButtonClass}`}
                onClick={toggleDrawer}
              >
                Inventory
              </Link>
            </li>
            <li>
              <Link
                to="/order-generator"
                className={`${buttonClass} ${
                  selected === ButtonList.OrderGenerator
                    ? "text-[#017DC3] font-semibold bg-slate-50"
                    : "text-white"
                } ${hoverButtonClass}`}
                onClick={toggleDrawer}
              >
                Order Generator
              </Link>
            </li>
          </div>
          <li>
            <Link
              to="/account"
              className={`${buttonClass} ${
                selected === ButtonList.Account
                  ? "text-[#017DC3] font-semibold bg-slate-50"
                  : "text-white"
              } ${hoverButtonClass}`}
              onClick={toggleDrawer}
            >
              Account
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DrawerRight;
