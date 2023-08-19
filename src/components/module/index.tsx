import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const Module = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Module) {
			setSelected(ButtonList.Module);
		}
	}, []);
	return (
		<div className="px-4 w-[95%] lg:w-4/5">
			<h1>Module</h1>
		</div>
	);
};

export default Module;
