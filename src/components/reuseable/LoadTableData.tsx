import { getSupplierTableData } from "@/api/supplier";
import { SupplierTableProps } from "@/constants/props";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoadTableData = () => {
	const navigate = useNavigate();
	const [tableData, setTableData] = useState<SupplierTableProps[]>();
	const [error, setError] = useState<string>("");
	//   const [supplierData, setSupplierData] = useState<SupplierManagementCard[]>(
	//     SupplierManagementProps
	//   );

	const mutation = useMutation({
		mutationFn: getSupplierTableData,
		onSuccess: (data) => {
			if (data) {
				setError("");
				setTableData(data);
			}
			console.log("success", data);
		},
		onError: (error_) => {
			if (typeof error_ === "string") {
				setError(error_);
			}
		},
	});

	useEffect(() => {
		mutation.mutate();
	}, []);
	const handleAddingNewForm = (data: SupplierTableProps) => {
		navigate(`${data.businessName}`, { state: data });
	};

	if (error) {
		return <div>{error}</div>;
	}
	return (
		<>
			{/* Change this after the type of response is changed */}
			{tableData && tableData.length > 0 ? (
				tableData.map((value) => (
					<tr
						key={`SupplierManagementKey${value.businessName}`}
						className="hover:cursor-pointer hover:text-primary"
						onClick={() => handleAddingNewForm(value)}>
						<td className="flex flex-col gap-y-2">
							{value.businessName}{" "}
							<span className="sm:hidden">
								{value.state}, {value.country}
							</span>
						</td>
						<td>
							<span className="hidden sm:block">
								{value.state}, {value.country}
							</span>
						</td>
						<td>
							<span className="hidden lg:block"></span>
						</td>
						<td>{value.companyPhoneNumber}</td>
					</tr>
				))
			) : (
				<div className="h-[40vh] ml-10 flex items-center justify-end">
					<p className="md:text-sm text-xs">
						No supplier data yet{" "}
						<Link
							to="/supplier/add/shipping"
							className="underline underline-offset-2 text-primary">
							create new entry
						</Link>
					</p>
				</div>
			)}
		</>
	);
};

export default LoadTableData;
