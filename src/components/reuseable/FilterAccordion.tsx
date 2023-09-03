import { FC, useState } from "react";
import { HiMinus, HiPlus } from "react-icons/hi2";

type FilterAccordionType = {
	accordionText: string;
	accordionItems: string[];
};

const FilterAccordion: FC<FilterAccordionType> = ({
	accordionText,
	accordionItems,
}) => {
	const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false);

	const handleAccordion = () => {
		setIsAccordionOpen((prevState) => !prevState);
	};

	return (
		<div className="px-4">
			<button
				className={`flex w-full justify-between items-center group`}
				type="button"
				onClick={handleAccordion}>
				<span>{accordionText}</span>
				<span className="text-xl group-hover:text-opacity-100 text-black text-opacity-30 transition duration-300 ease-in-out">
					{!isAccordionOpen ? <HiPlus /> : <HiMinus />}
				</span>
			</button>
			<ul
				className={`${
					isAccordionOpen ? "flex" : "hidden"
				} flex-col gap-y-2 mt-2`}>
				{accordionItems.map((item, index) => (
					<li key={index}>
						<label className="flex items-center gap-x-2 hover:cursor-pointer">
							<input type="checkbox" name={item} />
							{item}
						</label>
					</li>
				))}
			</ul>
		</div>
	);
};

export default FilterAccordion;
