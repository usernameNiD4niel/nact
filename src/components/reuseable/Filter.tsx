import { FC, useState } from "react";
import AnimatedInputs from "./AnimatedInputs";
import { HiOutlineChevronLeft } from "react-icons/hi2";

const Filter = ({
	setIsShowingFilter,
}: {
	setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// By Date Fields
	const [inclusiveDate, setInclusiveDate] = useState<string>("");
	const [year, setYear] = useState<string>("");
	const [month, setMonth] = useState<string>("");

	// By Category Fields
	const [containerType, setContainerType] = useState<string>("");
	const [condition, setCondition] = useState<string>("");
	const [city, setCity] = useState<string>("");

	// Object to pass for date fields
	const byDateObject: ByDateProps = {
		inclusiveDate,
		month,
		setInclusiveDate,
		setMonth,
		setYear,
		year,
	};

	// Object to pass for category fields
	const byCategoryObject: ByCategoryProps = {
		city,
		condition,
		containerType,
		setCity,
		setCondition,
		setContainerType,
	};

	const handleBackButton = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement;

		if (target.classList.contains("main-class")) {
			setIsShowingFilter((prev) => !prev);
			return;
		}
	};

	return (
		<main
			className={`fixed z-30 w-full h-full flex cursor-pointer overflow-auto bg-black main-class bg-opacity-40 items-center justify-end -top-5 right-0`}
			onClick={handleBackButton}>
			<aside className="h-full w-[70%] sm:w-[40%] md:w-[30%] bg-white cursor-auto pt-2">
				<form className="w-full flex p-5 flex-col h-full gap-y-4 bg-white">
					<button
						type="button"
						className="flex gap-x-2 text-2xl text-primary w-fit"
						onClick={() => setIsShowingFilter(false)}>
						<HiOutlineChevronLeft />
						<span className="font-bold text-sm md:text-base">Filter</span>
					</button>
					<ByDateComponent {...byDateObject} />
					<ByCategory {...byCategoryObject} />
					<SearchComponent />
				</form>
			</aside>
		</main>
	);
};

const SearchComponent = (): JSX.Element => {
	return (
		<div className="border border-1 border-black border-opacity-10 w-full rounded-md py-3 flex flex-col">
			<input
				type="text"
				placeholder="Search"
				className="p-2 rounded text-sm px-3"
			/>
			<hr className="my-2" />
			<label htmlFor="New York" className="text-sm text-gray-400 px-2">
				<input type="checkbox" name="newYork" />
				New York
			</label>
			<label htmlFor="California" className="text-sm text-gray-400 px-2">
				<input type="checkbox" name="california" />
				California
			</label>
			<label htmlFor="abcde" className="text-sm text-gray-400 px-2">
				<input type="checkbox" name="abcde" />
				Abcde
			</label>
		</div>
	);
};

type ByDateProps = {
	inclusiveDate: string;
	setInclusiveDate: React.Dispatch<React.SetStateAction<string>>;
	year: string;
	setYear: React.Dispatch<React.SetStateAction<string>>;
	month: string;
	setMonth: React.Dispatch<React.SetStateAction<string>>;
};

type ByCategoryProps = {
	containerType: string;
	setContainerType: React.Dispatch<React.SetStateAction<string>>;
	condition: string;
	setCondition: React.Dispatch<React.SetStateAction<string>>;
	city: string;
	setCity: React.Dispatch<React.SetStateAction<string>>;
};

const ByDateComponent: FC<ByDateProps> = (props): JSX.Element => {
	return (
		<>
			<h3 className="text-sm text-gray-400 mt-2">BY DATE</h3>
			<AnimatedInputs
				inputType="inclusiveDate"
				isDisabled={false}
				label="Inclusive Date"
				setValue={props.setInclusiveDate}
				type="text"
				value={props.inclusiveDate}
				key="InclusiveDateInput"
			/>
			<AnimatedInputs
				inputType="year"
				isDisabled={false}
				label="Year"
				setValue={props.setYear}
				type="text"
				value={props.year}
				key="YearInput"
			/>
			<AnimatedInputs
				inputType="month"
				isDisabled={false}
				label="Month"
				setValue={props.setMonth}
				type="text"
				value={props.month}
				key="MonthInput"
			/>
		</>
	);
};

const ByCategory: FC<ByCategoryProps> = (props): JSX.Element => {
	return (
		<>
			<h3 className="text-sm text-gray-400">BY CATEGORY</h3>
			<AnimatedInputs
				inputType="containerType"
				isDisabled={false}
				label="Container Type"
				value={props.containerType}
				setValue={props.setContainerType}
				type="text"
				key="ContainerTypeInput"
			/>
			<AnimatedInputs
				inputType="condition"
				isDisabled={false}
				label="Condition"
				value={props.condition}
				setValue={props.setCondition}
				type="text"
				key="ConditionInput"
			/>
			<AnimatedInputs
				inputType="city"
				isDisabled={false}
				label="City"
				value={props.city}
				setValue={props.setCity}
				type="text"
				key="CityInput"
			/>
		</>
	);
};

export default Filter;
