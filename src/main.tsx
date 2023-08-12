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
import Store from "@/components/store/Store.tsx";
import Account from "@/components/accounts/Account.tsx";
import Index from "@/authentication";

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route>
			<Route element={<Header />} path="/">
				<Route element={<Root />} />
				<Route path="store" element={<Store />} />
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
