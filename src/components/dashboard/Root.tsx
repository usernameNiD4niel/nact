import { ButtonList } from "@/constants/enums";
import { cardData } from "@/constants/props";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import "@/../styles/cards.css";

const Root = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Home) {
			setSelected(ButtonList.Home);
		}
	}, []);

	return (
		<main className="p-4 lg:w-[80%] xl:w-[85%] mx-auto space-y-4">
			<h1>Key Metrics</h1>
			<div className="flex flex-wrap w-full gap-y-2 sm:gap-5 ">
				{cardData.map((data, index) => (
					<div
						className={`rounded-md flex flex-col w-full sm:w-[45%] md:w-[47%] lg:w-60 p-5 card${index} hover:opacity-70 transition-opacity duration-150 delay-75 hover:cursor-pointer`}
						key={index}>
						<h3 className="font-bold text-lg text-white">{data.transaction}</h3>
						<p className="text-white text-sm">{data.description}</p>
					</div>
				))}
			</div>
		</main>
	);
};

export default Root;
