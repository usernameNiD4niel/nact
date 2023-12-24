import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

interface ScalableSelectProps {
	items: string[];
	placeholder: string;
	name: string;
	isDisabled: boolean;
	setSelected: React.Dispatch<React.SetStateAction<string>>;
}

export default function ScalableSelect({
	items,
	placeholder,
	name,
	isDisabled,
	setSelected,
}: ScalableSelectProps) {
	function handlOnSelect(selected: string) {
		setSelected(selected);
	}
	return (
		<Select
			name={name}
			disabled={isDisabled}
			onValueChange={(e) => handlOnSelect(e)}>
			<SelectTrigger>
				<SelectValue placeholder={placeholder} />
			</SelectTrigger>
			<SelectContent>
				{items.map((item, index) => (
					<SelectItem key={`${item}${index}`} value={item}>
						{item}
					</SelectItem>
				))}
			</SelectContent>
		</Select>
	);
}
