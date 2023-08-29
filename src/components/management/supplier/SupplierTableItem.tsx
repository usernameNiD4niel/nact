import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { headerBackClass } from "@/constants/reusable-class";
import { useLocation } from "react-router-dom";

export const SupplierTableItem = () => {
	const location = useLocation();

	const data = location.state;

	if (!data) {
		return <h1>No Data found!</h1>;
	}

	return (
		<div className={headerBackClass}>
			<HeaderWithBack text={`Update ${data.title}`} route="/supplier" />
			<div className="py-2 mt-12 px-4 lg:w-full">
				<div className="flex items-center justify-between">
					<h3 className="font-bold textsm">Business Information</h3>
					<div className="flex items-center gap-x-2">
						<button>DELETE</button>
						<button>EDIT</button>
					</div>
				</div>
			</div>
		</div>
	);
};
