import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";

const Trucking = () => {
	return (
		<div className={headerBackClass}>
			<HeaderWithBack text="Trucking" route="/supplier/add" />
		</div>
	);
};

export default Trucking;
