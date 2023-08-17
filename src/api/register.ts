import { FormDataProps } from "@/constants/props";

export const POST = async ({birthDate, firstName, gender, lastName, middleName, mobileNumber, pin, recoveryAnswer, recoveryQuestion}:FormDataProps): Promise<FormDataProps | boolean> => {
	const apiEndpoint: string = "https://backend-api87.000webhostapp.com/api/register";

	const formData: FormDataProps = {
			lastName,
			firstName,
			middleName,
			gender,
			birthDate,
			mobileNumber,
			pin,
			recoveryQuestion,
			recoveryAnswer
	};

	try {
		const response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		const data:FormDataProps = await response.json();

		return data;
		
	} catch (e: unknown) {
		if (typeof e === "string") {
			console.log(e);
			return false;
		} else if (e instanceof Error) {
			console.log("Error: " + e.message);
			return false;
		} else {
			return false;

		}
	}

};
