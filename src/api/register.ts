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

	const formData = new FormData();
	formData.append("firstName", firstName.toString());
	formData.append("lastName", lastName.toString());
	formData.append("middleName", middleName.toString());
	formData.append("gender", gender.toString());
	formData.append("birthDate", birthDate!.toString());
	formData.append("mobileNumber", mobileNumber.toString());
	formData.append("pin", pin.toString());
	formData.append("recoveryQuestion", recoveryQuestion.toString());
	formData.append("recoveryAnswer", recoveryAnswer.toString());

	const postData = {
		user: formData,
	};

	try {
		// TODO: add a valid url to the fetch request
		const response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(postData),
		});

		const data = await response.json();
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
