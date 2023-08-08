import { RegisterFormProps } from "../constants/props";

export const POST = async ({
	mobileNumber,
	pin,
	recoveryAnswer,
	recoveryQuestion,
}: RegisterFormProps): Promise<boolean> => {
	const formData = new FormData();
	formData.append("mobileNumber", mobileNumber.toString());
	formData.append("pin", pin.toString());
	formData.append("recoveryQuestion", recoveryQuestion.toString());
	formData.append("recoveryAnswer", recoveryAnswer.toString());

	try {
		// TODO: add a valid url to the fetch request
		const response = await fetch("", {
			method: "POST",
			body: formData,
		});

		if (response.ok) {
			console.log("Sucessfully created a POST request");
			const data = await response.json();

			// TODO: change this if there's no status from the response
			if (data.status === "success") {
				console.log("Redirecting to the dashboard...");
				return true;
			} else {
				console.error("Error: " + data.status);
			}
		} else {
			console.log("Successfully failed!");
		}
	} catch (e: unknown) {
		if (typeof e === "string") {
			console.log(e);
		} else if (e instanceof Error) {
			console.log("Error: " + e.message);
		}
	}
	return false;
};
