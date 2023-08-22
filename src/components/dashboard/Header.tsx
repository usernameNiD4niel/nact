import { Outlet } from "react-router-dom";
import DrawerRight from "@/daisyui/DrawerRight";
import Search from "../reuseable/Search";
import SideNavigation from "../reuseable/SideNavigation";
import { useState } from "react";

const Header = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
	return (
		<main className="flex relative flex-col">
			<section className="flex w-full flex-col">
				<nav className="flex justify-center items-center gap-y-2 md:hidden py-4 flex-col fixed left-0 right-0 top-0 bg-primary w-full">
					<div className="flex justify-evenly items-center px-5 lg:p-3 bg-primary text-white container gap-x-5">
						<div className="flex items-center justify-center flex-1">
							<a href="/" className="font-bold">
								NACT
							</a>
						</div>

						<div className="md:hidden">
							<DrawerRight
								isDrawerOpen={isDrawerOpen}
								setIsDrawerOpen={setIsDrawerOpen}
							/>
						</div>
					</div>
				</nav>

				<div className="w-full md:w-[65%] lg:w-[62%] xl:w-[73%] flex flex-col mt-16 md:mt-5 md:ml-0">
					<div className="w-full flex flex-col items-center justify-center">
						<Search isDrawerOpen={isDrawerOpen} />
						<SideNavigation />
						<Outlet />
					</div>
				</div>
			</section>
		</main>
	);
};

export default Header;
