import { DeleteUsersType, UpdateUsersRoleType } from "@/constants/props";

const getCurrentAccount = async (userPN: string) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/accounts/${userPN}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data;
	}

	throw new Error("Error fetching account information from server");
};

const getUserBaseOnRole = async (role: string) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/accounts?role=${role}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data;
	}

	throw new Error("Error fetching role information from server");
};

const updateUsersRole = async (usersRole: UpdateUsersRoleType) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/accounts`,
		{
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(usersRole),
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data;
	}

	throw new Error("Cant update the users role information from server");
};

const deleteUsers = async (users: DeleteUsersType) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/accounts`,
		{
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(users),
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data;
	}

	throw new Error("Cant delete the users role information from server");
};

export { getCurrentAccount, getUserBaseOnRole, updateUsersRole, deleteUsers };
