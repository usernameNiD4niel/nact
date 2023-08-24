import { FC } from "react";

type TabsProps = {
	arrayOfText: string[];
	activeTabIndex: number;
};

const Tabs: FC<TabsProps> = ({ activeTabIndex, arrayOfText }) => {
	return (
		<div className="w-full flex text-white border-b-2 md:border-b-black md:border-opacity-20 items-center text-sm gap-x-4">
			{arrayOfText.map((item, index) => (
				<button
					className={`flex-1 text-center md:text-base md:flex-none pb-3 md:w-24 ${
						index === activeTabIndex
							? "text-primary border-b-2 border-b-primary font-bold"
							: "text-slate-600 border-0 font-normal"
					}`}>
					{item}
				</button>
			))}
			{/* <button className="flex-1 text-center md:text-base md:flex-none pb-3 md:w-24 border-b-2 border-b-primary text-primary font-bold">
				List
			</button>
			<button className="flex-1 md:flex-none text-center md:text-base pb-3 md:w-24 text-slate-600">
				Analytics
			</button> */}
		</div>
	);
};

export default Tabs;
