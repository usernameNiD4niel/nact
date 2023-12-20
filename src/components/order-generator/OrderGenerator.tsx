import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import NavigationTab from "../reuseable/NavigationTab";
import Cookies from "js-cookie";

const OrderGenerator = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	const access_module = Cookies.get("access_module");

	useEffect(() => {
		if (selected !== ButtonList.OrderGenerator) {
			setSelected(ButtonList.OrderGenerator);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	return (
		<div className="px-4 w-[95%] lg:w-4/5">
			<NavigationTab
				access_module={access_module}
				selected={ButtonList.OrderGenerator}
				setSelected={setSelected}
				tabName="Order Generator"
				key={"NavigationTabOrderGeneratorKey"}
			/>
			<h1>Order Generator</h1>
		</div>
	);
};

export default OrderGenerator;
