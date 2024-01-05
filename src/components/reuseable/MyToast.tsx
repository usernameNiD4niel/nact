interface MyToastProps {
	title: string;
	description: string;
	isVisible: boolean;
	closeToast: () => void;
}

export default function MyToast({
	description,
	title,
	closeToast,
	isVisible,
}: MyToastProps) {
	if (!isVisible) return null;

	return (
		<div
			style={{
				position: "absolute",
				bottom: "20px",
				right: "20px",
				backgroundColor: "grey",
				padding: "20px",
				borderRadius: "5px",
			}}>
			<strong>{title}</strong>
			<p>{description}</p>
			<button onClick={closeToast}>Close</button>
		</div>
	);
}
