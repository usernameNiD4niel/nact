import { Link } from "react-router-dom";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import logo from "@/assets/logo.svg";

const SideNavigation = () => {
	const [selected] = useSelectedStore((state) => [state.selected]);

	const buttonClass =
		"flex gap-x-3 py-2 mb-2 mx-3 px-2 text-sm rounded-md items-center transition-opacity duration-300";
	const hoverButtonClass =
		"hover:text-blue-500 hover:font-semibold hover:bg-white";

	return (
		<aside className="max-w-[370px] w-full fixed top-0 md:w-[30%] lg:w-full right-0 bottom-0 drop-shadow-md hidden md:flex bg-primary flex-col pt-5 pb-2 z-[100] md:items-center">
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
							className={`${buttonClass} ${
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
		</aside>
	);
};

export default SideNavigation;
