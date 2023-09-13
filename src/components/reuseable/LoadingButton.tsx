const LoadingButton = () => {
	return (
		<button
			type="button"
			disabled
			className="flex items-center gap-x-2 text-primary">
			<span className="loading loading-spinner loading-sm"></span>
			Loading...
		</button>
	);
};

export default LoadingButton;
