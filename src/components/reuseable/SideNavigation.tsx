import { AiOutlineHome, AiOutlineUserSwitch } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { BsShopWindow } from "react-icons/bs";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { IoChevronBack } from "react-icons/io5";

const SideNavigation = () => {
  const [selected] = useSelectedStore((state) => [state.selected]);

  const buttonClass =
    "flex gap-x-3 py-2 mb-2 font-medium mx-3 px-2 text-2xl rounded-md text-white opacity-80 items-center transition-opacity duration-300";
  const activeButtonClass = "bg-[#043b5b] opacity-100 font-semibold";

  return (
    <aside className="w-[100%] bg-primary h-full flex flex-col pt-5 pb-2 z-[100] md:items-center">
      <Link
        to="/"
        className="flex items-center gap-3 px-3 font-medium text-white text-2xl w-full md:hidden"
        id="home-id"
      >
        <IoChevronBack />
        <span className="text-lg md:text-base-300">Menu</span>
      </Link>
      <Link to="/" className="w-14 h-14 rounded-full bg-slate-300">
        <img src={logo} alt="Nact logo" />
      </Link>
      <ul className="mt-10 flex flex-col justify-between h-full w-full">
        <div>
          <li>
            <Link
              to="/"
              className={`${buttonClass} ${
                selected === ButtonList.Home && activeButtonClass
              } hover:bg-[#043b5b] hover:opacity-100 hover:font-semibold`}
            >
              <AiOutlineHome /> <span className="text-sm">Home</span>
            </Link>
          </li>
          <li>
            <Link
              to="/sale"
              className={`${buttonClass} ${
                selected === ButtonList.Sale && activeButtonClass
              } hover:bg-[#043b5b] hover:opacity-100 hover:font-semibold`}
            >
              <BiStore /> <span className="text-sm">Sale</span>
            </Link>
          </li>
          <li>
            <Link
              to="/store"
              className={`${buttonClass} ${
                selected === ButtonList.Store && activeButtonClass
              } hover:bg-[#043b5b] hover:opacity-100 hover:font-semibold`}
            >
              <BsShopWindow /> <span className="text-sm">Store</span>
            </Link>
          </li>
        </div>
        <li>
          <Link
            to="/account"
            className={`${buttonClass} ${buttonClass} ${
              selected === ButtonList.Account && activeButtonClass
            } hover:bg-[#043b5b] hover:opacity-100 hover:font-semibold`}
          >
            <AiOutlineUserSwitch /> <span className="text-sm">Account</span>
          </Link>
        </li>
      </ul>
    </aside>
  );
};

export default SideNavigation;
