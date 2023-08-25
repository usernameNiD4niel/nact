import { FC } from "react";

type TabsProps = {
	arrayOfText: string[];
	activeTabIndex: number;
};

const Tabs: FC<TabsProps> = ({ activeTabIndex, arrayOfText }) => {
	return (
		<div className="w-full flex text-white md:border-opacity-20 items-center text-sm gap-x-6">
			{arrayOfText.map((item, index) => (
				<button
					className={`flex-1 text-center md:text-base md:flex-none pb-3 ${
						index === activeTabIndex
							? "text-white border-b-2 border-b-primary font-bold"
							: "text-slate-300 border-0 font-normal"
					}`}
					key={index}>
					{item}
				</button>
			))}
		</div>
	);
};

export default Tabs;
