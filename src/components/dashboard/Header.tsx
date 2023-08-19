import { Outlet } from "react-router-dom";
import DrawerRight from "@/daisyui/DrawerRight";
import Search from "../reuseable/Search";
import SideNavigation from "../reuseable/SideNavigation";

const Header = () => {
	return (
		<main className="flex container relative flex-col md:flex-row mx-auto my-0">
			<section className="flex w-full flex-col">
				<nav className="flex justify-center items-center gap-y-2 py-4 flex-col fixed left-0 right-0 top-0 bg-primary w-full">
					<div className="flex justify-evenly items-center p-5 lg:p-3 bg-primary text-white container gap-x-5">
						<div className="flex items-center justify-center flex-1">
							<a href="/" className="font-bold">
								NACT
							</a>
						</div>

						<div className="lg:hidden">
							<DrawerRight />
						</div>
					</div>
					<Search />
				</nav>

				<div className="mt-40 lg:mt-36 w-full">
					<Outlet />
					<SideNavigation />
				</div>
			</section>
		</main>
	);
};

export default Header;
