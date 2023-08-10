const DisplayErrorMessage = ({
	errorMessage,
}: {
	errorMessage: string;
}): JSX.Element => {
	return (
		<span className="text-red-500 text-xs font-semibold">{errorMessage}</span>
	);
};

export default DisplayErrorMessage;
