import { createLocation } from "@/api/locations";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Locations } from "@/constants/props";
import { useState } from "react";
import { IoMdAddCircle } from "react-icons/io";
import { toast } from "../ui/use-toast";

export default function AddLocationForm() {
	const [city, setCity] = useState("");
	const [state, setState] = useState("");
	const [country, setCountry] = useState("");
	const [region, setRegion] = useState("");

	function showErrorMessage(message: string) {
		toast({
			title: "Validation Failed",
			description: message,
		});
	}

	function resetFields() {
		setCity("");
		setCountry("");
		setState("");
		setRegion("");
	}

	async function handleAddLocation() {
		if (!city) {
			showErrorMessage("Please enter a city");
			return;
		}

		if (!state) {
			showErrorMessage("Please enter a state");
			return;
		}

		if (!country) {
			showErrorMessage("Please enter a country");
			return;
		}

		if (!region) {
			showErrorMessage("Please enter a region");
			return;
		}

		const location: Locations = {
			city,
			country,
			id: "",
			region,
			state,
		};
		const { message, success } = await createLocation(location);

		if (success) {
			resetFields();
			toast({
				title: "Created Successfully",
				description: message,
			});
		} else {
			toast({
				title: "Failed to Create",
				description: message,
			});
		}
	}
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant="noVariant"
					className="w-full p-0 m-0 hover:bg-slate-200">
					<p className="w-full text-start flex gap-x-1 px-2 items-center">
						<span>
							<IoMdAddCircle />
						</span>
						<span>Add New</span>
					</p>
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Add New Location</DialogTitle>
					<DialogDescription>
						Please fill out the form correctly and submit.
					</DialogDescription>
				</DialogHeader>
				<div className="grid gap-4 py-4">
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="city" className="text-right">
							City
						</Label>
						<Input
							id="city"
							className="col-span-3"
							value={city}
							onChange={(e) => setCity(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="state" className="text-right">
							State
						</Label>
						<Input
							id="state"
							className="col-span-3"
							value={state}
							onChange={(e) => setState(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="country" className="text-right">
							Country
						</Label>
						<Input
							id="country"
							className="col-span-3"
							value={country}
							onChange={(e) => setCountry(e.target.value)}
						/>
					</div>
					<div className="grid grid-cols-4 items-center gap-4">
						<Label htmlFor="region" className="text-right">
							Region
						</Label>
						<Input
							id="region"
							className="col-span-3"
							value={region}
							onChange={(e) => setRegion(e.target.value)}
						/>
					</div>
					{/* //! cannot use form because its already inside a form */}
					<Button type="button" className="mt-3" onClick={handleAddLocation}>
						Save changes
					</Button>
					<DialogClose>Cancel</DialogClose>
				</div>
			</DialogContent>
		</Dialog>
	);
}
