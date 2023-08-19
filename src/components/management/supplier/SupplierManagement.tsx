import { ButtonList } from "@/constants/enums";
import { SupplierManagementProps } from "@/constants/props";
import { useSelectedStore } from "@/utils/HomePageState";
import React, { useEffect } from "react";
import { GrAddCircle } from "react-icons/gr";

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
			<div className="w-full flex text-white py-2">
				<button className="flex-1 text-center pb-3 border-b-2 border-b-primary text-primary font-bold">
					List
				</button>
				<button className="flex-1 text-center pb-3 text-slate-600">
					Analytics
				</button>
			</div>
			<div className="w-full flex justify-end items-center py-4 pr-2">
				<button className="flex gap-x-2 items-center justify-center text-primary text-sm">
					<span className="text-blue-600 text-xl">
						<GrAddCircle />
					</span>
					SUPPLIER
				</button>
			</div>
			<CardSupplierManagement />
		</section>
	);
};

const CardSupplierManagement = () => {
	return (
		<div className="flex p-2 items-center flex-col w-full gap-y-6">
			{SupplierManagementProps.map((value, index) => (
				<div className="flex justify-between w-full items-center " key={index}>
					<div className="flex gap-y-1 flex-col justify-center">
						<h3 className="font-bold text-lg">{value.title}</h3>
						<p className="text-sm font-thin">{value.subtitle}</p>
					</div>
					<p className="text-sm font-thin">{value.phoneNumber}</p>
				</div>
			))}
		</div>
	);
};

export default SupplierManagement;
