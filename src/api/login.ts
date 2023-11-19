import { LoginSuccessResponse } from "@/constants/props";
import Cookies from "js-cookie";
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
				// credentials: "include",
			},
		);

		console.log(data);

		if (response.ok) {
			console.log("Sucessfully created a POST request");
			const data: LoginSuccessResponse = await response.json();

			if (data.success) {
				const expirationDate = new Date();
				expirationDate.setDate(expirationDate.getDate() + 7);
				setIsLoading(false);
				Cookies.set("csrf_token", data.csrf_access_token, {
					expires: expirationDate,
				});
				Cookies.set("role", data.user.user_type, { expires: expirationDate });
				Cookies.set("user", JSON.stringify(data.user), {
					expires: expirationDate,
				});
				return data;
			} else {
				setIsLoading(false);
				return data;
			}
		} else {
			setIsLoading(false);
		}
	} catch (e: unknown) {
		setIsLoading(false);
	}
};
