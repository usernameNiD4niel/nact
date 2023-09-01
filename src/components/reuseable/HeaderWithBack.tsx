import { FC, useState } from "react";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";
import React from "react";
import DrawerRight from "@/daisyui/DrawerRight";

type HeaderWithBackProps = {
	text: string;
	route: string;
};

const HeaderWithBack: FC<HeaderWithBackProps> = ({ text, route }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

	return (
		<React.Fragment>
			<div className="bg-[#1F2123] fixed top-0 right-0 w-full md:w-[70%] lg:w-[80%] px-2 py-4 z-10 flex items-center justify-between">
				<Link to={route} className="text-white flex items-center gap-x-1">
					<p className="text-xl">
						<IoChevronBack />
					</p>
					{text}
				</Link>
				<div>
					<DrawerRight
						drawerId="my-drawer-5"
						isDrawerOpen={isDrawerOpen}
						setIsDrawerOpen={setIsDrawerOpen}
					/>
				</div>
			</div>
		</React.Fragment>
	);
};

export default HeaderWithBack;
