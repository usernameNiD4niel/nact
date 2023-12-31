import { AccessModule } from "@/constants/props";

export async function createNewRole(postData: AccessModule) {
	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/roles`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(postData),
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

export async function getSpecificAccessModule(role: string) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/roles/${role}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();

		return data.access_module as string[];
	}

	return [];
}

export async function updateAccessModule(
	role: string,
	accessModules: string[],
) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/roles/${role}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ access_module: accessModules }),
		},
	);

	if (response.ok) {
		const data = await response.json();
		return { success: true, message: data.message as string };
	}

	console.log(response);
	return {
		success: false,
		message: "Cannot update the selected access module, please try again",
	};
}

export async function getRoles() {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/access_role`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data.roles as string[];
	}

	return [];
}

export default async function updateRole(
	role: string,
	updateData: { role: string },
) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/role/${role}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updateData),
		},
	);

	if (response.ok) {
		const data = await response.json();
		return {
			success: true,
			message: data.message as string,
		};
	}

	if (response.status === 404) {
		const data = await response.json();
		return {
			success: false,
			message: data.message as string,
		};
	}

	return {
		success: false,
		message: "Cannot update the role, please try again",
	};
}

export async function deleteRole(role: string) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/roles/${role}`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return {
			success: true,
			message: data.message as string,
		};
	}

	console.log("src > api > roles.ts > deleteRole");

	return {
		success: false,
		message: "Cannot delete the selected role, please try again",
	};
}
