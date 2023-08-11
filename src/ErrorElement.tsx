import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import logo from "./assets/logo.svg";

const DisplayErrorMessage = ({ error }: { error: string }) => {
	return (
		<div className="w-full h-screen flex flex-col items-center justify-center gap-3">
			<a href="/">
				<img src={logo} alt="Logo of NACT" className="w-12 md:w-28" />
			</a>
			<h1 className="font-bold text-4xl text-black">Oops!</h1>
			<p className="text-2xl">Sorry, an unexpected error has occurred.</p>
			<p className="text-lg font-semibold">
				<i>{error}</i>
			</p>
		</div>
	);
};

const ErrorElement = () => {
	const error = useRouteError();

	let errorElement = null;

	if (isRouteErrorResponse(error)) {
		errorElement = (
			<DisplayErrorMessage error={`${error.status} ${error.error?.message}`} />
		);
	}

	return errorElement;
};

export default ErrorElement;
