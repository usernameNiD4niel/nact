import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import UserInformation from "./user-information";
// import JobInformation from "./job-information";
import RoleManagement from "./role-management";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { getSpecificUser, updateUser } from "@/api/account";
import { RoleManagementUser } from "@/constants/props";
import SuccessModal from "@/components/reuseable/SuccessModal";
import { useQuery } from "@tanstack/react-query";

const UserManagement = () => {
	const location = useLocation();

	const arrayEndpoint = location.pathname.split("/");
	const id = arrayEndpoint[arrayEndpoint.length - 1];

	// Define fields state
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [mobileNumber, setMobileNumber] = useState("");
	const [status, setStatus] = useState("");
	const [userType, setUserType] = useState("");

	const [isDisabled, setIsDisabled] = useState(true);

	const [message, setMessage] = useState("");
	const [validation, setValidation] = useState("");

	const [updating, setUpdating] = useState(false);

	const { data, isLoading } = useQuery(["users", { id: id }], async () => {
		return getSpecificUser(id);
	});

	const handleUpdateButton = async (
		event: React.FormEvent<HTMLFormElement>,
	) => {
		event.preventDefault();

		let type = userType.toLowerCase().split(" ").join("_");

		if (userType === "Billing and Collection") {
			type = "billing_collection";
		}

		const data: RoleManagementUser = {
			firstName,
			lastName,
			middleName,
			mobileNumber,
			status,
			userType: type,
		};

		setUpdating(true);
		const message_ = await updateUser(id, data);

		if (message_.success) {
			setValidation("success");
		} else {
			setValidation("error");
		}
		setUpdating(false);
		console.log(`this should be active now ::: ${status}`);

		setMessage(message_.message);
	};

	useEffect(() => {
		if (data) {
			setFirstName(data.firstName);
			setLastName(data.lastName);
			setMiddleName(data.middleName);
			setStatus(data.status);
			setUserType(data.userType);
			setMobileNumber(data.mobileNumber);
		}
	}, [data]);

	return (
		<>
			<section className={headerBackClass}>
				<HeaderWithBack text="User Management" />
				<div className="flex flex-col items-center justify-center mt-10">
					<form
						className="p-2 flex flex-col gap-y-4 w-full lg:w-[60%] py-10 bg-white px-6"
						onSubmit={handleUpdateButton}>
						{isLoading ? (
							<div>Getting user information...</div>
						) : (
							<>
								<UserInformation
									id={id}
									isDisabled={isDisabled}
									setIsDisabled={setIsDisabled}
									userInfo={{
										firstName,
										lastName,
										middleName,
										mobileNumber,
										setFirstName,
										setLastName,
										setMobileNumber,
										setMiddleName,
									}}
								/>
								{/* <JobInformation isDisabled={isDisabled} /> */}
								<RoleManagement
									isDisabled={isDisabled}
									status={status}
									setStatus={setStatus}
									userType={userType}
									setUserType={setUserType}
								/>
								{!isDisabled && (
									<Button disabled={updating}>
										{updating ? "Updating..." : "Update"}
									</Button>
								)}
							</>
						)}
					</form>
				</div>
			</section>
			{validation && validation !== "" && (
				<SuccessModal
					message={message}
					redirectText="Go to users table"
					redirectTo="/role-management"
					setValidation={setValidation}
					title={`${
						validation === "success" ? "Update success" : "Update failure"
					}`}
					validation={validation}
					key={"UserManagementFormModal"}
				/>
			)}
		</>
	);
};

export default UserManagement;
