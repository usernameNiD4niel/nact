import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerClass } from "@/constants/reusable-class";
const Shipping = () => {
	return (
		<div className={headerClass}>
			<HeaderWithBack text="Shipping" route="/supplier/add" />
		</div>
	);
};

export default Shipping;
