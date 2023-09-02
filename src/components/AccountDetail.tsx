import {
	animatedInputClass,
	animatedSpanClass,
} from "../constants/reusable-class";
import "../../styles/unstyle-input.css";
import { useForm } from "react-hook-form";
import { AccountDetailSchema } from "../models/Signup";
import { zodResolver } from "@hookform/resolvers/zod";
import { AccountDetailDatatypes, FormDataProps } from "../constants/props";
import { useAccountDetailStore } from "../utils/account-detail";
import DisplayErrorMessage from "./DisplayErrorMessage";
import { POST } from "@/api/register";
import { usePersonalDetailStore } from "@/utils/personal-detail";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";

type AccountDetailProps = {
	setIsOneCurrentSlide: React.Dispatch<React.SetStateAction<boolean>>;
};

const AccountDetail = ({
	setIsOneCurrentSlide,
}: AccountDetailProps): JSX.Element => {
	const [
		mobileNumber,
		pin,
		recoveryQuestion,
		recoveryAnswer,
		confirmPin,
		setMobileNumber,
		setPin,
		setRecoveryQuestion,
		setRecoveryAnswer,
		setConfirmPin,
	] = useAccountDetailStore((state) => [
		state.mobileNumber,
		state.pin,
		state.recoveryQuestion,
		state.recoveryAnswer,
		state.confirmPin,
		state.setMobileNumber,
		state.setPin,
		state.setRecoveryQuestion,
		state.setRecoveryAnswer,
		state.setConfirmPin,
	]);

	const [firstName, lastName, middleInitial, birthDate, gender] =
		usePersonalDetailStore((state) => [
			state.firstName,
			state.lastName,
			state.middleInitial,
			state.birthDate,
			state.gender,
		]);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<AccountDetailDatatypes>({
		resolver: zodResolver(AccountDetailSchema),
	});

	const handleFormSubmit = async (data: AccountDetailDatatypes) => {
		// Get global state of all the fields

		const { mobileNumber, pin, recoveryAnswer, recoveryQuestion } = data;

		const formData: FormDataProps = {
			firstName,
			lastName,
			middleName: middleInitial,
			birthDate,
			gender,
			mobileNumber,
			pin,
			recoveryAnswer,
			recoveryQuestion,
		};

		const response = await POST(formData);

		if (typeof response === "boolean") {
			alert("error occured");
		} else {
			alert("successfully created post request!");
			if (typeof response === "object") {
				console.log("Hello pare: " + response.firstName);
			}
		}
		console.log(response);
	};

	return (
		<form
			onSubmit={handleSubmit(handleFormSubmit)}
			className="w-full flex flex-col gap-4 px-4">
			<label className="relative" htmlFor="mobileNumber">
				<input
					{...register("mobileNumber")}
					type="number"
					className={animatedInputClass}
					id="mobileNumber"
					name="mobileNumber"
					value={mobileNumber}
					onChange={(e) => setMobileNumber(e.target.value)}
					required
				/>
				<span
					className={`${animatedSpanClass} ${
						mobileNumber && "input-contains"
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
					{...register("pin")}
					type="password"
					className={animatedInputClass}
					id="pin"
					name="pin"
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					required
				/>
				<span className={`${animatedSpanClass} ${pin && "input-contains"}`}>
					4 Digit Pin Number
				</span>
				{errors.pin && (
					<DisplayErrorMessage errorMessage={`${errors.pin?.message}`} />
				)}
			</label>
			<label className="relative" htmlFor="confirmPin">
				<input
					{...register("confirmPin")}
					type="password"
					className={animatedInputClass}
					id="confirmPin"
					value={confirmPin}
					onChange={(e) => setConfirmPin(e.target.value)}
					name="confirmPin"
					required
				/>
				<span
					className={`${animatedSpanClass} ${confirmPin && "input-contains"}`}>
					Confirm Pin Number
				</span>
				{errors.confirmPin && (
					<DisplayErrorMessage errorMessage={`${errors.confirmPin?.message}`} />
				)}
			</label>
			<label className="relative" htmlFor="recoveryQuestion">
				<input
					{...register("recoveryQuestion")}
					type="text"
					className={animatedInputClass}
					id="recoveryQuestion"
					value={recoveryQuestion}
					onChange={(e) => setRecoveryQuestion(e.target.value)}
					name="recoveryQuestion"
					required
				/>
				<span
					className={`${animatedSpanClass} ${
						recoveryQuestion && "input-contains"
					}`}>
					Recovery Question
				</span>
				{errors.recoveryQuestion && (
					<DisplayErrorMessage
						errorMessage={`${errors.recoveryQuestion?.message}`}
					/>
				)}
			</label>
			<label className="relative" htmlFor="recoveryAnswer">
				<input
					{...register("recoveryAnswer")}
					type="text"
					className={animatedInputClass}
					id="recoveryAnswer"
					value={recoveryAnswer}
					onChange={(e) => setRecoveryAnswer(e.target.value)}
					name="recoveryAnswer"
					required
				/>
				<span
					className={`${animatedSpanClass} ${
						recoveryAnswer && "input-contains"
					}`}>
					Recovery Answer
				</span>
				{errors.recoveryAnswer && (
					<DisplayErrorMessage
						errorMessage={`${errors.recoveryAnswer?.message}`}
					/>
				)}
			</label>
			<div className="flex w-full justify-between py-2 items-center">
				<button
					type="button"
					onClick={() => setIsOneCurrentSlide(true)}
					className="flex items-center justify-center gap-4 px-3 py-2 ring-1 ring-[#017DC3] text-[#017DC3] text-center rounded-lg font-bold">
					<HiOutlineArrowLeft />
					Previous
				</button>

				<button
					type="submit"
					className="flex items-center justify-center gap-4 px-4 ring-1 ring-[#017DC3] py-2 bg-[#017DC3] text-white text-center rounded-lg font-bold">
					Submit <HiOutlineArrowRight />
				</button>
			</div>
		</form>
	);
};

export default AccountDetail;
