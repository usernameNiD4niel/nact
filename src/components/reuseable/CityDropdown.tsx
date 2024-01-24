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

interface ComboBoxResponsiveProps {
	cities: string[];
}

export default function ComboBoxResponsive({
	cities,
}: ComboBoxResponsiveProps) {
	const [open, setOpen] = React.useState(false);
	const isDesktop = useMediaQuery("(min-width: 768px)");
	const [city, setCity] = React.useState<string>("");

	if (isDesktop) {
		return (
			<Popover open={open} onOpenChange={setOpen}>
				<PopoverTrigger asChild>
					<Button variant="outline" className="w-[150px] justify-start">
						{city ? <>{city}</> : <>City</>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-[200px] p-0" align="start">
					<CityList setOpen={setOpen} setCity={setCity} cities={cities} />
				</PopoverContent>
			</Popover>
		);
	}

	return (
		<Drawer open={open} onOpenChange={setOpen}>
			<DrawerTrigger asChild>
				<Button variant="outline" className="w-[150px] justify-start">
					{city ? <>{city}</> : <>+ Set status</>}
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
			<CommandInput placeholder="Filter status..." />
			<CommandList>
				<CommandEmpty>No results found.</CommandEmpty>
				<CommandGroup>
					{cities.map((city) => (
						<CommandItem
							key={city}
							value={city}
							onSelect={(value) => {
								setCity(cities.find((city) => city === value) || "");
								setOpen(false);
							}}>
							{city}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</Command>
	);
}
