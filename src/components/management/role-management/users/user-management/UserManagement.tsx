import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import UserInformation from "./user-information";
import JobInformation from "./job-information";

const UserManagement = () => {
	return (
		<section className={headerBackClass}>
			<HeaderWithBack text="User Management" />
			<div className="w-full md:w-[70%] lg:w-[80%] px-5 mb-0 pt-6 border-t-2 fixed top-14 flex items-center flex-col justify-center gap-9">
				<UserInformation />
				<JobInformation />
			</div>
		</section>
	);
};

export default UserManagement;
