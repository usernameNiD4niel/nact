import {
	DeleteUsersType,
	RoleManagementAccounts,
	RoleManagementUser,
	UpdateUsersRoleType,
	UsersType,
} from "@/constants/props";

const getUserBaseOnRole = async (role: string) => {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/users?role=${role.toLowerCase()}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		const users: UsersType[] = data.users;
		if (users && users.length > 0) {
			return users;
		}
		return [];
	}

	return [];
};

// ! For updating the selected users in the module tabs
const updateUsersRole = async (usersRole: UpdateUsersRoleType) => {
	let role = "";
	if (usersRole.role === "Billing and Collection") {
		role = "billing_collection";
	} else {
		role = usersRole.role.toLowerCase().split(" ").join("_");
	}

	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/user?role=${role}`,
		{
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ mobileNumbers: usersRole.usersPN }),
		},
	);

	const data = await response.json();

	if (response.status === 200) {
		return { message: data.message, success: true } as {
			message: string;
			success: boolean;
		};
	}

	return { message: data.message, success: false } as {
		message: string;
		success: boolean;
	};
};

// ! For Module tabs, when the user select a card the user can delete 1 or more user
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

// ! For Role Management item for displaying it to the table
async function getAllUsers() {
	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/users`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.status === 200) {
		const data = await response.json();
		console.log(`the data is: ${JSON.stringify(data, null, 2)}`);

		return data.users as RoleManagementAccounts[];
	}

	return [] as RoleManagementAccounts[];
}

// ! For Role Management item when the users clicks specific user
async function getSpecificUser(id: string) {
	const response = await fetch(
		`${import.meta.env.VITE_BASE_URL}/api/accounts/${id}`,
		{
			headers: {
				"Content-Type": "application/json",
			},
		},
	);

	if (response.ok) {
		const data = await response.json();
		return data as RoleManagementUser;
	}

	throw new Error("Cannot fetch the specified user");
}

// ! For displaying to Module tabs and Role Management item dropdown "Role"
async function getRoles() {
	const response = await fetch(`${import.meta.env.VITE_BASE_URL}/api/roles`, {
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (response.status === 200) {
		const data = await response.json();
		return data.roles as string[];
	}

	return [];
}

export {
	getUserBaseOnRole,
	updateUsersRole,
	deleteUsers,
	getAllUsers,
	getSpecificUser,
	getRoles,
};
