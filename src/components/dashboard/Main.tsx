import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { buttons } from "@/constants/arrays";
import Cookies from "js-cookie";
import SheetRight from "../reuseable/SheetRight";
import { Toaster } from "../ui/toaster";
import DisplayLink from "./display-link";
const Main = () => {
	const [selected] = useSelectedStore((state) => [state.selected]);
	const navigate = useNavigate();

	useEffect(() => {
		const token = Cookies.get("token");
		if (!token) {
			navigate("/login");
		}
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
					{/* <DrawerRight
            isDrawerOpen={isDrawerOpen}
            setIsDrawerOpen={setIsDrawerOpen}
            drawerId="my-drawer-4"
          /> */}
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

const SideNavigation = ({ selected }: { selected: ButtonList | null }) => {
	const access_module = Cookies.get("access_module");

	const [accessModule, setAccessModule] = useState<string[]>([]);

	useEffect(() => {
		const access_module_ = JSON.parse(access_module!) as string[];
		setAccessModule(access_module_);
	}, []);

	const buttonClass =
		"flex gap-x-3 py-2 mb-2 mx-3 px-2 text-sm rounded-md items-center transition-opacity duration-300";
	const hoverButtonClass =
		"hover:text-blue-500 hover:font-semibold hover:bg-white";

	return (
		<React.Fragment>
			<Link to="/" className="mx-5">
				<img
					className="rounded-full bg-white w-14 p-3"
					src={logo}
					id="home-id"
					alt="NACT logo"
				/>
			</Link>
			<ul className="mt-10 flex flex-col justify-between h-full w-full">
				<div>
					<li>
						<Link
							to="/"
							className={`${buttonClass} ${
								selected === ButtonList.Home
									? "text-[#017DC3] font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Home
						</Link>
					</li>
					{accessModule.map((access) => (
						<DisplayLink access={access} selected={selected} key={access} />
					))}
				</div>
				<li>
					<Link
						to="/account"
						className={`${buttonClass} ${
							selected === ButtonList.Account
								? "text-[#017DC3] font-semibold bg-slate-50"
								: "text-white font-thin"
						} ${hoverButtonClass}`}>
						Account
					</Link>
				</li>
			</ul>
		</React.Fragment>
	);
};

export default Main;
