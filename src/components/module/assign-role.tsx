import AssignRoleCard from "./helper/assign-role-card";

const AssignRole = () => {
	return (
		<div className="flex flex-wrap gap-2 mt-36 md:mt-20 px-5 w-full">
			<AssignRoleCard
				birthday="10 . 11 . 2023"
				contact="09876543212"
				dateCreated="10 . 11 . 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				key={1}
			/>
			<AssignRoleCard
				birthday="10 . 11 . 2023"
				contact="09876543212"
				dateCreated="10 . 11 . 2023"
				fullName="Daniel V. Rey"
				gender="Female"
				key={1}
			/>
			<AssignRoleCard
				birthday="10 . 11 . 2023"
				contact="09876543212"
				dateCreated="10 . 11 . 2023"
				fullName="Daniel V. Rey"
				gender="Female"
				key={1}
			/>
			<AssignRoleCard
				birthday="10 . 11 . 2023"
				contact="09876543212"
				dateCreated="10 . 11 . 2023"
				fullName="Daniel V. Rey"
				gender="Male"
				key={1}
			/>
		</div>
	);
};

export default AssignRole;
