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
	const apiEndpoint: string = "https://jsonplaceholder.typicode.com/posts";

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

	const placeHolder = {
		title: "foo",
		body: "bar",
		userId: 1,
	};

	try {
		// TODO: add a valid url to the fetch request

		const response = await fetch(apiEndpoint, {
			method: "POST",
			headers: {
				"Content-type": "application/json; charset=UTF-8",
			},
			body: JSON.stringify(placeHolder),
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
	fetch("https://jsonplaceholder.typicode.com/posts")
		.then((response) => response.json())
		.then((json) => console.log(json));
};
