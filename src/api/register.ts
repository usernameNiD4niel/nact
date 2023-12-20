import { FormDataProps, RegisterResponse } from "@/constants/props";

function transformDateFormat(dateString: string): string {
	// Parse the input date string in "year-month-day" format
	const dateParts = dateString.split("-");
	if (dateParts.length !== 3) {
		// Handle invalid input
		return "Invalid Date";
	}

	//   2000-25-10 -> 2000-10-25
	const year = parseInt(dateParts[0], 10);
	const month = parseInt(dateParts[2], 10);
	const day = parseInt(dateParts[1], 10);

	// Create a new Date object with the parsed parts
	const date = new Date(year, month - 1, day); // Months are 0-based, so subtract 1 from the month

	// Format the date in "month-day-year" format
	const formattedDate = `${
		date.getMonth() + 1
	}-${date.getDate()}-${date.getFullYear()}`;

	return formattedDate;
}

export const POST = async ({
	birthDate,
	firstName,
	gender,
	lastName,
	middleName,
	mobileNumber,
	pin,
	setError,
}: FormDataProps) => {
	const apiEndpoint: string = `${import.meta.env.VITE_BASE_URL}/register`;

	const newBirthDate = transformDateFormat(birthDate);
	const formData: FormDataProps = {
		lastName,
		firstName,
		middleName,
		gender,
		birthDate: newBirthDate,
		mobileNumber,
		pin,
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
				setError(data.message);
			}
		} else {
			if (setError) {
				setError("");
			}
			return data;
		}
	} catch (e: unknown) {
		if (e instanceof Error) {
			console.log(e.message);
			setError!(e.message);
		} else {
			setError!("Please enter a valid input");
		}
	}
};
