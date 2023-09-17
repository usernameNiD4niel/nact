// import AnimatedInputs from "./AnimatedInputs";
import { HiXMark } from "react-icons/hi2";
import FilterAccordion from "./FilterAccordion";
import { TableDataProps } from "@/constants/props";
import { FC } from "react";
import { motion } from "framer-motion";

type FilterProps = {
	setIsShowingFilter: React.Dispatch<React.SetStateAction<boolean>>;
	data: TableDataProps[];
};

function Filter({ data, setIsShowingFilter }: FilterProps) {
	const handleBackButton = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement;

		if (target.classList.contains("main-class")) {
			setIsShowingFilter((prev) => !prev);
			return;
		}
	};

	return (
		// <AnimatePresence>
		<motion.main
			initial={{ x: "100%" }}
			animate={{ x: 0 }}
			exit={{ x: "100%" }}
			transition={{ duration: 0.5, ease: "easeOut" }}
			className={`fixed z-30 w-full h-full flex cursor-pointer overflow-auto overflow-x-hidden main-class items-center justify-end top-0  bottom-0 right-0`}
			// className={`fixed z-30 w-full h-full flex cursor-pointer overflow-auto bg-black main-class bg-opacity-40 items-center justify-end top-0  bottom-0 right-0`}
			onClick={handleBackButton}>
			<motion.aside
				initial={{ x: "100%" }}
				animate={{ x: 0 }}
				exit={{ x: "100%" }}
				transition={{ duration: 0.5, ease: "easeOut" }}
				className="h-full w-[70%] sm:w-[40%] md:w-[30%] bg-white cursor-auto pt-2">
				<form className="w-full flex flex-col gap-y-4 bg-white">
					<div className="flex justify-between items-center mx-4 mt-3">
						<button
							type="button"
							className="flex gap-x-2 md:text-lg w-fit"
							onClick={() => setIsShowingFilter(false)}>
							Filters
						</button>
						<button
							type="button"
							className="md:text-lg"
							onClick={() => setIsShowingFilter(false)}>
							<HiXMark />
						</button>
					</div>
					<hr />
					{data.map((item) => (
						<>
							<FilterAccordionHelper
								accordionItems={item.tableData}
								title={item.columnTitle}
								key={item.id}
							/>
							<hr />
						</>
					))}
				</form>
			</motion.aside>
		</motion.main>
		// </AnimatePresence>
	);
}

type FilterAccordionHelperProps = {
	title: string;
	accordionItems: string[] | null;
};

const FilterAccordionHelper: FC<FilterAccordionHelperProps> = ({
	accordionItems,
	title,
}) => {
	return (
		<FilterAccordion accordionItems={accordionItems} accordionText={title} />
	);
};

export default Filter;
