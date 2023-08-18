import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const Sale = () => {
  const [selected, setSelected] = useSelectedStore((state) => [
    state.selected,
    state.setSelected,
  ]);

  useEffect(() => {
    if (selected !== ButtonList.Sale) {
      setSelected(ButtonList.Sale);
    }
  }, []);
  return <h1></h1>;
};

export default Sale;
