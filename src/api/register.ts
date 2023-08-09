import { User } from "../constants/props";

export const POST = async ({
	mobileNumber,
	pin,
	recoveryAnswer,
	recoveryQuestion,
	birthDate,
	firstName,
	gender,
	lastName,
	middleName,
	setResponse,
}: User) => {
	const apiEndpoint: string = "";

	const formData = {
		user: {
			firstName,
			lastName,
			middleName,
			gender,
			birthDate,
			mobileNumber,
			pin,
			recoveryQuestion,
			recoveryAnswer,
		},
	};

	try {
		const response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				"Content-type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		const data = await response.json();
		console.log(data);
		if (setResponse) {
			setResponse(data);
		}
	} catch (e: unknown) {
		if (typeof e === "string") {
			console.log(e);
		} else if (e instanceof Error) {
			console.log("Error: " + e.message);
		}
	}
};
