import DrawerRight from "@/daisyui/DrawerRight";
import React, { useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.svg";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { buttons } from "@/constants/arrays";
import Cookies from "js-cookie";
const Main = () => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
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
			<header className="w-full flex p-4 bg-primary md:hidden text-white">
				<div className="flex items-center justify-center flex-1">
					<Link to="/" className="font-bold">
						{selected ? buttons[parseInt(selected?.toString())] : "NACT"}
					</Link>
				</div>

				<div className="md:hidden z-10">
					<DrawerRight
						isDrawerOpen={isDrawerOpen}
						setIsDrawerOpen={setIsDrawerOpen}
						drawerId="my-drawer-4"
					/>
				</div>
			</header>
			<main className="flex">
				<aside className="w-[30%] lg:w-[20%] bg-primary text-white box-border fixed h-full hidden pt-5 md:flex flex-col items-center">
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
	const buttonClass =
		"flex gap-x-3 py-2 mb-2 mx-3 px-2 text-sm rounded-md items-center transition-opacity duration-300";
	const hoverButtonClass =
		"hover:text-blue-500 hover:font-semibold hover:bg-white";
	return (
		<React.Fragment>
			<Link to="/" className="mx-5">
				<img
					className="mask mask-hexagon bg-white w-14 p-3"
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
									? "text-primary font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Home
						</Link>
					</li>
					<li>
						<Link
							to="/module"
							className={`${buttonClass} ${
								selected === ButtonList.Module
									? "text-primary font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Module
						</Link>
					</li>
					<li>
						<Link
							to="/costumer"
							className={`${buttonClass} ${
								selected === ButtonList.Costumer
									? "text-primary font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Customer
						</Link>
					</li>
					<li>
						<Link
							to="/supplier"
							className={`${buttonClass} flex justify-between items-center group ${
								selected === ButtonList.Supplier
									? "text-primary font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Supplier Management
						</Link>
					</li>
					<li>
						<Link
							to="/sales-agent"
							className={`${buttonClass} ${
								selected === ButtonList.SalesAgent
									? "text-primary font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Sales Agent
						</Link>
					</li>
					<li>
						<Link
							to="/inventory-officer"
							className={`${buttonClass} ${
								selected === ButtonList.InventoryOfficer
									? "text-primary font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Inventory Officer
						</Link>
					</li>
					<li>
						<Link
							to="/inventory"
							className={`${buttonClass} ${
								selected === ButtonList.Inventory
									? "text-primary font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Inventory
						</Link>
					</li>
					<li>
						<Link
							to="/order-generator"
							className={`${buttonClass} ${
								selected === ButtonList.OrderGenerator
									? "text-primary font-semibold bg-slate-50"
									: "text-white font-thin"
							} ${hoverButtonClass}`}>
							Order Generator
						</Link>
					</li>
				</div>
				<li>
					<Link
						to="/account"
						className={`${buttonClass} ${
							selected === ButtonList.Account
								? "text-primary font-semibold bg-slate-50"
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
