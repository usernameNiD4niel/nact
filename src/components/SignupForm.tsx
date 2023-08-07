import { useRef, useState } from "react";
import DatePicker, { ReactDatePicker } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AiOutlineArrowRight, AiOutlineArrowLeft } from "react-icons/ai";
import PersonalDetail from "./PersonalDetail";
import SlidingForm from "./SlidingForm";
import { inputClass } from "../../constants/reusable-class";
import { BsFillCalendarPlusFill } from "react-icons/bs";
import CustomDropdown from "./CustomDropdown";
import { AccountDetailProps, PersonalDetailProps } from "../../constants/props";
import AccountDetail from "./AccountDetail";
import { POST } from "../api/register";

const SignupForm = () => {
	// Form fields - Personal Detail
	const [firstName, setFirstName] = useState("");
	const [middleName, setMiddleName] = useState("");
	const [lastName, setLastName] = useState("");
	const [birthDate, setBirthDate] = useState(new Date());
	const [gender, setGender] = useState("Male");

	// Form fields - Account Detail
	const [mobileNumber, setMobileNumber] = useState("");
	const [confirmPin, setConfirmPin] = useState("");
	const [pin, setPin] = useState("");
	const [recoveryQuestion, setRecoveryQuestion] = useState("");
	const [recoveryAnswer, setRecoveryAnswer] = useState("");

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
			const data = await POST({
				mobileNumber,
				pin,
				recoveryAnswer,
				recoveryQuestion,
			});
			if (data) {
				alert("success!");
			} else {
				alert("failed!");
			}
			return;
		}
		setIsOneCurrentSlide(false);
	};

	const handlePrevious = () => setIsOneCurrentSlide(true);

	return (
		<form
			className={`w-full px-5 space-y-2`}
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
				<div className={`w-full space-y-2`}>
					<PersonalDetail
						key="signUpFormPersonalDetails"
						{...personalDetailData}
					/>
					<div className=" relative w-fit">
						<DatePicker
							className={`${inputClass}`}
							ref={datePickerRef}
							selected={birthDate}
							children={<h1 className="font-bold">hello</h1>}
							required
							onChange={(date) => {
								if (date) {
									setBirthDate(date);
								}
							}}
						/>
						<div
							className="absolute right-2 top-0 mt-4 text-[#017DC3] z-0 cursor-pointer"
							onClick={() => datePickerRef.current?.setOpen(true)}>
							<BsFillCalendarPlusFill />
						</div>
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
		</form>
	);
};

export default SignupForm;
