import { ButtonList } from "@/constants/enums";
import { Link } from "react-router-dom";

interface DisplayLinkProps {
	access: string;
	selected: ButtonList | null;
}

export default function DisplayLink({ access, selected }: DisplayLinkProps) {
	const buttonClass =
		"flex gap-x-3 py-2 mb-2 mx-3 px-2 text-sm rounded-md items-center transition-opacity duration-300";
	const hoverButtonClass =
		"hover:text-blue-500 hover:font-semibold hover:bg-white";

	return (
		<>
			{access === "Role Management" && (
				<li>
					<Link
						to="/role-management"
						className={`${buttonClass} ${
							selected === ButtonList.RoleManagement
								? "text-[#017DC3] font-semibold bg-slate-50"
								: "text-white font-thin"
						} ${hoverButtonClass}`}>
						Role Management
					</Link>
				</li>
			)}
			{access === "Customer" && (
				<li>
					<Link
						to="/customer"
						className={`${buttonClass} ${
							selected === ButtonList.Customer
								? "text-[#017DC3] font-semibold bg-slate-50"
								: "text-white font-thin"
						} ${hoverButtonClass}`}>
						Customer
					</Link>
				</li>
			)}
			{access === "Supplier Management" && (
				<li>
					<Link
						to="/supplier"
						className={`${buttonClass} flex justify-between items-center group ${
							selected === ButtonList.Supplier
								? "text-[#017DC3] font-semibold bg-slate-50"
								: "text-white font-thin"
						} ${hoverButtonClass}`}>
						Supplier Management
					</Link>
				</li>
			)}
			{access === "Sales Agent" && (
				<li>
					<Link
						to="/sales-agent"
						className={`${buttonClass} ${
							selected === ButtonList.SalesAgent
								? "text-[#017DC3] font-semibold bg-slate-50"
								: "text-white font-thin"
						} ${hoverButtonClass}`}>
						Sales Agent
					</Link>
				</li>
			)}
			{access === "Inventory Officer" && (
				<li>
					<Link
						to="/inventory-officer"
						className={`${buttonClass} ${
							selected === ButtonList.InventoryOfficer
								? "text-[#017DC3] font-semibold bg-slate-50"
								: "text-white font-thin"
						} ${hoverButtonClass}`}>
						Inventory Officer
					</Link>
				</li>
			)}
			{access === "Inventory" && (
				<li>
					<Link
						to="/inventory"
						className={`${buttonClass} ${
							selected === ButtonList.Inventory
								? "text-[#017DC3] font-semibold bg-slate-50"
								: "text-white font-thin"
						} ${hoverButtonClass}`}>
						Inventory
					</Link>
				</li>
			)}
			{access === "Order Generator" && (
				<li>
					<Link
						to="/order-generator"
						className={`${buttonClass} ${
							selected === ButtonList.OrderGenerator
								? "text-[#017DC3] font-semibold bg-slate-50"
								: "text-white font-thin"
						} ${hoverButtonClass}`}>
						Order Generator
					</Link>
				</li>
			)}
		</>
	);
}
