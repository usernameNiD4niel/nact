import { containerType } from "@/constants/arrays";
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
interface DropdownContainerTypeProps {
	defaultValue?: string;
	isDisabled: boolean;
}

const DropdownContainerType: FC<DropdownContainerTypeProps> = ({
	defaultValue,
	isDisabled,
}) => {
	return (
		<div className="space-y-1">
			<Select name="containerType">
				<SelectTrigger
					className="w-full py-6 border-[1px] disabled:border-black disabled:border-opacity-50 disabled:bg-gray-100"
					disabled={isDisabled}>
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
		</div>
	);
};

export default DropdownContainerType;
