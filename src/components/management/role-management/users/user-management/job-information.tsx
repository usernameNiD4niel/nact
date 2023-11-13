import { Input } from "@/components/ui/input";

const JobInformation = () => {
	return (
		<div className="w-full space-y-3 md:max-w-4xl">
			<h2>Job Information</h2>
			<div className="flex flex-col gap-2">
				<Input placeholder="Job Title" className="py-6" />
				<Input placeholder="Department" className="py-6" />
			</div>
		</div>
	);
};

export default JobInformation;
