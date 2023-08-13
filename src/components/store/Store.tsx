import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const Store = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Store) {
			setSelected(ButtonList.Store);
		}
	}, []);

	return <div className="text-3xl font-bold text-black">Store</div>;
};

export default Store;
