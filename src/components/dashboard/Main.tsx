import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useSelectedStore } from "@/utils/HomePageState";
import { buttons } from "@/constants/arrays";
import SheetRight from "../reuseable/SheetRight";
import { Toaster } from "../ui/toaster";
import SideNavigation from "./side-navigation";
import Cookies from "js-cookie";
const Main = () => {
	const [selected] = useSelectedStore((state) => [state.selected]);

	const router = useNavigate();
	const access_module = Cookies.get("access_module");

	useEffect(() => {
		if (!access_module) {
			Cookies.remove("token");
			Cookies.remove("role");
			Cookies.remove("user");
			Cookies.remove("csrf_token");
			Cookies.remove("access_module");
			router("/login");
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<React.Fragment>
			<Toaster />
			<header className="w-full flex px-4 py-2 bg-[#017DC3] md:hidden text-white fixed z-10 top-0">
				<div className="flex items-center justify-center flex-1">
					<Link to="/" className="font-bold">
						{selected ? buttons[parseInt(selected?.toString())] : "NACT"}
					</Link>
				</div>

				<div className="md:hidden w-[50px] flex items-center justify-center h-full">
					<SheetRight />
				</div>
			</header>
			<main className="flex">
				<aside className="w-[30%] lg:w-[20%] bg-[#017DC3] text-white box-border fixed h-full hidden pt-5 md:flex flex-col items-center">
					<SideNavigation selected={selected} />
				</aside>
				<section className="md:w-[70%] md:ml-[30%] lg:w-[80%] lg:ml-[20%] md:box-border w-full ml-0">
					<Outlet />
				</section>
			</main>
		</React.Fragment>
	);
};

export default Main;
