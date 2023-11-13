import Delete from "@/assets/delete.svg";
import Edit from "@/assets/edit.svg";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const UserInformation = () => {
	return (
		<div className="w-full space-y-3 md:max-w-4xl">
			<div className="w-full flex justify-between items-center">
				<h2>User Information</h2>
				<div className="flex items-center">
					<Button
						variant={"ghost"}
						className="text-[#FF6F69] hover:text-[#FF6F69]/90 text-sm flex items-center gap-x-2">
						<img src={Delete} />
						Delete
					</Button>
					<Button
						variant={"ghost"}
						className="text-[#047FFF] hover:text-[#047FFF]/90 text-sm flex items-center gap-x-2">
						<img src={Edit} />
						Edit
					</Button>
				</div>
			</div>
			<div className="flex flex-col gap-2">
				<Input placeholder="Last Name" className="py-6" />
				<Input placeholder="First Name" className="py-6" />
				<Input placeholder="Middle Name" className="py-6" />
				<Input placeholder="Phone Number" className="py-6" />
			</div>
		</div>
	);
};

export default UserInformation;
