// import { getSupplierTableData } from "@/api/supplier";
// import { SupplierTableProps } from "@/constants/props";
// import { useMutation } from "@tanstack/react-query";
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// // import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const LoadTableData = () => {
// 	const navigate = useNavigate();
// 	const [tableData, setTableData] = useState<SupplierTableProps[]>();
// 	const [error, setError] = useState<string>("");
// 	//   const [supplierData, setSupplierData] = useState<SupplierManagementCard[]>(
// 	//     SupplierManagementProps
// 	//   );

// 	const mutation = useMutation({
// 		mutationFn: getSupplierTableData,
// 		onSuccess: (data) => {
// 			if (data) {
// 				setError("");
// 				setTableData(data);
// 			}
// 			console.log("success", data);
// 		},
// 		onError: (error_) => {
// 			if (typeof error_ === "string") {
// 				setError(error_);
// 			}
// 		},
// 	});

// 	useEffect(() => {
// 		mutation.mutate();
// 	}, []);
// 	const handleAddingNewForm = (data: SupplierTableProps) => {
// 		navigate(`${data.id}`, { state: data.id });
// 	};

// 	if (error) {
// 		return <div>{error}</div>;
// 	}
// 	return (
// 		<>
// 			{/* Change this after the type of response is changed */}
// 			{tableData && tableData.length > 0 ? (
// 				tableData
// 					.slice(0)
// 					.reverse()
// 					.map((value) => (
// 						<tr
// 							key={`SupplierManagementKey${value.businessName}`}
// 							className="hover:cursor-pointer hover:text-primary"
// 							onClick={() => handleAddingNewForm(value)}>
// 							<td className="flex flex-col gap-y-2">
// 								{value.businessName}{" "}
// 								<span className="sm:hidden">
// 									{value.state}, {value.country}
// 								</span>
// 							</td>
// 							<td>
// 								<span className="hidden sm:block">
// 									{value.state}, {value.country}
// 								</span>
// 							</td>
// 							<td>
// 								<span className="hidden lg:block"></span>
// 							</td>
// 							<td>{value.companyPhoneNumber}</td>
// 						</tr>
// 					))
// 			) : (
// 				<div className="h-[40vh] ml-10 flex items-center justify-end">
// 					<p className="md:text-sm text-xs">
// 						No supplier data yet{" "}
// 						<Link
// 							to="/supplier/add/shipping"
// 							className="underline underline-offset-2 text-primary">
// 							create new entry
// 						</Link>
// 					</p>
// 				</div>
// 			)}
// 		</>
// 	);
// };

// export default LoadTableData;

import { getSupplierTableData } from "@/api/supplier";
import { SupplierTableProps } from "@/constants/props";
import { useMutation } from "@tanstack/react-query";
import { FC, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

type LoadTableDataProps = {
	setTableData: React.Dispatch<React.SetStateAction<SupplierTableProps[]>>;
	shallowCopy: SupplierTableProps[];
	setShallowCopy: React.Dispatch<React.SetStateAction<SupplierTableProps[]>>;
};

const LoadTableData: FC<LoadTableDataProps> = ({
	setShallowCopy,
	setTableData,
	shallowCopy,
}) => {
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string>("");

	const mutation = useMutation({
		mutationFn: getSupplierTableData,
		onSuccess: (data) => {
			if (data) {
				setError("");
				setTableData(data);
				setIsLoading(false);
				setShallowCopy(data.slice(0, 15));
			}
		},
		onError: (error_) => {
			if (typeof error_ === "string") {
				setError(error_);
			}
			setIsLoading(false);
		},
	});

	useEffect(() => {
		mutation.mutate();
	}, []);

	const handleAddingNewForm = (data: SupplierTableProps) => {
		navigate(`${data.id}`, { state: data.id });
	};

	if (error) {
		return (
			<tr>
				<td>{error}</td>
			</tr>
		);
	}

	if (isLoading) {
		return (
			<tr className="w-[100vw] lg:w-[70vw] lg:h-[500px] flex items-center justify-center">
				<td colSpan={4}>
					<span className="loading loading-dots loading-sm"></span>
				</td>
			</tr>
		);
	}

	// Limit the number of rows to display, e.g., 10
	//   const displayedTableData = tableData?.slice(0, 10);

	return (
		<>
			{shallowCopy && shallowCopy.length > 0 ? (
				shallowCopy
					.slice(0)
					.reverse()
					.map((value) => (
						<tr
							key={value.id}
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
				<tr className="h-[40vh] ml-10 flex items-center justify-end">
					<td className="md:text-sm text-xs">
						No supplier data yet{" "}
						<Link
							to="/supplier/add/shipping"
							className="underline underline-offset-2 text-primary">
							create new entry
						</Link>
					</td>
				</tr>
			)}
		</>
	);
};

export default LoadTableData;
