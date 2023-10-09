import { Link } from "react-router-dom";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { IoChevronBackOutline } from "react-icons/io5";
import { useSelectedStore } from "@/utils/HomePageState";
import { ButtonList } from "@/constants/enums";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Button } from "../ui/button";

const SheetRight = () => {
  const [selected] = useSelectedStore((state) => [state.selected]);
  const publiClassDrawer = "text-white p-2 text-base flex items-center gap-2";

  const buttonClass =
    "flex gap-x-3 py-2 mb-2 font-medium mx-3 px-2 text-md rounded-md items-center transition-opacity duration-300 w-full";
  const hoverButtonClass =
    "hover:text-blue-500 hover:font-semibold hover:bg-white";

  const SheetCloseComp = ({
    text,
    buttonList,
    to,
  }: {
    text: string;
    buttonList: ButtonList;
    to: string;
  }) => {
    return (
      <SheetClose asChild className="w-full flex flex-col">
        <Link
          to={to}
          className={`${buttonClass} ${
            selected === buttonList
              ? "text-[#017DC3] font-semibold bg-slate-50"
              : "text-white"
          } ${hoverButtonClass}`}
        >
          <span className="w-full text-start">{text}</span>
        </Link>
      </SheetClose>
    );
  };

  return (
    <div className="grid grid-cols-2 gap-2 h-full">
      <Sheet key="right">
        <SheetTrigger asChild>
          <Button
            className="md:hidden text-white text-2xl w-fit"
            variant={"ghost"}
          >
            <HiOutlineMenuAlt3 />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="right"
          className="bg-[#017DC3] overflow-y-auto h-full"
        >
          <SheetHeader className="h-full">
            <SheetTitle className="flex items-center justify-center relative">
              <SheetClose
                asChild
                className="w-full bg-[#017DC3] flex hover:bg-white hover:text-[#017DC3] z-20 rounded-md hover:cursor-pointer"
              >
                <p className={publiClassDrawer}>
                  <span className="text-xl">
                    <IoChevronBackOutline />
                  </span>
                  Menu
                </p>
              </SheetClose>
              <p className="bg-[#017DC3] z-10 w-6 h-6 absolute -right-3 -top-3"></p>
            </SheetTitle>
            <SheetDescription className="flex w-full flex-col items-center justify-between h-full py-2">
              <p className="flex w-full flex-col items-center h-full">
                <SheetCloseComp
                  text="Home"
                  buttonList={ButtonList.Home}
                  to="/"
                />
                <SheetCloseComp
                  text="Module"
                  to="/module"
                  buttonList={ButtonList.Module}
                />
                <SheetCloseComp
                  text="Costumer"
                  to="/costumer"
                  buttonList={ButtonList.Costumer}
                />
                <SheetCloseComp
                  text="Supplier Management"
                  to="/supplier"
                  buttonList={ButtonList.Supplier}
                />
                <SheetCloseComp
                  text="Sales Agent"
                  to="/sales-agent"
                  buttonList={ButtonList.SalesAgent}
                />
                <SheetCloseComp
                  text="Inventory Officer"
                  to="/inventory-officer"
                  buttonList={ButtonList.InventoryOfficer}
                />
                <SheetCloseComp
                  text="Inventory"
                  to="/inventory"
                  buttonList={ButtonList.Inventory}
                />
                <SheetCloseComp
                  text="Order Generator"
                  to="/order-generator"
                  buttonList={ButtonList.OrderGenerator}
                />
              </p>

              <SheetCloseComp
                text="Account"
                to="/account"
                buttonList={ButtonList.Account}
              />
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default SheetRight;
