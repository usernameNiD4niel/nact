import Avatar from "@/daisyui/Avatar";
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import SideNavigation from "../reuseable/SideNavigation";

const Header = () => {
	const [search, setSearch] = useState<string>("");
	const [isOPen, setIsOpen] = useState<boolean>(false);

	const handleMenuNav = () => {
		setIsOpen((prev) => !prev);
	};

	const handleSideNav = (event: React.MouseEvent<HTMLElement | MouseEvent>) => {
		setIsOpen(false);
		console.log(event);
	};

	return (
		<main className="flex w-full relative flex-col md:flex-row">
			<section
				className={`fixed top-0 left-0 bottom-0 z-50 drop-shadow-lg w-full md:w-96 ${
					isOPen ? "block" : "hidden"
				} md:block`}
				onClick={handleSideNav}>
				<SideNavigation />
			</section>
			<section className="flex w-full flex-col md:ml-[17rem] lg:ml-[19rem]">
				<nav className="w-full flex justify-between px-2 items-center md:items-start py-3 border-b-[1px] border-b-black border-opacity-20">
					<div className="flex gap-2 w-full">
						<button
							className="text-2xl opacity-70 md:hidden"
							onClick={handleMenuNav}>
							<RiMenu2Fill />
						</button>
						<div className="flex justify-center opacity-50 items-center text-2xl"></div>
						<div className="w-[1px] my-2 bg-black opacity-25 h-7 mr-2 md:hidden" />
						<form className="text-lg flex items-center relative w-full mr-4 justify-center">
							<span className="text-2xl opacity-50">
								<IoIosSearch />
							</span>
							<input
								type="text"
								value={search}
								onChange={(e) => setSearch(e.target.value)}
								placeholder="Search..."
								className="input w-full min-w-[200px] text-sm focus:outline-none focus:border-0"
							/>
							{search && (
								<button
									type="reset"
									onClick={() => setSearch("")}
									className="text-sm">
									<GrClose />
								</button>
							)}
						</form>
					</div>
					<div className="mt-2">
						<Avatar
							width={"w-9"}
							height={"h-9"}
							alt="Logo image"
							key="Header avatar"
						/>
					</div>
				</nav>

				<Outlet />
			</section>
		</main>
	);
};

export default Header;
