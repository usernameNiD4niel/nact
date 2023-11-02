import { useEffect, useState } from "react";
import AssignRoleCard from "../helper/assign-role-card";
import AddRole from "../helper/add-role";
import { useInventoryState } from "@/utils/InventoryState";
import { UsersType } from "@/constants/props";
import { getUserBaseOnRole } from "@/api/account";

const AssignRole = () => {
	const [selectedCards, setSelectedCards] = useState<string[]>([]);

	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	const [users, setUsers] = useState<UsersType[]>([]);

	const [isFetching, setIsFetching] = useState(true);

	const fetchUsers = async () => {
		const _users = await getUserBaseOnRole("unset");
		setUsers(_users);
		setIsFetching(false);
	};

	useEffect(() => {
		setTab(0);
		fetchUsers();
	}, []);

	return (
		<div className="flex flex-wrap gap-2 px-5 w-full pb-5">
			{isFetching ? (
				<div className="w-full h-[80vh] flex items-center justify-center">
					<p>Loading...</p>
				</div>
			) : (
				<>
					{users.map((user) => (
						<AssignRoleCard
							birthday={user.birthDate}
							contact={user.mobileNumber}
							fullName={`${user.firstName} ${user.middleName} ${user.lastName}`}
							gender={user.gender}
							selectedCards={selectedCards}
							setSelectedCards={setSelectedCards}
							key={user.id}
						/>
					))}
				</>
			)}

			{selectedCards.length > 0 && <AddRole />}
		</div>
	);
};

export default AssignRole;
