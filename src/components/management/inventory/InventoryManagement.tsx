import AddButton from "@/components/reuseable/AddButton";
import SearchWithFilter from "@/components/reuseable/SearchWithFilter";
import Tabs from "@/components/reuseable/Tabs";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";

const InventoryManagement = () => {
  const [selected, setSelected] = useSelectedStore((state) => [
    state.selected,
    state.setSelected,
  ]);

  useEffect(() => {
    if (selected !== ButtonList.Inventory) {
      setSelected(ButtonList.Inventory);
    }
  }, []);
  return (
    <section className="w-full flex flex-col items-center justify-center gap-y-4">
      <div className="bg-primary w-full  px-5 pt-6">
        <Tabs
          activeTabIndex={3}
          arrayOfText={["Available", "Full List", "Abcd", "New Feature"]}
          key="Tabs Inventory Management key"
        />
      </div>
      <div className="md:px-10 w-full space-y-5 px-5 py-6">
        <SearchWithFilter placeHolder="Search Inventory" />
        <AddButton
          redirectUrl="/"
          textButton="INVENTORY"
          key="Add Button Key Inventory Management"
        />
      </div>
    </section>
  );
};

export default InventoryManagement;
