import React from "react";
import ReactDOM from "react-dom/client";
import "@/index.css";
import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from "react-router-dom";
import Root from "@/components/dashboard/Root.tsx";
import Account from "@/components/accounts/Account.tsx";
import Index from "@/authentication";
import SupplierManagement from "@/components/management/supplier/SupplierManagement";
import SalesAgentManagement from "@/components/management/sales-agent/SalesAgentManagement";
import CustumerManagement from "@/components/management/customer/CustomerManagement";
import InventoryOfficerManagement from "@/components/management/inventory-officer/InventoryOfficerManagement";
import AddSupplier from "@/components/management/supplier/AddSupplier";
import Shipping from "@/components/management/supplier/Shipping";
import Trucking from "@/components/management/supplier/Trucking";
import Main from "@/components/dashboard/Main";
import InventoryManagement from "@/components/management/inventory/InventoryManagement";
import AddInventory from "@/components/management/inventory/AddInventory";
import Analytics from "@/components/management/supplier/Analytics";
import List from "./components/management/supplier/List";
import Available from "./components/management/inventory/Available";
import FullList from "./components/management/inventory/FullList";
import Abcd from "./components/management/supplier/Abcd";
import NewFeatures from "./components/management/inventory/NewFeatures";
import OrderGenerator from "./components/order-generator/OrderGenerator";
import { SupplierTableItem } from "./components/management/supplier/SupplierTableItem";
import InventoryTableItem from "./components/management/inventory/InventoryTableItem";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import RoleManagement from "./components/management/role-management/RoleManagement";
import Users from "./components/management/role-management/users/Users";
import RoleAccess from "./components/management/role-management/role-access/RoleAccess";
import UserManagement from "./components/management/role-management/users/user-management/UserManagement";
import CustomerList from "./components/management/customer/CustomerList";
import CustomerAnalytics from "./components/management/customer/CustomerAnalytics";
import CustomerAdd from "./components/management/customer/helper/CustomerAdd";
import CustomerShipping from "./components/management/customer/CustomerShipping";
import CustomerTrucking from "./components/management/customer/CustomerTrucking";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<Main />} path="/">
				<Route index element={<Root />} />
				<Route path="role-management" element={<RoleManagement />}>
					<Route index element={<Users />} />
					<Route path="role-access" element={<RoleAccess />} />
				</Route>
				<Route path="user-management">
					<Route path=":user" element={<UserManagement />} />
				</Route>
				<Route path="supplier" element={<SupplierManagement />}>
					<Route index element={<List />} />
					<Route path="analytics" element={<Analytics />} />
					<Route path="add" element={<AddSupplier />}>
						<Route path="shipping" element={<Shipping />} />
						<Route path="trucking" element={<Trucking />} />
					</Route>
					<Route path=":route" element={<SupplierTableItem />} />
				</Route>
				<Route path="customer" element={<CustumerManagement />}>
					<Route index element={<CustomerList />} />
					<Route path="analytics" element={<CustomerAnalytics />} />
					<Route path="add" element={<CustomerAdd />}>
						<Route path="shipping" element={<CustomerShipping />} />
						<Route path="trucking" element={<CustomerTrucking />} />
					</Route>
				</Route>
				<Route path="sales-agent" element={<SalesAgentManagement />} />
				<Route
					path="inventory-officer"
					element={<InventoryOfficerManagement />}
				/>
				<Route path="inventory" element={<InventoryManagement />}>
					<Route index element={<Available />} />
					<Route path="full-list" element={<FullList />} />
					<Route path="new-feature" element={<NewFeatures />} />
					<Route path="abcd" element={<Abcd />} />
					<Route path="add" element={<AddInventory />} />
					<Route path=":id" element={<InventoryTableItem />} />
				</Route>
				<Route path="account" element={<Account />} />
				<Route path="order-generator" element={<OrderGenerator />} />
			</Route>
			<Route path="login" element={<Index />} />
		</Route>,
	),
);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	</React.StrictMode>,
);
