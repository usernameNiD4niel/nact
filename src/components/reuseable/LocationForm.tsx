import { Locations } from "@/constants/props";
import ComboBoxResponsive from "./CityDropdown";

interface LocationFormProps {
	locations: Locations[];
}

export default function LocationForm({ locations }: LocationFormProps) {
	return (
		<div>
			<ComboBoxResponsive cities={[]} />
			<pre>{JSON.stringify(locations, null, 2)}</pre>
		</div>
	);
}
