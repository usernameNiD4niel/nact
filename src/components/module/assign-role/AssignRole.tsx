import { useEffect, useState } from "react";
import AssignRoleCard from "../helper/assign-role-card";
import AddRole from "../helper/add-role";
import { useInventoryState } from "@/utils/InventoryState";

const AssignRole = () => {
	const [selectedCards, setSelectedCards] = useState<string[]>([]);

	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	useEffect(() => setTab(0), []);

	return (
		<div className="flex flex-wrap gap-2 px-5 w-full">
			<AssignRoleCard
				birthday="October 25 2000"
				contact="09876543211"
				dateCreated="October 24, 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
				key={1}
			/>
			<AssignRoleCard
				birthday="October 25 2000"
				contact="09876543212"
				dateCreated="October 24, 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
				key={2}
			/>
			<AssignRoleCard
				birthday="October 25 2000"
				contact="09876543213"
				dateCreated="October 24, 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
				key={3}
			/>
			<AssignRoleCard
				birthday="October 25 2000"
				contact="09876543214"
				dateCreated="October 24, 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
				key={4}
			/>
			{selectedCards.length > 0 && <AddRole />}
		</div>
	);
};

export default AssignRole;
