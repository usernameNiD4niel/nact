import {
	SupplierManagementCard,
	SupplierManagementProps,
} from "@/constants/props";
import { useNavigate } from "react-router-dom";

const Table = () => {
	const navigate = useNavigate();

	const handleAddingNewForm = (data: SupplierManagementCard) => {
		navigate(`${data.route}`, { state: data });
	};

	return (
		<div className="overflow-x-auto w-full">
			<table className="table">
				{/* head */}
				<thead>
					<tr className="font-bold text-sm text-black">
						<th>Supplier</th>
						<th>
							<span className="hidden sm:block">Location</span>
						</th>
						<th>
							<span className="hidden lg:block">abcde</span>
						</th>
						<th>Contact</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					{SupplierManagementProps.map((value) => (
						<tr
							key={`SupplierManagementKey${value.route}`}
							className="hover:cursor-pointer hover:text-primary"
							onClick={() => handleAddingNewForm(value)}>
							{/* <Link
								to={`supplier/${value.id}`}
								state={{ state: value }}
								className="w-full"> */}
							<td className="flex flex-col gap-y-2">
								{value.title}{" "}
								<span className="sm:hidden">{value.subtitle}</span>
							</td>
							<td>
								<span className="hidden sm:block">{value.subtitle}</span>
							</td>
							<td>
								<span className="hidden lg:block"></span>
							</td>
							<td>{value.phoneNumber}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default Table;
