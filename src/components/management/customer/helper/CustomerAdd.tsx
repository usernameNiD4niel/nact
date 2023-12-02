import HeaderWithBack from "@/components/reuseable/HeaderWithBack";
import { CustomerType } from "@/constants/objects";
import { headerBackClass } from "@/constants/reusable-class";
import { Link, Outlet } from "react-router-dom";

export default function CustomerAdd() {
	return (
		<div className={`${headerBackClass}`}>
			<HeaderWithBack text="Add Customer" />
			<div className="py-2 md:py-4 mt-16 px-6 md:mt-12 lg:w-full">
				<p className="text-sm py-2">Select customer type</p>
				<hr />
				<ul className="space-y-0 lg:flex lg:gap-x-4 flex-col">
					{CustomerType.map((value, index) => (
						<li key={index}>
							<Link
								to={`/customer/add/${value.route}`}
								className="flex flex-col py-2 justify-center border-b-black border-opacity-20 border-b-[1px] w-full">
								<h3 className="font-bold text-[#017DC3]">{value.title}</h3>
								<p className="font-thin text-xs">{value.description}</p>
							</Link>
						</li>
					))}
				</ul>
			</div>
			<Outlet />
		</div>
	);
}
