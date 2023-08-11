import React, { useState } from "react";
import { AiOutlineHome, AiOutlineUserSwitch } from "react-icons/ai";
import { BiStore } from "react-icons/bi";
import { BsShopWindow } from "react-icons/bs";

const BottomNavigation = () => {
	const [active, setActive] = useState<number>(1);

	const handleActiveButton = (activeButton: number) => {
		setActive(activeButton);
	};

	return (
		<div className="btm-nav">
			<button
				className={`${active === 1 && "active text-primary"}`}
				onClick={() => handleActiveButton(1)}>
				<AiOutlineHome />
			</button>
			<button
				className={`${active === 2 && "active text-primary"}`}
				onClick={() => handleActiveButton(2)}>
				<BiStore />
			</button>
			<button
				className={`${active === 3 && "active text-primary"}`}
				onClick={() => handleActiveButton(3)}>
				<BsShopWindow />
			</button>
			<button
				className={`${active === 4 && "active text-primary"}`}
				onClick={() => handleActiveButton(4)}>
				<AiOutlineUserSwitch />
			</button>
		</div>
	);
};

export default BottomNavigation;
