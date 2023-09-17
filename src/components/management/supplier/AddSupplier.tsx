import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { CustomerType } from "@/constants/objects";
import { headerBackClass } from "@/constants/reusable-class";
import { Link, Outlet } from "react-router-dom";

const AddSupplier = () => {
	return (
		<div className={`${headerBackClass}`}>
			<HeaderWithBack text="Add Supplier" route="/supplier" />
			<div className="py-2 mt-12 px-6 lg:w-full">
				<p className="text-sm py-2">Select customer type</p>
				<hr />
				<ul className="space-y-0 lg:flex lg:space-y-0 lg:gap-x-4 flex-col">
					{CustomerType.map((value, index) => (
						<li key={index}>
							<Link
								to={`/supplier/add/${value.route}`}
								className="flex flex-col min-h-16 justify-center pb-0 border-b-black border-opacity-20 border-b-[1px] w-full">
								<h3 className="font-bold text-primary">{value.title}</h3>
								<p className="font-thin text-xs">{value.description}</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<Outlet />
		</div>
	);
};

export default AddSupplier;
