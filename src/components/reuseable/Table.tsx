import { SupplierManagementProps } from "@/constants/props";

const Table = () => {
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
					{SupplierManagementProps.map((value, index) => (
						<tr
							key={`SupplierManagementKey${index}`}
							className="hover:cursor-pointer hover:text-primary">
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
