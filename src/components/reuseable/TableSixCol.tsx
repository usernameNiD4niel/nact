import { InventoryObjects, InventoryTypes } from "@/constants/props";
import { useNavigate } from "react-router-dom";

// const TableSixCol = () => {
// 	const navigate = useNavigate();

// 	const handleAddingNewForm = (value: InventoryTypes) => {
// 		navigate(`${value.id}`, { state: value });
// 	};
// 	return (
// 		<div className="overflow-x-auto w-full">
// 			<table className="table">
// 				{/* head */}
// 				<thead>
// 					<tr className="font-bold text-sm text-black">
// 						<th className="text-sm">Product Name</th>
// 						<th>
// 							<span className="hidden sm:block text-sm">City</span>
// 						</th>
// 						<th>
// 							<span className="hidden md:block text-sm">State</span>
// 						</th>
// 						<th>
// 							<span className="hidden lg:block text-sm">Quantity</span>
// 						</th>
// 						<th>
// 							<span className="hidden lg:block text-sm">Depot</span>
// 						</th>
// 						<th>Price</th>
// 					</tr>
// 				</thead>
// 				<tbody>
// 					{/* row 1 */}
// 					{InventoryObjects.map((value, index) => (
// 						<tr
// 							key={`SupplierManagementKey${index}`}
// 							className="hover:cursor-pointer hover:text-primary text-sm"
// 							onClick={() => handleAddingNewForm(value)}>
// 							<td className="flex flex-col w-full">
// 								{value.productName}
// 								<div className="flex flex-col">
// 									<span className="sm:hidden">025145</span>
// 									<div>
// 										<span className="sm:hidden">{value.city},</span>
// 										<span className="md:hidden">{value.state}</span>
// 									</div>
// 									<span className="lg:hidden">{value.depot}</span>
// 								</div>
// 							</td>
// 							<td>
// 								<span className="hidden sm:block">{value.city}</span>
// 							</td>
// 							<td>
// 								<span className="hidden md:block">{value.state}</span>
// 							</td>
// 							<td>
// 								<span className="hidden lg:block">{value.quantity}</span>
// 							</td>
// 							<td>
// 								<span className="hidden lg:block">{value.depot}</span>
// 							</td>
// 							<td>{value.price}</td>
// 						</tr>
// 					))}
// 				</tbody>
// 			</table>
// 		</div>
// 	);
// };

const TableSixCol = () => {};

export default TableSixCol;
