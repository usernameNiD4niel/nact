import Avatar from "@/daisyui/Avatar";
import { RiMenu2Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { GrClose } from "react-icons/gr";
import { useState } from "react";
import logo from "../assets/logo.svg";
import {
	AiOutlineClose,
	AiOutlineHome,
	AiOutlineUserSwitch,
} from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { BsShopWindow } from "react-icons/bs";

const Header = () => {
	const [search, setSearch] = useState<string>("");
	const [isOPen, setIsOpen] = useState<boolean>(false);

	const buttonClass =
		"flex gap-x-3 py-2 mb-2 font-medium mx-3 px-2 text-2xl rounded-md text-white opacity-80 items-center transition-opacity duration-300";
	const activeButtonClass = "bg-[#043b5b] opacity-100 font-semibold";

	const handleMenuNav = () => {
		setIsOpen((prev) => !prev);
	};

	const handleOverlayClick = (
		event: React.MouseEvent<HTMLElement, MouseEvent>,
	) => {
		setIsOpen(false);
		console.log(event.target);
	};
	return (
		<header>
			<nav className="w-full flex justify-between px-2 items-center py-3 border-b-[1px] border-b-black border-opacity-20">
				<div className="flex gap-2 w-full">
					<button className="text-2xl opacity-70" onClick={handleMenuNav}>
						<RiMenu2Fill />
					</button>
					<div className="flex justify-center opacity-50 items-center text-2xl"></div>
					<div className="w-[1px] my-2 bg-black opacity-25 h-7 mr-2" />
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
							<button type="reset" className="text-sm">
								<GrClose />
							</button>
						)}
					</form>
				</div>
				<Avatar />
			</nav>
			<section
				className={`absolute top-0 left-0 w-full md:hidden h-full drop-shadow-lg ${
					isOPen ? "block" : "hidden"
				}`}
				onClick={handleOverlayClick}
				style={{ background: "rgba(0, 0, 0, 0.75)" }}>
				<aside className="min-w-[200px] w-[83%] bg-primary h-full flex flex-col pt-5 pb-2">
					<a href="/" className="mx-5">
						<img
							className="mask mask-hexagon bg-white w-14 md:w-24 p-3"
							src={logo}
							alt="NACT logo"
						/>
					</a>
					<ul className="mt-10 flex flex-col justify-between h-full w-full">
						<div>
							<li>
								<a href="#" className={`${buttonClass} ${activeButtonClass}`}>
									<AiOutlineHome /> <span className="text-sm">Home</span>
								</a>
							</li>
							<li>
								<a href="#" className={buttonClass}>
									<BiStore /> <span className="text-sm">Sale</span>
								</a>
							</li>
							<li>
								<a href="#" className={`${buttonClass}`}>
									<BsShopWindow /> <span className="text-sm">Store</span>
								</a>
							</li>
						</div>
						<li>
							<a href="#" className={buttonClass}>
								<AiOutlineUserSwitch /> <span className="text-sm">Account</span>
							</a>
						</li>
						<button
							className="absolute rounded-full text-white text-xl font-bold p-2 top-3 flex items-center justify-center right-3"
							style={{ background: "rgba(0, 0, 0, .4)" }}>
							<AiOutlineClose />
						</button>
					</ul>
				</aside>
			</section>
		</header>
	);
};

export default Header;
