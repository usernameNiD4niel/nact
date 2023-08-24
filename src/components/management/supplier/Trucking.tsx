import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerClass } from "@/constants/reusable-class";

const Trucking = () => {
	return (
		<div className={headerClass}>
			<HeaderWithBack text="Trucking" route="/supplier/add" />
		</div>
	);
};

export default Trucking;
