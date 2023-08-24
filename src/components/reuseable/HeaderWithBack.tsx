import { FC } from "react";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoChevronBack } from "react-icons/io5";
import { Link } from "react-router-dom";

type HeaderWithBackProps = {
	text: string;
	route: string;
};

const HeaderWithBack: FC<HeaderWithBackProps> = ({ text, route }) => {
	return (
		<div className="bg-primary w-full px-2 py-4 flex items-center justify-between">
			<Link to={route} className="text-white flex items-center gap-x-1">
				<p className="text-xl">
					<IoChevronBack />
				</p>
				{text}
			</Link>
			<button className="md:hidden text-white text-2xl">
				<HiOutlineMenuAlt3 />
			</button>
		</div>
	);
};

export default HeaderWithBack;
