import {
	AiOutlineClose,
	AiOutlineHome,
	AiOutlineUserSwitch,
} from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { Link } from "react-router-dom";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";

const SideNavigation = () => {
	const [selected] = useSelectedStore((state) => [state.selected]);

	const buttonClass =
		"flex gap-x-3 py-2 mb-2 font-medium mx-3 px-2 text-2xl rounded-md text-white opacity-80 items-center transition-opacity duration-300";
	const activeButtonClass = "bg-[#043b5b] opacity-100 font-semibold";

	return (
		<aside className="max-w-[370px] w-full fixed top-[8rem] right-0 bottom-0 hidden lg:flex bg-primary flex-col pt-5 pb-2 z-[100] md:items-center">
			{/* <Link to="/" className="mx-5">
				<img
					className="mask mask-hexagon bg-white w-14 p-3"
					src={logo}
					id="home-id"
					alt="NACT logo"
				/>
			</Link> */}
			<ul className="mt-10 flex flex-col justify-between h-full w-full">
				<div>
					<li>
						<Link
							to="/"
							className={`${buttonClass} ${
								selected === ButtonList.Home && activeButtonClass
							} hover:bg-[#043b5b] hover:opacity-100 hover:font-semibold`}>
							<AiOutlineHome /> <span className="text-sm">Home</span>
						</Link>
					</li>
					<li>
						<Link
							to="/module"
							className={`${buttonClass} ${
								selected === ButtonList.Module && activeButtonClass
							} hover:bg-[#043b5b] hover:opacity-100 hover:font-semibold`}>
							<BiStore /> <span className="text-sm">Module</span>
						</Link>
					</li>
				</div>
				<li>
					<Link
						to="/account"
						className={`${buttonClass} ${buttonClass} ${
							selected === ButtonList.Account && activeButtonClass
						} hover:bg-[#043b5b] hover:opacity-100 hover:font-semibold`}>
						<AiOutlineUserSwitch /> <span className="text-sm">Account</span>
					</Link>
				</li>
				<button
					className="absolute rounded-full text-white text-xl font-bold p-2 top-3 md:hidden flex items-center justify-center right-3"
					style={{ background: "rgba(0, 0, 0, .4)" }}>
					<AiOutlineClose />
				</button>
			</ul>
		</aside>
	);
};

export default SideNavigation;
