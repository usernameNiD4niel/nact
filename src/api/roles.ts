export async function createNewRole(role: string, accessModule: string[]) {
	const response = await fetch(`${process.env.VITE_BASE_URL}/api/users/role`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ role, accessModule }),
	});

	let message = "";
	let success = true;

	if (response.ok) {
		const data = await response.json();
		message = data.message as string;
	} else if (response.status === 422) {
		// Unprocessable Entity - The role already exist in the database
		message = "The role already exists in the database";
		success = false;
	} else {
		message = "Cannot create a new role, please try again";
		success = false;
	}

	return {
		success,
		message,
	};
}
