import { ButtonList } from "@/constants/enums";
import { SupplierManagementProps } from "@/constants/props";
import { useSelectedStore } from "@/utils/HomePageState";
import { useEffect } from "react";
import { IoAdd } from "react-icons/io5";
import { Link, Outlet } from "react-router-dom";

const SupplierManagement = () => {
	const [selected, setSelected] = useSelectedStore((state) => [
		state.selected,
		state.setSelected,
	]);

	useEffect(() => {
		if (selected !== ButtonList.Supplier) {
			setSelected(ButtonList.Supplier);
		}
	}, []);
	return (
		<section className="w-full flex flex-col">
			<div className="w-full flex text-white py-2 text-sm">
				<button className="flex-1 text-center pb-3 border-b-2 border-b-primary text-primary font-bold">
					List
				</button>
				<button className="flex-1 text-center pb-3 text-slate-600">
					Analytics
				</button>
			</div>
			<div className="fixed bottom-2 right-4 md:right-6 md:bottom-4 drop-shadow-lg">
				<Link
					to="/supplier/add"
					className="flex gap-x-2 w-14 h-14 md:w-auto md:h-auto md:py-3 md:px-6 rounded-full bg-primary items-center justify-center text-white text-sm right-0">
					<span className="text-white text-2xl">
						<IoAdd />
					</span>
					<span className="hidden md:block">SUPPLIER</span>
				</Link>
			</div>
			<CardSupplierManagement />
			<Outlet />
		</section>
	);
};

const CardSupplierManagement = () => {
	return (
		<div className="flex py-2 px-5 items-center flex-col w-full gap-y-2">
			{SupplierManagementProps.map((value, index) => (
				<div
					className="flex p-4 justify-between w-full items-center border border-3 border-black border-opacity-20 rounded-md"
					key={index}>
					<div className="flex gap-y-1 flex-col justify-center">
						<h3 className="font-bold text-sm text-primary">{value.title}</h3>
						<p className="text-xs font-thin">{value.subtitle}</p>
					</div>
					<p className="font-thin text-xs">{value.phoneNumber}</p>
				</div>
			))}
		</div>
	);
};

export default SupplierManagement;
