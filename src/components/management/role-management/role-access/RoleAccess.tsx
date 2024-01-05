import { Input } from "@/components/ui/input";
import { useInventoryState } from "@/utils/InventoryState";
import { useEffect, useState } from "react";
import Card from "./card";
import { Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import FilterSVG from "@/assets/filter.svg";
import { getRoles } from "@/api/roles";
import { useQuery } from "@tanstack/react-query";
import { IoMdCreate } from "react-icons/io";
import { Link } from "react-router-dom";

export default function RoleAccesFinal() {
	const [setActiveTab] = useInventoryState((state) => [state.setActiveTab]);
	const { data, isLoading } = useQuery(["get-roles"], getRoles);

	const [roles, setRoles] = useState<string[]>([]);
	const [search, setSearch] = useState<string>("");

	useEffect(() => {
		if (data) {
			setRoles(data);
		}
	}, [data]);

	useEffect(() => {
		setActiveTab(1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		if (search && data) {
			const newRoles = data.filter((role) => role.includes(search));

			if (newRoles) {
				setRoles(newRoles);
			} else {
				setRoles([]);
			}
		} else if (!search && data) {
			setRoles(data);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search]);

	function handleOnChange(event: React.ChangeEvent<HTMLInputElement>) {
		setSearch(event.target.value);
	}

	function cardContent() {
		if (isLoading) {
			return <div>Loading...</div>;
		}

		if (roles && roles.length > 0) {
			return roles.map((role) => <Card role={role} key={role} />);
		}

		return (
			<div className="w-full flex items-center justify-center h-[60vh]">
				<p className="text-sm">No roles found</p>
			</div>
		);
	}

	return (
		<>
			<div className="md:px-10 px-5 w-full flex items-center justify-center">
				<div className="mt-36 md:my-24 w-full max-w-4xl flex flex-col gap-3">
					{/* <Input placeholder="Search" /> */}
					<div className="flex items-center pb-4 w-full relative">
						<Search
							className="absolute left-3 top-[0.9rem] text-gray-400"
							size={18}
						/>
						<Input
							placeholder="Search..."
							className="w-full py-6 px-10"
							value={search}
							onChange={handleOnChange}
						/>
						<Button
							variant={"outline"}
							className="absolute right-0 top-0 h-[3.09rem] rounded-none rounded-e-md">
							<img src={FilterSVG} width={25} height={25} />
						</Button>
					</div>
					<div className="flex flex-col gap-2">
						{/* {isLoading ? (
							<div>Loading...</div>
						) : (
							roles && roles.map((role) => <Card role={role} key={role} />)
						)} */}
						{cardContent()}
					</div>
				</div>
				<Link
					to={"/role-management/add"}
					className="bg-[#017DC3] fixed bottom-3 right-4 space-x-1 p-4 text-sm rounded-full text-white flex items-center">
					<span>
						<IoMdCreate />
					</span>
					<span>Create Role</span>
				</Link>
			</div>
			{/* <Outlet /> */}
		</>
	);
}
