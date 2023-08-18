import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoChevronBackOutline } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useSelectedStore } from "@/utils/HomePageState";
import { ButtonList } from "@/constants/enums";
import { useState } from "react";

const DrawerRight = () => {
  const [selected] = useSelectedStore((state) => [state.selected]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const buttonClass =
    "flex gap-x-3 py-2 mb-2 font-medium mx-3 px-2 text-md rounded-md text-white items-center transition-opacity duration-300";
  const activeButtonClass = "text-blue-500 font-semibold bg-slate-50";
  const hoverButtonClass =
    "hover:text-blue-500 hover:font-semibold hover:bg-white";

  const toggleDrawer = () => {
    setIsDrawerOpen((prev) => !prev);
  };

  return (
    <div
      className={`drawer drawer-end z-[110] ${isDrawerOpen ? "active" : ""}`}
    >
      <input
        id="my-drawer-4"
        type="checkbox"
        className="drawer-toggle"
        checked={isDrawerOpen}
        onChange={toggleDrawer}
      />
      <div className="drawer-content">
        <label htmlFor="my-drawer-4" className="cursor-pointer text-2xl">
          {/* <RiMenu2Fill /> */}
          <HiOutlineMenuAlt3 />
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-4" className="drawer-overlay"></label>
        <ul className="menu w-80 h-full text-base-content bg-primary">
          {/* Sidebar content here */}
          <li className="my-5">
            <label
              className="drawer-overlay text-white text-lg font-semibold"
              htmlFor="my-drawer-4"
            >
              <IoChevronBackOutline />
              <span className="text-sm">Menu</span>
            </label>
          </li>
          <li>
            <Link
              to="/"
              className={`${buttonClass} ${
                selected === ButtonList.Home && activeButtonClass
              } ${hoverButtonClass}`}
              onClick={toggleDrawer}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/sale"
              className={`${buttonClass} ${
                selected === ButtonList.Store && activeButtonClass
              } ${hoverButtonClass}`}
              onClick={toggleDrawer}
            >
              Sales
            </Link>
          </li>
          <li>
            <Link
              to="/account"
              className={`${buttonClass} ${
                selected === ButtonList.Account && activeButtonClass
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
