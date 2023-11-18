import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const OrderGenerator = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.OrderGenerator) {
			setSelected(ButtonList.OrderGenerator);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="px-4 w-[95%] lg:w-4/5">
			<h1>Order Generator</h1>
		</div>
	);
};

export default OrderGenerator;
