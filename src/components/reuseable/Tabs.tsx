import { FC } from "react";
import { Link } from "react-router-dom";

type TabsProps = {
	arrayOfText: string[];
	activeTabIndex: number;
	arrayOfRoutes: string[];
};

const Tabs: FC<TabsProps> = ({
	activeTabIndex,
	arrayOfText,
	arrayOfRoutes,
}) => {
	return (
		<div className="w-full flex text-white md:border-opacity-20 items-center text-sm gap-x-6">
			{arrayOfText.map((item, index) => (
				<>
					<Link
						to={arrayOfRoutes[index]}
						className={`flex-1 text-center md:text-base md:flex-none pb-3 ${
							index === activeTabIndex
								? "text-white border-b-2 border-b-white font-bold"
								: "text-slate-300 border-0 font-normal"
						}`}
						key={index}>
						{item}
					</Link>
				</>
			))}
		</div>
	);
};

export default Tabs;
