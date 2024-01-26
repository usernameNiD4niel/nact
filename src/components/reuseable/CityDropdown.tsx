"use client";

import * as React from "react";

import { useMediaQuery } from "@/hooks/useMediaQuery";
import { Button } from "@/components/ui/button";
import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from "@/components/ui/command";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { animatedInputClass } from "@/constants/reusable-class";
import AddLocationForm from "./AddLocationForm";

interface ComboBoxResponsiveProps {
	cities: string[];
	handleCitySelection: (city: string) => void;
	isDisabled: boolean;
	defaultValue?: string;
}

export default function ComboBoxResponsive({
	cities,
	handleCitySelection,
	defaultValue,
	isDisabled,
}: ComboBoxResponsiveProps) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [city, setCity] = React.useState<string>("");

	React.useEffect(() => {
		if (city && city.length > 0) {
			handleCitySelection(city);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [city]);

	React.useEffect(() => {
		if (defaultValue) {
			setCity(defaultValue);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isDesktop) {
		return (
			<>
				<Popover open={open} onOpenChange={setOpen}>
					<PopoverTrigger asChild>
						<Button
							variant="outline"
							// className="w-full justify-start"
							className={cn("disabled:bg-gray-200", animatedInputClass)}
							disabled={isDisabled}>
							<span className="w-full text-start">
								{city ? <>{city}</> : <>City</>}
							</span>
						</Button>
					</PopoverTrigger>
					<PopoverContent className="w-[200px] p-0" align="start">
						<CityList setOpen={setOpen} setCity={setCity} cities={cities} />
					</PopoverContent>
				</Popover>
				{/* {isModalOpen && <AddLocationForm />} */}
			</>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button
					variant="outline"
					// className="w-full justify-start"
					className={cn("disabled:bg-gray-200", animatedInputClass)}
					disabled={isDisabled}>
					<span className="w-full text-start">
						{city ? <>{city}</> : <>{defaultValue ? defaultValue : "City"}</>}
					</span>
				</Button>
			</DrawerTrigger>
			<DrawerContent>
				<div className="mt-4 border-t">
					<CityList setOpen={setOpen} setCity={setCity} cities={cities} />
				</div>
			</DrawerContent>
		</Drawer>
	);
}

function CityList({
	setOpen,
	setCity,
	cities,
}: {
	setOpen: (open: boolean) => void;
	setCity: (city: string) => void;
	cities: string[];
}) {
	return (
		<Command>
			<CommandInput placeholder="Filter city..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					<CommandItem
						key={"add-item"}
						value={""}
						className="p-0 text-blue-500 cursor-pointer">
						<AddLocationForm />
					</CommandItem>
					{cities.map((city) => (
						<CommandItem
							key={city}
							value={city}
							onSelect={(value) => {
								setCity(
									cities.find((city) => city.toLowerCase() === value) || "",
								);
								setOpen(false);
								console.log(`city value: ${value}`);
								console.log(`city: ${city}`);
							}}>
							{city}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
