import { IoIosSearch } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import DrawerRight from "@/daisyui/DrawerRight";

const Header = () => {
  const [search, setSearch] = useState<string>("");
  const [isShowInput, setIsShowInput] = useState<boolean>(
    window.innerWidth >= 768
  );

  const handleSerchIconClick = () => {
    if (window.innerWidth < 768) {
      setIsShowInput(!isShowInput);
    }
  };

  return (
    <main className="flex container relative flex-col md:flex-row mx-auto my-0">
      <section className="flex w-full flex-col">
        <nav className="flex justify-center items-center fixed left-0 right-0 top-0 bg-primary">
          <div className="flex justify-between items-center p-5 md:p-3 bg-primary text-white container gap-x-5 w-full">
            <div className="flex items-center justify-center">
              <a href="/" className="font-bold">
                HELLO
              </a>
            </div>
            <form className="text-lg flex items-center relative w-full justify-end md:justify-center max-w-lg flex-1">
              <span
                className="text-2xl md:text-black md:absolute left-2 top-3 md:opacity-50"
                onClick={handleSerchIconClick}
              >
                <IoIosSearch />
              </span>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search..."
                className={`input w-full text-sm focus:outline-none focus:border-0 hidden md:block pl-10 text-black`}
              />
              {search && (
                <button
                  type="reset"
                  onClick={() => setSearch("")}
                  className="text-sm md:absolute right-2 top-4"
                >
                  <GrClose />
                </button>
              )}
            </form>
            <div>
              <DrawerRight />
            </div>
          </div>
        </nav>

        <div className="mt-20">
          <Outlet />
        </div>
      </section>
    </main>
  );
};

export default Header;
