import { InventoryObjects } from "@/constants/props";

const TableSixCol = () => {
	return (
		<div className="overflow-x-auto w-full">
			<table className="table w-full">
				{/* head */}
				<thead>
					<tr className="font-bold text-sm text-black">
						<th>Product Name</th>
						<th>
							<span className="hidden sm:block">City</span>
						</th>
						<th>
							<span className="hidden md:block">State</span>
						</th>
						<th>Price</th>
						<th>
							<span className="hidden lg:block">Quantity</span>
						</th>
						<th>
							<span className="hidden lg:block">Depot</span>
						</th>
					</tr>
				</thead>
				<tbody>
					{/* row 1 */}
					{InventoryObjects.map((value, index) => (
						<tr
							key={`SupplierManagementKey${index}`}
							className="hover:cursor-pointer hover:text-primary">
							<td className="flex flex-col w-full">
								{value.productName}
								<div>
									<span className="sm:hidden">025145 | </span>
									<span className="sm:hidden">{value.city},</span>
									<span className="md:hidden">{value.state} |</span>
									<span className="lg:hidden">{value.depot}</span>
								</div>
							</td>
							<td>
								<span className="hidden sm:block">{value.city}</span>
							</td>
							<td>
								<span className="hidden md:block">{value.state}</span>
							</td>
							<td>{value.price}</td>
							<td>
								<span className="hidden lg:block">{value.quantity}</span>
							</td>
							<td>
								<span className="hidden lg:block">{value.depot}</span>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default TableSixCol;
