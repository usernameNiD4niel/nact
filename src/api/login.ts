import { LoginSuccessResponse } from "@/constants/props";
// import Cookies from "js-cookie";

export const POST = async ({
	phoneNumber,
	pin,
	setIsLoading,
}: {
	phoneNumber: string;
	pin: string;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	const data = {
		mobileNumber: phoneNumber,
		pin,
	};

	try {
		// TODO: add a valid url to the fetch request

		// Cookies.set("token", "hahaha", { expires: 7 / 24 });

		const response = await fetch(
			"https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/login",
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			},
		);

		console.log(data);

		if (response.ok) {
			console.log("Sucessfully created a POST request");
			const data: LoginSuccessResponse = await response.json();

			// TODO: change this if there's no status from the response
			if (data.success) {
				console.log("Redirecting to the dashboard...");
				setIsLoading(false);
				console.log("token", data.access_token);

				return data;
			} else {
				console.error("Error: " + data.message);
				setIsLoading(false);
				return data;
			}
		} else {
			console.log("Successfully failed!", response);
			setIsLoading(false);
		}
	} catch (e: unknown) {
		setIsLoading(false);
		if (typeof e === "string") {
			console.log(e);
		} else if (e instanceof Error) {
			console.log("Error: " + e.message);
		}
	}
};
