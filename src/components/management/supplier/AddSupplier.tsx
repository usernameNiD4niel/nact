import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { CustomerType } from "@/constants/objects";
import { headerBackClass } from "@/constants/reusable-class";
import { Link, Outlet } from "react-router-dom";

const AddSupplier = () => {
	return (
		<div className={`${headerBackClass}`}>
			<HeaderWithBack text="Add Supplier" route="/supplier" />
			<div className="py-2 px-4">
				<p className="text-sm py-2">Select customer type</p>
				<hr />
				<ul className="space-y-2">
					{CustomerType.map((value, index) => (
						<li
							key={index}
							className="py-2 border-[1px] border-black border-opacity-30 rounded-md px-3 hover:cursor-pointer transition-all duration-300 ease-in-out group hover:bg-primary">
							<Link to={`/supplier/add/${value.route}`}>
								<h3 className="font-bold text-primary group-hover:text-white transition-all duration-300 ease-in-out">
									{value.title}
								</h3>
								<p className="font-thin text-xs group-hover:text-white transition-all duration-300 ease-in-out">
									{value.description}
								</p>
								{/* <hr className="mt-2" /> */}
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
