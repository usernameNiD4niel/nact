import { Locations } from "@/constants/props";
import ComboBoxResponsive from "./CityDropdown";
import { useEffect, useState } from "react";
import { getLocations } from "@/api/locations";
import { animatedInputClass } from "@/constants/reusable-class";

interface LocationFormProps {
	hasRegion: boolean;
	isDisabled: boolean;
	defaultCity?: string;
	defaultState?: string;
	defaultCountry?: string;
	defaultRegion?: string;
}

export default function LocationForm({
	hasRegion,
	isDisabled,
	defaultCity,
	defaultCountry,
	defaultRegion,
	defaultState,
}: LocationFormProps) {
	const [locations, setLocations] = useState<Locations[]>([]);
	// ! Remove this if city will be use (bcuz city is unique)
	const [selectedId, setSelectedId] = useState(""); // * send this to the form as location_id
	const [country, setCountry] = useState<string>(
		defaultCountry ? defaultCountry : "",
	);
	const [state, setState] = useState(defaultState ? defaultState : "");
	const [region, setRegion] = useState(defaultRegion ? defaultRegion : "");
	const [cities, setCities] = useState<string[]>([]);

	async function getLocation() {
		const locations_ = await getLocations();
		setLocations(locations_);
		const newCity = locations_.map((loc) => loc.city);
		setCities(newCity);

		if (defaultCity) {
			const newCity = locations_.find((loc) => loc.city === defaultCity);

			if (newCity) {
				setSelectedId(newCity.id);
			}
		}
	}

	// ! Will only work if the city is unique
	// array of cities
	// locations.find(loc => loc.city === selectedCity) as location
	// if location THEN setSelectedId(location.id); , setCountry(location.country); , ...
	useEffect(() => {
		getLocation();
	}, []);

	function handleCitySelection(selectedCity: string) {
		const newCity = locations.find((loc) => loc.city === selectedCity);

		if (newCity) {
			setSelectedId(newCity.id);
			setCountry(newCity.country);
			setState(newCity.state);

			if (hasRegion) {
				setRegion(newCity.region);
			}
		}
	}

	return (
		<div className="flex flex-col gap-4">
			<div className="w-full flex flex-col gap-y-1">
				<label htmlFor="city" className={"text-sm"}>
					City
				</label>
				<ComboBoxResponsive
					cities={cities}
					handleCitySelection={handleCitySelection}
					isDisabled={isDisabled}
					defaultValue={defaultCity}
				/>
			</div>

			{/*  */}
			<label className="relative" htmlFor="state">
				<span className="text-sm">State</span>
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					value={state}
					name="state"
					disabled
					id="state"
					onChange={(e) => setState(e.target.value)}
				/>
			</label>

			<label className="relative" htmlFor="country">
				<span className="text-sm">Country</span>
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					value={country}
					name="country"
					disabled
					id="country"
					onChange={(e) => setCountry(e.target.value)}
				/>
			</label>

			<label className="relative" htmlFor="region">
				<span className="text-sm">Region</span>
				<input
					type="text"
					className={`${animatedInputClass} disabled:bg-gray-100`}
					value={region}
					name="region"
					disabled
					id="region"
					onChange={(e) => setRegion(e.target.value)}
				/>
			</label>

			<input
				value={selectedId}
				onChange={(e) => setSelectedId(e.target.value)}
				name="location_id"
				className="hidden"
			/>
			{/*  */}

			{/* <div className="flex flex-col gap-2">
				<label className="text-sm" htmlFor="country">
					Country
				</label>
				<input
					placeholder="Select a city first"
					value={country}
					onChange={(e) => setCountry(e.target.value)}
					id="country"
				/>
			</div>

			<div className="flex flex-col gap-2">
				<label className="text-sm" htmlFor="state">
					State
				</label>
				<input
					placeholder="Select a city first"
					id="state"
					value={state}
					onChange={(e) => setState(e.target.value)}
				/>
			</div>
			{hasRegion && (
				<div className="flex flex-col gap-2">
					<label className="text-sm" htmlFor="region">
						Region
					</label>
					<input
						placeholder="Select a city first"
						value={region}
						id="region"
						onChange={(e) => setRegion(e.target.value)}
					/>
				</div>
			)}
			<input
				value={selectedId}
				onChange={(e) => setSelectedId(e.target.value)}
				disabled
				hidden
			/>
			<pre>{JSON.stringify(locations, null, 2)}</pre> */}
		</div>
	);
}
