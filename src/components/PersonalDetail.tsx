import "../index.css";
import {
	animatedInputClass,
	animatedSpanClass,
} from "../constants/reusable-class";
import { PersonalDetailDatatypes } from "../constants/props";
import { useRef, useState } from "react";
import "../../styles/no-input-default.css";
import "../../styles/remove-calendar-icon.css";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonalDetailSchema } from "../models/Signup";
import { useForm } from "react-hook-form";
import CustomDropdown from "./CustomDropdown";
import { usePersonalDetailStore } from "../utils/personal-detail";
import DisplayErrorMessage from "./DisplayErrorMessage";
import { HiOutlineArrowRight, HiOutlineCalendarDays } from "react-icons/hi2";

type PersonalDetailProps = {
	setIsOneCurrentSlide: React.Dispatch<React.SetStateAction<boolean>>;
};

const PersonalDetail = ({ setIsOneCurrentSlide }: PersonalDetailProps) => {
	const [
		firstName,
		lastName,
		middleInitial,
		birthDate,
		gender,
		setFirstName,
		setLastName,
		setMiddleInitial,
		setBirthDate,
		setGender,
	] = usePersonalDetailStore((state) => [
		state.firstName,
		state.lastName,
		state.middleInitial,
		state.birthDate,
		state.gender,
		state.setFirstName,
		state.setLastName,
		state.setMiddleInitial,
		state.setBirthDate,
		state.setGender,
	]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<PersonalDetailDatatypes>({
		resolver: zodResolver(PersonalDetailSchema),
	});

	const [hasBirthDateError, setHasBirthDateError] = useState(false);
	const [hasGenderError, setHasGenderError] = useState(false);

	const birthdateRef = useRef<HTMLInputElement | null>(null);

	const handleBirthDateClick = () => {
		birthdateRef.current?.showPicker();
	};

	const handleFormSubmit = (data: PersonalDetailDatatypes) => {
		if (!data.firstName) {
			console.log(data.firstName);
			return;
		}

		if (!birthDate) {
			setHasBirthDateError(true);
			return;
		} else {
			setHasBirthDateError(false);
		}

		if (!gender) {
			setHasGenderError(true);
			return;
		} else {
			setHasGenderError(false);
		}

		setIsOneCurrentSlide(false);
		console.log(data);
	};

	return (
		<form
			className={`w-full flex flex-col gap-4 px-4`}
			onSubmit={handleSubmit(handleFormSubmit)}>
			<label className="relative" htmlFor="firstName">
				<input
					{...register("firstName")}
					type="text"
					className={animatedInputClass}
					id="firstName"
					autoComplete="no"
					name="firstName"
					value={firstName}
					onChange={(e) => setFirstName(e.target.value)}
					required
				/>
				<span
					className={`${animatedSpanClass} ${firstName && "input-contains"}`}>
					First Name
				</span>
				{errors?.firstName && (
					<DisplayErrorMessage errorMessage={`${errors?.firstName?.message}`} />
				)}
			</label>
			<label className="relative" htmlFor="middleInitial">
				<input
					{...register("middleInitial")}
					type="text"
					className={animatedInputClass}
					autoComplete="no"
					id="middleInitial"
					name="middleInitial"
					value={middleInitial}
					onChange={(e) => setMiddleInitial(e.target.value)}
					required
				/>
				<span
					className={`${animatedSpanClass} ${
						middleInitial && "input-contains"
					}`}>
					Middle Initial
				</span>
				{errors?.middleInitial && (
					<DisplayErrorMessage
						errorMessage={`${errors?.middleInitial?.message}`}
					/>
				)}
			</label>
			<label className="relative" htmlFor="lastName">
				<input
					type="text"
					className={animatedInputClass}
					id="lastName"
					value={lastName}
					{...register("lastName")}
					name="lastName"
					autoComplete="no"
					onChange={(e) => setLastName(e.target.value)}
					required
				/>
				<span
					className={`${animatedSpanClass} ${lastName && "input-contains"}`}>
					Last Name
				</span>
				{errors?.lastName && (
					<DisplayErrorMessage errorMessage={`${errors?.lastName?.message}`} />
				)}
			</label>
			<label className="relative rounded-lg" htmlFor="birthDate">
				<input
					type="date"
					className={`hover:cursor-pointer ${animatedInputClass}`}
					ref={birthdateRef}
					id="birthDate"
					value={birthDate}
					autoComplete="no"
					onFocus={() => handleBirthDateClick()}
					onChange={(e) => setBirthDate(e.target.value)}
					name="birthDate"
					required
				/>
				<button
					type="button"
					className="absolute w-10 h-8 flex items-center justify-center bg-white md:bg-gray-50 z-50 right-[2px] top-2 text-black hover:text-primary"
					onClick={handleBirthDateClick}>
					<HiOutlineCalendarDays />
				</button>
				<span
					className={`${animatedSpanClass} ${birthDate && "input-contains"}`}>
					Birth Date
				</span>
				<button
					type="button"
					className="absolute right-4 top-4 z-100 text-black opacity-90 bg-white md:bg-gray-500 hover:text-[#017DC3] hover:opacity-100"
					onClick={handleBirthDateClick}>
					<HiOutlineCalendarDays />
				</button>
				{hasBirthDateError && (
					<DisplayErrorMessage errorMessage="Please enter your birth date first" />
				)}
			</label>

			<CustomDropdown
				gender={gender}
				setGender={setGender}
				hasGenderError={hasGenderError}
			/>

			<button
				type="submit"
				className="flex items-center justify-center w-full gap-4 px-4 ring-1 ring-[#017DC3] py-2 bg-[#017DC3] text-white text-center rounded-lg font-bold">
				Next <HiOutlineArrowRight />
			</button>
		</form>
	);
};

export default PersonalDetail;
