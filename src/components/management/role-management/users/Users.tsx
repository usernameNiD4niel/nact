import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import { UserTable } from "./user-table";
import { columns } from "./column";
import { getAllUsers } from "@/api/account";
import { useQuery } from "@tanstack/react-query";
import AddButton from "@/components/reuseable/AddButton";

// Fall for you - serenade

const Users = () => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);
	const { data, isLoading } = useQuery(["users"], getAllUsers);
	// const [data, setData] = useState();

	useEffect(() => {
		setActiveTab(0);
	}, []);

	return (
		<div className="w-full flex items-center justify-center">
			<div className="md:px-10 px-5 w-full flex items-center justify-center">
				<div className="mt-36 md:my-24 w-full max-w-4xl">
					{/* {data && data[0].fullName} */}
					{isLoading ? (
						<div className="w-full h-[40vh] flex items-center justify-center">
							The data is being load, please wait
						</div>
					) : (
						<UserTable columns={columns} data={data ?? []} />
					)}
				</div>
			</div>
			<AddButton
				redirectUrl="/role-management/role-access"
				textButton="Add Role"
				key={"RoleManagementAdd"}
			/>
		</div>
	);
};

export default Users;
