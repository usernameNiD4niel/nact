import { FC, useState } from "react";
import { HiOutlineChevronDown, HiOutlineChevronUp } from "react-icons/hi2";
import { AnimatePresence, motion } from "framer-motion";

type FilterAccordionType = {
	accordionText: string;
	accordionItems: string[] | null;
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
				<span className="font-medium text-sm">{accordionText}</span>
				<span className="text-sm group-hover:text-opacity-100 text-black text-opacity-30 transition duration-300 ease-in-out">
					{!isAccordionOpen ? <HiOutlineChevronDown /> : <HiOutlineChevronUp />}
				</span>
			</button>
			<AnimatePresence>
				{isAccordionOpen && (
					<motion.ul
						initial={{ opacity: 0, height: 0 }}
						animate={{ opacity: 1, height: "auto" }}
						className={`flex flex-col gap-y-1 mt-2`}
						exit={{ opacity: 0, height: 0 }}>
						{accordionItems ? (
							<>
								{accordionItems.map((item, index) => (
									<motion.li
										key={index}
										initial={{ opacity: 0, y: -10 }}
										animate={{ opacity: 1, y: 0 }}
										exit={{ opacity: 0, y: -10 }}>
										<label className="flex items-center text-xs gap-x-2 opacity-75 hover:cursor-pointer mx-1 my-2">
											<input type="checkbox" name={item} />
											{item}
										</label>
									</motion.li>
								))}
							</>
						) : (
							<motion.li
								key="no-data"
								initial={{ opacity: 0, y: -10 }}
								animate={{ opacity: 1, y: 0 }}
								exit={{ opacity: 0, y: -10 }}>
								<p>No data found for {accordionText}</p>
							</motion.li>
						)}
					</motion.ul>
				)}
			</AnimatePresence>
			{/* <ul
				className={`${
					isAccordionOpen ? "flex" : "hidden"
				} flex-col gap-y-1 mt-2`}>
				{accordionItems ? (
					<>
						{accordionItems.map((item, index) => (
							<li key={index}>
								<label className="flex items-center text-xs gap-x-2 opacity-75 hover:cursor-pointer mx-1 my-2">
									<input type="checkbox" name={item} />
									{item}
								</label>
							</li>
						))}
					</>
				) : (
					<li>
						<p>No data found for {accordionText}</p>
					</li>
				)}
			</ul> */}
		</div>
	);
};

export default FilterAccordion;
