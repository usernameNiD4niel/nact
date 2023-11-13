import { useInventoryState } from "@/utils/InventoryState";
import { useEffect } from "react";
import { UserTable } from "./user-table";
import { columns, users } from "./column";

const Users = () => {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);
	// const [data, setData] = useState();

	useEffect(() => {
		setActiveTab(0);
	}, []);

	return (
		<div className="w-full flex items-center justify-center">
			<div className="md:px-10 px-5 w-full flex items-center justify-center">
				<div className="mt-36 md:my-24 w-full max-w-4xl">
					{/* <div className="w-full md:flex hidden">
						<NewDataTable
							columns={columns}
							data={supplier}
							next_page_url={nextPageUrl}
							setData={setSupplier}
						/>
					</div>
					<div className="md:hidden w-full">
						<NewDataTable
							columns={mobileColumn}
							data={supplier}
							next_page_url={nextPageUrl}
							setData={setSupplier}
						/>
					</div> */}
					<UserTable columns={columns} data={users} />
				</div>
			</div>
			{/* <AddButton
				redirectUrl="/supplier/add"
				textButton="Supplier"
				key={"SupplierAddTable"}
			/> */}
		</div>
	);
};

export default Users;
