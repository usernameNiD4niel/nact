import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Label } from "../ui/label";

interface GenderRadioProps {
	gender: string;
}

const GenderRadio = ({ gender }: GenderRadioProps) => {
	return (
		<RadioGroup defaultValue={gender}>
			<div className="flex items-center gap-3">
				<div className="flex items-center space-x-2 ">
					<RadioGroupItem value="Male" id="r2" />
					<Label htmlFor="r2" className="text-sm">
						Male
					</Label>
				</div>
				<div className="flex items-center space-x-2">
					<RadioGroupItem value="Female" id="r3" />
					<Label htmlFor="r3" className="text-sm">
						Female
					</Label>
				</div>
			</div>
		</RadioGroup>
	);
};

export default GenderRadio;
