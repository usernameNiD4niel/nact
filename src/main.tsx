import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import Header from "@/components/dashboard/Header.tsx";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Root from "@/components/dashboard/Root.tsx";
import Account from "@/components/accounts/Account.tsx";
import Index from "@/authentication";
import Module from "@/components/module";
import SupplierManagement from "./components/management/supplier/SupplierManagement";
import SalesAgentManagement from "./components/management/sales-agent/SalesAgentManagement";
import CostumerManagement from "./components/management/customer/CustomerManagement";
import InventoryOfficerManagement from "./components/management/inventory-officer/InventoryOfficerManagement";
import AddSupplier from "./components/management/supplier/AddSupplier";
import Shipping from "./components/management/supplier/Shipping";
import Trucking from "./components/management/supplier/Trucking";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<Header />} path="/">
				<Route index element={<Root />} />
				<Route path="module" element={<Module />} />
				<Route path="supplier" element={<SupplierManagement />}>
					<Route path="add" element={<AddSupplier />}>
						<Route path="shipping" element={<Shipping />} />
						<Route path="trucking" element={<Trucking />} />
					</Route>
				</Route>
				<Route path="costumer" element={<CostumerManagement />} />
				<Route path="sales-agent" element={<SalesAgentManagement />} />
				<Route
					path="inventory-officer"
					element={<InventoryOfficerManagement />}
				/>
				<Route path="account" element={<Account />} />
			</Route>
			<Route path="login" element={<Index />} />
		</Route>,
	),
);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
