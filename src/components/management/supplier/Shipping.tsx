import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";

const Shipping = () => {
	return (
		<div className={headerBackClass}>
			<HeaderWithBack text="Shipping" route="/supplier/add" />
		</div>
	);
};

export default Shipping;
