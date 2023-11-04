import { FC } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import SheetRight from "./SheetRight";

type HeaderWithBackProps = {
	text: string;
};

const HeaderWithBack: FC<HeaderWithBackProps> = ({ text }) => {
	const router = useNavigate();

	return (
		<React.Fragment>
			<div className="bg-[#1F2123] fixed top-0 right-0 w-full md:w-[70%] lg:w-[80%] px-2 py-3 z-10 flex items-center justify-between">
				<button
					className="text-white flex items-center gap-x-1"
					type="button"
					onClick={() => router(-1)}>
					<p className="text-xl">
						<HiOutlineChevronLeft />
					</p>
					{text}
				</button>
				{/* <Link to={route} className="text-white flex items-center gap-x-1">
					<p className="text-xl">
						<HiOutlineChevronLeft />
					</p>
					{text}
				</Link> */}
				<div className="w-[50px] h-[40px]">
					<SheetRight />
				</div>
			</div>
		</React.Fragment>
	);
};

export default HeaderWithBack;
