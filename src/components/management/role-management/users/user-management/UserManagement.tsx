import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import UserInformation from "./user-information";
// import JobInformation from "./job-information";
import RoleManagement from "./role-management";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UserManagement = () => {
	const location = useLocation();

	const arrayEndpoint = location.pathname.split("/");
	const id = arrayEndpoint[arrayEndpoint.length - 1];

	// Define fields state
	const [lastName, setLastName] = useState("");
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [status, setStatus] = useState("");
	const [userType, setUserType] = useState("");

	const [isDisabled, setIsDisabled] = useState(true);

	return (
		<section className={headerBackClass}>
			<HeaderWithBack text="User Management" />
			<div className="flex flex-col items-center justify-center mt-10">
				<form className="p-2 flex flex-col gap-y-4 w-full lg:w-[60%] py-10 bg-white px-6">
					<UserInformation
						id={id}
						isDisabled={isDisabled}
						setIsDisabled={setIsDisabled}
						userInfo={{
							firstName,
							lastName,
							middleName,
							phoneNumber,
							setFirstName,
							setLastName,
							setPhoneNumber,
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
					{!isDisabled && <Button>Update</Button>}
				</form>
			</div>
		</section>
	);
};

export default UserManagement;
