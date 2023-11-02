import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import AssignRoleCard from "../helper/assign-role-card";
import DemoteRole from "../helper/demote-role";
import { getUserBaseOnRole } from "@/api/account";
import { UsersType } from "@/constants/props";

const SupplyChain = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	const [selectedCards, setSelectedCards] = useState<string[]>([]);

	const [users, setUsers] = useState<UsersType[]>([]);

	const [isFetching, setIsFetching] = useState(true);

	const fetchUsers = async () => {
		const _users = await getUserBaseOnRole("supply_chain");
		setUsers(_users);
		setIsFetching(false);
	};

	useEffect(() => {
		setTab(1);
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
					{!users || users.length === 0 ? (
						<div className="w-full h-[80vh] flex items-center justify-center">
							<p>No supply chain user found!</p>
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
				</>
			)}

			{selectedCards.length > 0 && <DemoteRole />}
		</div>
	);
};

export default SupplyChain;
