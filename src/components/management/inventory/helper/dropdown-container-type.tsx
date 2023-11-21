// import DisplayErrorMessage from "@/components/DisplayErrorMessage";
import { containerType } from "@/constants/arrays";
// import {
// 	animatedInputClass,
// 	animatedSpanClass,
// } from "@/constants/reusable-class";

import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { FC } from "react";

// interface DropdownContainerTypeProps {
// 	setValue: React.Dispatch<React.SetStateAction<string>>;
// 	containerTypeError: string;
// }

interface DropdownContainerTypeProps {
	defaultValue?: string;
}

const DropdownContainerType: FC<DropdownContainerTypeProps> = ({
	defaultValue,
}) => {
	return (
		<div className="space-y-1">
			<Select name="containerType">
				<SelectTrigger className="w-full py-6 border-black border-opacity-20">
					<SelectValue
						placeholder={
							defaultValue ? defaultValue : "Select a container type"
						}
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectGroup>
						<SelectLabel>Container Types</SelectLabel>
						{containerType.map((container) => (
							<SelectItem value={container} key={container}>
								{container}
							</SelectItem>
						))}
					</SelectGroup>
				</SelectContent>
			</Select>
			{/* {containerTypeError && (
				<p className="text-xs md:text-sm text-red-500">{containerTypeError}</p>
			)} */}
		</div>
	);
};

export default DropdownContainerType;
