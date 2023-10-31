import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import AssignRoleCard from "../helper/assign-role-card";
import DemoteRole from "../helper/demote-role";

const BillingAndCollection = () => {
	const [setTab] = useInventoryState((state) => [state.setActiveTab]);

	const [selectedCards, setSelectedCards] = useState<string[]>([]);
	useEffect(() => setTab(3), []);

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
				key={6}
			/>
			<AssignRoleCard
				birthday="October 25 2000"
				contact="09876543211"
				dateCreated="October 24, 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
				key={5}
			/>
			<AssignRoleCard
				birthday="October 25 2000"
				contact="09876543211"
				dateCreated="October 24, 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
				key={4}
			/>
			<AssignRoleCard
				birthday="October 25 2000"
				contact="09876543211"
				dateCreated="October 24, 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
				key={3}
			/>
			<AssignRoleCard
				birthday="October 25 2000"
				contact="09876543211"
				dateCreated="October 24, 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				selectedCards={selectedCards}
				setSelectedCards={setSelectedCards}
				key={2}
			/>
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
			{selectedCards.length > 0 && <DemoteRole />}
		</div>
	);
};

export default BillingAndCollection;
