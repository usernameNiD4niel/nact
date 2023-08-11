import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ErrorElement from "./ErrorElement.tsx";
import Index from "./authentication/index.tsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		errorElement: <ErrorElement />,
	},
	{
		path: "/authentication",
		element: <Index />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
