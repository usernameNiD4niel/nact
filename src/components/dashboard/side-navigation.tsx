import logo from "@/assets/logo.svg";
import { ButtonList } from "@/constants/enums";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayLink from "./display-link";

interface SideNavigationProps {
	selected: ButtonList | null;
}

export default function SideNavigation({ selected }: SideNavigationProps) {
	const access_module = Cookies.get("access_module");

	const [accessModule, setAccessModule] = useState<string[]>([]);

	useEffect(() => {
		const access_module_ = JSON.parse(access_module!) as string[];
		setAccessModule(access_module_);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const buttonClass =
		"flex gap-x-3 py-2 mb-2 mx-3 px-2 text-sm rounded-md items-center transition-opacity duration-300";
	const hoverButtonClass =
		"hover:text-blue-500 hover:font-semibold hover:bg-white";

	return (
		<>
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
		</>
	);
}
