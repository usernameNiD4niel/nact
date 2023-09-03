// import { FC, useState } from "react";
// import AnimatedInputs from "./AnimatedInputs";
import { HiOutlineChevronLeft } from "react-icons/hi2";
import FilterAccordion from "./FilterAccordion";

const Filter = ({
	setIsShowingFilter,
}: {
	setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	// By Date Fields
	// const [inclusiveDate, setInclusiveDate] = useState<string>("");
	// const [year, setYear] = useState<string>("");
	// const [month, setMonth] = useState<string>("");

	// // By Category Fields
	// const [containerType, setContainerType] = useState<string>("");
	// const [condition, setCondition] = useState<string>("");
	// const [city, setCity] = useState<string>("");

	// // Object to pass for date fields
	// const byDateObject: ByDateProps = {
	// 	inclusiveDate,
	// 	month,
	// 	setInclusiveDate,
	// 	setMonth,
	// 	setYear,
	// 	year,
	// };

	// // Object to pass for category fields
	// const byCategoryObject: ByCategoryProps = {
	// 	city,
	// 	condition,
	// 	containerType,
	// 	setCity,
	// 	setCondition,
	// 	setContainerType,
	// };

	const handleBackButton = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement;

		if (target.classList.contains("main-class")) {
			setIsShowingFilter((prev) => !prev);
			return;
		}
	};

	return (
		<main
			className={`fixed z-30 w-full h-full flex cursor-pointer overflow-auto bg-black main-class bg-opacity-40 items-center justify-end -top-5  bottom-0 right-0`}
			onClick={handleBackButton}>
			<aside className="h-full w-[70%] sm:w-[40%] md:w-[30%] bg-white cursor-auto pt-2">
				<form className="w-full flex p-5 flex-col gap-y-4 bg-white">
					<button
						type="button"
						className="flex gap-x-2 text-2xl text-primary w-fit"
						onClick={() => setIsShowingFilter(false)}>
						<HiOutlineChevronLeft />
						<span className="font-bold text-sm md:text-base">Filter</span>
					</button>
					{/* <ByDateComponent {...byDateObject} />
					<ByCategory {...byCategoryObject} />
					<SearchComponent /> */}
					<hr />
					<FilterAccordion
						accordionItems={["20 STD - CW", "40 HC - CW", "20 STD - OT"]}
						accordionText="Product Name"
					/>
					<hr />
					<FilterAccordion
						accordionItems={["New York", "California", "Boston"]}
						accordionText="City"
					/>
					<hr />
					<FilterAccordion accordionItems={["USA"]} accordionText="State" />
					<hr />
					<FilterAccordion
						accordionItems={[
							"less than $ 1,250",
							"$1,251 - $ 1,260",
							"$1,261 - $ 1,270",
							"$ 1,271 - $ 1,280",
							"$ 1,281 - up",
						]}
						accordionText="Price"
					/>
					<hr />
				</form>
			</aside>
		</main>
	);
};

// const SearchComponent = (): JSX.Element => {
// 	return (
// 		<div className="border border-1 border-black border-opacity-20 w-full rounded-md py-3 flex flex-col bg-white">
// 			<input
// 				type="text"
// 				placeholder="Search"
// 				className="p-2 rounded-md text-[16px] px-3 focus:outline-none border border-1 border-black border-opacity-20 mx-3 my-1"
// 			/>
// 			<div className="w-full h-[1px] bg-black bg-opacity-20 mt-2 mb-4" />
// 			<div className="flex flex-col gap-y-2">
// 				<label className="text-xs text-gray-400 px-2 w-fit">
// 					<input type="checkbox" name="newYork" className="mr-2" />
// 					New York
// 				</label>
// 				<label className="text-xs text-gray-400 px-2 w-fit">
// 					<input type="checkbox" name="california" className="mr-2" />
// 					California
// 				</label>
// 				<label className="text-xs text-gray-400 px-2 w-fit">
// 					<input type="checkbox" name="abcde" className="mr-2" />
// 					Abcde
// 				</label>
// 			</div>
// 		</div>
// 	);
// };

// type ByDateProps = {
// 	inclusiveDate: string;
// 	setInclusiveDate: React.Dispatch<React.SetStateAction<string>>;
// 	year: string;
// 	setYear: React.Dispatch<React.SetStateAction<string>>;
// 	month: string;
// 	setMonth: React.Dispatch<React.SetStateAction<string>>;
// };

// type ByCategoryProps = {
// 	containerType: string;
// 	setContainerType: React.Dispatch<React.SetStateAction<string>>;
// 	condition: string;
// 	setCondition: React.Dispatch<React.SetStateAction<string>>;
// 	city: string;
// 	setCity: React.Dispatch<React.SetStateAction<string>>;
// };

// const ByDateComponent: FC<ByDateProps> = (props): JSX.Element => {
// 	return (
// 		<>
// 			<h3 className="text-sm text-gray-400 mt-2">BY DATE</h3>
// 			<AnimatedInputs
// 				inputType="inclusiveDate"
// 				isDisabled={false}
// 				label="Inclusive Date"
// 				setValue={props.setInclusiveDate}
// 				type="text"
// 				value={props.inclusiveDate}
// 				key="InclusiveDateInput"
// 			/>
// 			<AnimatedInputs
// 				inputType="year"
// 				isDisabled={false}
// 				label="Year"
// 				setValue={props.setYear}
// 				type="text"
// 				value={props.year}
// 				key="YearInput"
// 			/>
// 			<AnimatedInputs
// 				inputType="month"
// 				isDisabled={false}
// 				label="Month"
// 				setValue={props.setMonth}
// 				type="text"
// 				value={props.month}
// 				key="MonthInput"
// 			/>
// 		</>
// 	);
// };

// const ByCategory: FC<ByCategoryProps> = (props): JSX.Element => {
// 	return (
// 		<>
// 			<h3 className="text-sm text-gray-400">BY CATEGORY</h3>
// 			<AnimatedInputs
// 				inputType="containerType"
// 				isDisabled={false}
// 				label="Container Type"
// 				value={props.containerType}
// 				setValue={props.setContainerType}
// 				type="text"
// 				key="ContainerTypeInput"
// 			/>
// 			<AnimatedInputs
// 				inputType="condition"
// 				isDisabled={false}
// 				label="Condition"
// 				value={props.condition}
// 				setValue={props.setCondition}
// 				type="text"
// 				key="ConditionInput"
// 			/>
// 			<AnimatedInputs
// 				inputType="city"
// 				isDisabled={false}
// 				label="City"
// 				value={props.city}
// 				setValue={props.setCity}
// 				type="text"
// 				key="CityInput"
// 			/>
// 		</>
// 	);
// };

export default Filter;
