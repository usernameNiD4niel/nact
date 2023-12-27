import { LoginSuccessResponse } from "@/constants/props";
import Cookies from "js-cookie";
// import Cookies from "js-cookie";

export const POST = async ({
	phoneNumber,
	pin,
}: {
	phoneNumber: string;
	pin: string;
}) => {
	const data = {
		mobileNumber: phoneNumber,
		pin,
	};

	try {
		const response = await fetch(`${import.meta.env.VITE_BASE_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
			// credentials: "include",
		});

		console.log(data);

		if (response.ok) {
			const data: LoginSuccessResponse = await response.json();

			if (data.success) {
				const expirationDate = new Date();
				expirationDate.setDate(expirationDate.getDate() + 7);

				Cookies.set("access_module", JSON.stringify(data.access_module), {
					expires: expirationDate,
				});
				Cookies.set("csrf_token", data.csrf_access_token, {
					expires: expirationDate,
				});
				Cookies.set("role", data.user.user_type, { expires: expirationDate });
				Cookies.set("user", JSON.stringify(data.user), {
					expires: expirationDate,
				});
				return data;
			} else {
				return data;
			}
		}
	} catch (e: unknown) {
		return {
			success: false,
			access_token_cookie: "",
		};
	}
};
