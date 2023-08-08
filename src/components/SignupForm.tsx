import { useRef, useState } from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import PersonalDetail from "./PersonalDetail";
import SlidingForm from "./SlidingForm";
import {
	animatedInputClass,
	animatedSpanClassHigh,
} from "../constants/reusable-class";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import CustomDropdown from "./CustomDropdown";
import {
	AccountDetailProps,
	PersonalDetailProps,
	User,
} from "../constants/props";
import AccountDetail from "./AccountDetail";
import { POST } from "../api/register";

const SignupForm = () => {
	// Form fields - Personal Detail
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState<Date | null>(null);
	const [gender, setGender] = useState("Male");

	// Form fields - Account Detail
	const [mobileNumber, setMobileNumber] = useState("");
	const [confirmPin, setConfirmPin] = useState("");
	const [pin, setPin] = useState("");
	const [recoveryQuestion, setRecoveryQuestion] = useState("");
	const [recoveryAnswer, setRecoveryAnswer] = useState("");

	const [response, setResponse] = useState<User | null>(null);

	const personalDetailData: PersonalDetailProps = {
		firstName,
		lastName,
		middleName,
		setFirstName,
		setLastName,
		setMiddleName,
	};

	const accountDetailData: AccountDetailProps = {
		confirmPin,
		mobileNumber,
		pin,
		recoveryAnswer,
		recoveryQuestion,
		setConfirmPin,
		setMobileNumber,
		setPin,
		setRecoveryAnswer,
		setRecoveryQuestion,
	};

	// Active slide tracker
	const [isOneCurrentSlide, setIsOneCurrentSlide] = useState(true);

	const datePickerRef = useRef<ReactDatePicker<never, undefined>>(null);
	const submitRef = useRef<HTMLButtonElement | null>(null);

	const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		// Validate the form using Zod
		if (submitRef.current?.textContent?.trim() === "Submit") {
			await POST({
				mobileNumber,
				pin,
				recoveryAnswer,
				recoveryQuestion,
				birthDate,
				firstName,
				gender,
				lastName,
				middleName,
				setResponse,
			});
		}
		setIsOneCurrentSlide(false);
	};

	const handlePrevious = () => setIsOneCurrentSlide(true);

	return (
		<form
			className={`w-full px-5 space-y-6`}
			onSubmit={handleFormSubmit}
			key="signUpForm">
			<SlidingForm
				isOneCurrentSlide={isOneCurrentSlide}
				key="signUpFormSlidingForm"
			/>
			{!isOneCurrentSlide ? (
				<div className="w-full space-y-2" key="signUpFormAccountDetail">
					<AccountDetail {...accountDetailData} />
				</div>
			) : (
				<div className={`w-full flex flex-col gap-4`}>
					<PersonalDetail
						key="signUpFormPersonalDetails"
						{...personalDetailData}
					/>
					<div className=" relative">
						<label htmlFor="birthdate" className={`relative`}>
							<DatePicker
								className={`${animatedInputClass} relative`}
								ref={datePickerRef}
								selected={birthDate}
								calendarClassName="absolute top-[250px] md:left-[200px] left-0"
								required
								onChange={(date) => {
									if (date === null) {
										setBirthDate(date);
									}
								}}
							/>
							<div
								className="absolute right-2 top-1 text-[#017DC3] z-0 cursor-pointer"
								onClick={() => datePickerRef.current?.setOpen(true)}>
								<BsFillCalendarPlusFill />
							</div>
							<span
								className={`${animatedSpanClassHigh} ${
									birthDate && "input-contains"
								}`}>
								Birth Date
							</span>
						</label>
					</div>
					<CustomDropdown gender={gender} setGender={setGender} />
				</div>
			)}

			<div className="flex w-full justify-between py-2 items-center">
				<button
					type="button"
					onClick={handlePrevious}
					className="flex items-center justify-center gap-4 px-3 py-2 ring-1 ring-[#017DC3] text-[#017DC3] text-center rounded-lg font-bold">
					<AiOutlineArrowLeft />
					Previous
				</button>

				<button
					type="submit"
					ref={submitRef}
					className="flex items-center justify-center gap-4 px-4 ring-1 ring-[#017DC3] py-2 bg-[#017DC3] text-white text-center rounded-lg font-bold">
					{isOneCurrentSlide ? "Next" : "Submit"} <AiOutlineArrowRight />
				</button>
			</div>
			<div className="w-[70vw] h-[70vh] z-50 bg-slate-400">
				<h1 className="font-bold text-3xl">Successfully Failed!</h1>
				<pre>{JSON.stringify(response, null, 2)}</pre>
			</div>
		</form>
	);
};

export default SignupForm;
