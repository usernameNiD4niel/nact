const SlidingForm = ({
	isOneCurrentSlide,
}: {
	isOneCurrentSlide: boolean;
}): JSX.Element => {
	return (
		<div className="flex justify-between items-center w-full gap-2">
			<Marker text="Personal Details" isActive={isOneCurrentSlide} />
			<Marker text="Account Details" isActive={!isOneCurrentSlide} />
		</div>
	);
};

const Marker = ({
	text,
	isActive,
}: {
	text: string;
	isActive: boolean;
}): JSX.Element => (
	<div className="flex w-full gap-1 items-center justify-center flex-col sm:flex-row">
		<div
			className={`w-4 h-4 rounded-[50%] flex items-center justify-center ${
				isActive ? "bg-[#017DC3]" : "bg-gray-500"
			}`}>
			<div
				className={`w-[6px] h-[6px] rounded-[50%] ${isActive && "bg-gray-50"}`}
			/>
		</div>
		<p
			className={`text-[17px] text-center ${
				isActive ? "text-[#017DC3] font-bold" : "text-gray-500 font-medium"
			}`}>
			{text}
		</p>
	</div>
);

export default SlidingForm;
