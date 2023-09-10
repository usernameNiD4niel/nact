import { FormDataProps, RegisterResponse } from "@/constants/props";

export const POST = async ({
	birthDate,
	firstName,
	gender,
	lastName,
	middleName,
	mobileNumber,
	pin,
	recoveryAnswer,
	recoveryQuestion,
	setError,
}: FormDataProps) => {
	const apiEndpoint: string =
		"https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/register";

	const formData: FormDataProps = {
		lastName,
		firstName,
		middleName,
		gender,
		birthDate,
		mobileNumber,
		pin,
		recoveryQuestion,
		recoveryAnswer,
	};

	try {
		const response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		const data: RegisterResponse = await response.json();

		if (data.message === "User already registered") {
			if (setError) {
				console.log("error set", data);
				setError("Mobile number already registered");
			} else {
				console.log("error not set");
			}
		} else {
			console.log(data.message, "message printed");
			return data;
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.log(e.message);
			setError!(e.message);
		} else {
			setError!("Please enter a valid input");
		}
		console.log(e);
	}
};
