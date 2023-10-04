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
		<div className="w-full flex text-white md:border-opacity-20 items-center text-sm gap-x-0 md:gap-x-6">
			{arrayOfText.map((item, index) => (
				<>
					<Link
						key={item}
						to={arrayOfRoutes[index]}
						className={`flex-1 text-center text-xs sm:text-sm md:text-base px-5 md:flex-none pb-3 ${
							index === activeTabIndex
								? "text-primary border-b-4 border-b-primary font-bold"
								: "text-slate-300 border-0 font-normal"
						}`}>
						{item}
					</Link>
				</>
			))}
		</div>
	);
};

export default Tabs;
