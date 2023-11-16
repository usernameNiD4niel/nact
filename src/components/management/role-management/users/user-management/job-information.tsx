import { Input } from "@/components/ui/input";
import { FC } from "react";

interface JobInformationProps {
  isDisabled: boolean;
}

const JobInformation: FC<JobInformationProps> = ({ isDisabled }) => {
  return (
    <div className="w-full space-y-3 md:max-w-4xl">
      <h2>Job Information</h2>
      <div className="flex flex-col gap-2">
        <Input placeholder="Job Title" className="py-6" disabled={isDisabled} />
        <Input
          placeholder="Department"
          className="py-6"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default JobInformation;
