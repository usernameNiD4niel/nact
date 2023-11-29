import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";

const CustomerAnalytics = () => {
  const [setTab] = useInventoryState((state) => [state.setActiveTab]);

  useEffect(() => setTab(1), []);
  return <div>Analytics</div>;
};

export default CustomerAnalytics;
