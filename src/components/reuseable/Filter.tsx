import { FC, useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import AnimatedInputs from "./AnimatedInputs";

type FilterProps = {
	setIsFilterShowing: React.Dispatch<React.SetStateAction<boolean>>;
	isInventory?: boolean;
};

const Inventory = () => {
	const [productName, setProductName] = useState<string>("");
	const [city, setCity] = useState<string>("");
	const [state, setState] = useState<string>("");
	const [quantity, setQuantity] = useState<string>("");
	const [depot, setDepot] = useState<string>("");
	const [price, setPrice] = useState<string>("");

	const fieldsInput: InputFieldsTypes = {
		city,
		depot,
		price,
		productName,
		quantity,
		setCity,
		setDepot,
		setPrice,
		setProductName,
		setQuantity,
		setState,
		state,
	};

	return <DisplayInputs {...fieldsInput} />;
};

const SupplierManagement = () => {
	const [supplier, setSupplier] = useState<string>("");
	const [location, setLocation] = useState<string>("");
	const [abcde, setAbcde] = useState<string>("");
	const [contact, setContact] = useState<string>("");

	const fieldsInput: SupplierManagementTypes = {
		abcde,
		contact,
		location,
		setAbcde,
		setContact,
		setLocation,
		setSupplier,
		supplier,
	};

	return <DisplaySupplierManagementInputs {...fieldsInput} />;
};

const Filter: FC<FilterProps> = ({ setIsFilterShowing, isInventory }) => {
	const handleBackButton = (event: React.MouseEvent) => {
		const target = event.target as HTMLElement;

		if (target.classList.contains("main-class")) {
			setIsFilterShowing((prev) => !prev);
			return;
		}
	};

	let inputs: JSX.Element;

	if (isInventory) {
		inputs = <Inventory />;
	} else {
		inputs = <SupplierManagement />;
	}

	return (
		<main
			className="absolute z-30 w-[100%] h-[100%] cursor-pointer overflow-hidden bg-black main-class bg-opacity-40 flex items-center justify-end top-0 right-0"
			onClick={handleBackButton}>
			<aside className="h-full w-[70%] sm:w-[40%] md:w-[30%] bg-white cursor-auto">
				<form className="w-full flex p-5 flex-col h-full gap-y-4">
					<button
						type="button"
						className="flex gap-x-2 text-2xl text-primary w-fit"
						onClick={() => setIsFilterShowing(false)}>
						<IoIosArrowBack />
						<span className="font-bold text-sm md:text-base">Filter</span>
					</button>
					{inputs}
					<button className="text-center rounded px-3 py-2 bg-primary text-white">
						Search
					</button>
				</form>
			</aside>
		</main>
	);
};

type SupplierManagementTypes = {
	supplier: string;
	location: string;
	abcde: string;
	contact: string;
	setSupplier: React.Dispatch<React.SetStateAction<string>>;
	setLocation: React.Dispatch<React.SetStateAction<string>>;
	setAbcde: React.Dispatch<React.SetStateAction<string>>;
	setContact: React.Dispatch<React.SetStateAction<string>>;
};

const DisplaySupplierManagementInputs: FC<SupplierManagementTypes> = ({
	abcde,
	contact,
	location,
	supplier,
	setAbcde,
	setContact,
	setLocation,
	setSupplier,
}) => {
	return (
		<>
			<AnimatedInputs
				isDisabled={false}
				inputType="supplier"
				label="Supplier"
				setValue={setSupplier}
				type="text"
				value={supplier}
				key="SupplierKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				inputType="location"
				label="Location"
				setValue={setLocation}
				type="text"
				value={location}
				key="LocationKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				inputType="abcde"
				label="Abcde"
				setValue={setAbcde}
				type="text"
				value={abcde}
				key="AbcdeKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				inputType="contact"
				label="Contact"
				setValue={setContact}
				type="text"
				value={contact}
				key="ContactKey"
			/>
		</>
	);
};

type InputFieldsTypes = {
	productName: string;
	setProductName: React.Dispatch<React.SetStateAction<string>>;
	city: string;
	setCity: React.Dispatch<React.SetStateAction<string>>;
	state: string;
	setState: React.Dispatch<React.SetStateAction<string>>;
	quantity: string;
	setQuantity: React.Dispatch<React.SetStateAction<string>>;
	depot: string;
	setDepot: React.Dispatch<React.SetStateAction<string>>;
	price: string;
	setPrice: React.Dispatch<React.SetStateAction<string>>;
};

const DisplayInputs: FC<InputFieldsTypes> = ({
	city,
	depot,
	price,
	productName,
	quantity,
	setCity,
	setDepot,
	setPrice,
	setProductName,
	setQuantity,
	setState,
	state,
}) => {
	return (
		<>
			<AnimatedInputs
				isDisabled={false}
				inputType="productName"
				label="Product Name"
				setValue={setProductName}
				type="text"
				value={productName}
				key="ProductNameKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				inputType="city"
				label="City"
				setValue={setCity}
				type="text"
				value={city}
				key="CityKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				inputType="state"
				label="State"
				setValue={setState}
				type="text"
				value={state}
				key="StateKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				inputType="quantity"
				label="Quantity"
				setValue={setQuantity}
				type="text"
				value={quantity}
				key="QuantityKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				inputType="depot"
				label="Depot"
				setValue={setDepot}
				type="text"
				value={depot}
				key="DepotKey"
			/>
			<AnimatedInputs
				isDisabled={false}
				inputType="price"
				label="Price"
				setValue={setPrice}
				type="text"
				value={price}
				key="PriceKey"
			/>
		</>
	);
};

export default Filter;
