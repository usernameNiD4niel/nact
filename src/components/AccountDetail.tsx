import {
	animatedInputClass,
	animatedSpanClass,
} from "../constants/reusable-class";
import "../../styles/unstyle-input.css";
import { useForm } from "react-hook-form";
import { AccountDetailSchema } from "../models/Signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountDetailDatatypes, FormDataProps } from "../constants/props";
import DisplayErrorMessage from "./DisplayErrorMessage";
import { POST } from "@/api/register";
import { usePersonalDetailStore } from "@/utils/personal-detail";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import CustomDropdown from "./CustomDropdown";
import { useAccountDetailStore } from "@/utils/account-detail";
import LoadingButton from "./reuseable/LoadingButton";

type AccountDetailProps = {
	setIsOneCurrentSlide: React.Dispatch<React.SetStateAction<boolean>>;
	setIsSignUpClick: React.Dispatch<React.SetStateAction<boolean>>;
	setShouldShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountDetail = ({
	setIsOneCurrentSlide,
	setIsSignUpClick,
	setShouldShowAlert,
}: AccountDetailProps): JSX.Element => {
	const [error, setError] = useState("");
	const [hasGenderError, setHasGenderError] = useState(false);

	const [firstName, lastName, middleInitial, birthDate, personalReset] =
		usePersonalDetailStore((state) => [
			state.firstName,
			state.lastName,
			state.middleInitial,
			state.birthDate,
			state.reset,
		]);

	const [
		confirmPin_,
		gender_,
		mobileNumber_,
		pin_,
		setConfirmPin_,
		setGender_,
		setMobileNumber_,
		setPin_,
		accountReset,
	] = useAccountDetailStore((state) => [
		state.confirmPin,
		state.gender,
		state.mobileNumber,
		state.pin,
		state.setConfirmPin,
		state.setGender,
		state.setMobileNumber,
		state.setPin,
		state.reset,
	]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountDetailDatatypes>({
		resolver: zodResolver(AccountDetailSchema),
	});

	const [isLoadingButton, setIsLoadingButton] = useState(false);

	const mutation = useMutation({
		mutationFn: POST,
		onSuccess: (data) => {
			// Fix here
			if (data?.message === "Registration successful") {
				setError("");
				setShouldShowAlert(true);
				personalReset();
				accountReset();
				setIsSignUpClick(false);
			} else {
				if (!error && data) {
					setError("Backend Error: recovery question and answer required");
					console.log(data);

					console.log("On Success callback", data?.message);
				}
			}
			setIsLoadingButton(false);
		},
		onError: (err) => {
			console.log("On error callback", err);
		},
	});

	const handleFormSubmit = (data: AccountDetailDatatypes) => {
		// Get global state of all the fields

		console.log("test 1");

		if (!gender_) {
			setHasGenderError(true);
			console.log("test 2");
			return;
		} else {
			console.log("test 3");
			setHasGenderError(false);
		}

		console.log("test 4");
		mutation.reset();

		const { mobileNumber, pin } = data;

		const formData: FormDataProps = {
			firstName,
			lastName,
			middleName: middleInitial,
			birthDate,
			gender: gender_,
			mobileNumber,
			pin,
			setError,
		};

		setIsLoadingButton(true);

		mutation.mutate(formData);

		// Display error
		// Do not redirect if error is not empty

		// await POST(formData);

		// if (!error) {
		// 	navigate("/");
		// }
	};

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="w-full flex flex-col gap-4 px-4">
			<CustomDropdown
				gender={gender_}
				setGender={setGender_}
				hasGenderError={hasGenderError}
			/>
			<label className="relative">
				<input
					type="number"
					className={animatedInputClass}
					{...register("mobileNumber")}
					value={mobileNumber_}
					onChange={(e) => setMobileNumber_(e.target.value)}
				/>
				<span
					className={`${animatedSpanClass} ${
						mobileNumber_ && "input-contains"
					}`}>
					Mobile Number
				</span>
				{errors.mobileNumber && (
					<DisplayErrorMessage
						errorMessage={`${errors.mobileNumber?.message}`}
					/>
				)}
			</label>
			<label className="relative" htmlFor="pin">
				<input
					type="password"
					className={animatedInputClass}
					{...register("pin")}
					value={pin_}
					onChange={(e) => setPin_(e.target.value)}
				/>
				<span className={`${animatedSpanClass} ${pin_ && "input-contains"}`}>
					4 Digit Pin Number
				</span>
				{errors.pin && (
					<DisplayErrorMessage errorMessage={`${errors.pin?.message}`} />
				)}
			</label>
			<label className="relative" htmlFor="confirmPin">
				<input
					type="password"
					className={animatedInputClass}
					{...register("confirmPin")}
					value={confirmPin_}
					onChange={(e) => setConfirmPin_(e.target.value)}
				/>
				<span
					className={`${animatedSpanClass} ${confirmPin_ && "input-contains"}`}>
					Confirm Pin Number
				</span>
				{errors.confirmPin && (
					<DisplayErrorMessage errorMessage={`${errors.confirmPin?.message}`} />
				)}
			</label>

			{error && <p className="text-sm text-red-500 font-bold">{error}</p>}
			<div className="flex w-full justify-between py-2 items-center">
				<button
					type="button"
					onClick={() => setIsOneCurrentSlide(true)}
					className="flex items-center justify-center gap-4 px-3 py-2 ring-1 ring-[#017DC3] text-[#017DC3] text-center rounded-lg font-bold">
					<HiOutlineArrowLeft />
					Previous
				</button>

				{isLoadingButton ? (
					<LoadingButton />
				) : (
					<button
						type="submit"
						className="flex items-center justify-center gap-4 px-4 ring-1 ring-[#017DC3] py-2 bg-[#017DC3] text-white text-center rounded-lg font-bold">
						Submit <HiOutlineArrowRight />
					</button>
				)}
			</div>
		</form>
	);
};

export default AccountDetail;
