import NavigationTab from "@/components/reuseable/NavigationTab";
import Tabs from "@/components/reuseable/Tabs";
import { ButtonList } from "@/constants/enums";
import { useSelectedStore } from "@/utils/HomePageState";
import { useInventoryState } from "@/utils/InventoryState";
import Cookies from "js-cookie";
import { Outlet } from "react-router-dom";

const InventoryManagement = () => {
  const [setSelected] = useSelectedStore((state) => [state.setSelected]);

  const access_module = Cookies.get("access_module");

  const [tab] = useInventoryState((state) => [state.tab]);

  return (
    <section className="w-full flex flex-col items-center justify-center gap-y-4">
      <NavigationTab
        access_module={access_module}
        selected={ButtonList.Inventory}
        tabName="Inventory"
        setSelected={setSelected}
        key={"NavigationTabInventoryManagementKey"}
      />
      <div className="w-full md:w-[70%] lg:w-[80%] z-[5] bg-[#1F2123] px-5 mb-0 pt-6 border-t-[#1F2123] border-t-2 fixed top-14 md:top-0">
        <Tabs
          activeTabIndex={tab}
          arrayOfText={["Available", "Expired"]}
          key="TabsInventoryManagementkey"
          arrayOfRoutes={[
            "/inventory/",
            "/inventory/expired",
            // "/inventory/abcd",
            // "/inventory/new-feature",
          ]}
        />
      </div>

      <Outlet />
    </section>
  );
};

export default InventoryManagement;
