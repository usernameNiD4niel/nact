import "../../styles/unstyle-input.css";
import "../../styles/auth.css";
import React, { useEffect, useState } from "react";
import SignupForm from "../components/SignupForm";
import { POST } from "../api/login";
import logo from "../assets/logo.svg";
import "../index.css";
import {
	animatedInputClass,
	animatedSpanClass,
} from "../constants/reusable-class";
import OTPField from "../components/CustomOTPField";
import { usePersonalDetailStore } from "../utils/personal-detail";
import { useAccountDetailStore } from "../utils/account-detail";
import { useForm } from "react-hook-form";

import { LoginSchema } from "@/models/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import DisplayErrorMessage from "@/components/DisplayErrorMessage";

import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import Cookies from "js-cookie";
import Alert from "@/components/reuseable/Alert";

type LoginProps = {
	phoneNumber: string;
	pin: string;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const Index = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [isSignUpClick, setIsSignUpClick] = useState(false);
	const [pin, setPin] = useState<string[]>(new Array(4).fill(""));

	const [serverError, setServerError] = useState("");

	const navigate = useNavigate();

	const [shouldShowAlert, setShouldShowAlert] = useState(false);

	useEffect(() => {
		const token = Cookies.get("token");
		if (token) {
			navigate("/");
		}
	}, []);

	const mutation = useMutation({
		mutationFn: POST,
		onSuccess: (data) => {
			if (data?.success) {
				const expirationDate = new Date();
				expirationDate.setDate(expirationDate.getDate() + 7);
				Cookies.set("token", data.access_token_cookie, {
					expires: expirationDate,
				});
				setServerError("");
				navigate("/");
			} else {
				setServerError("Incorrect phone number or pincode");
			}
			// if (data?.success) {
			// } else {
			// }
		},
		onError: (error) => {
			console.log(error);

			setServerError("Incorrect phone number or pincode");
		},
	});

	const [otpError, setOtpError] = useState("");

	// const [isLoading, setIsLoading] = useState(false);

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<LoginProps>({
		resolver: zodResolver(LoginSchema),
	});

	const reset = usePersonalDetailStore((state) => state.reset);
	const resetAccount = useAccountDetailStore((state) => state.reset);

	const loginSuccess = async ({
		phoneNumber,
		pin,
	}: {
		phoneNumber: string;
		pin: string;
	}) => {
		// setIsLoading(true);
		mutation.mutate({ phoneNumber, pin });
	};

	const handleSubmitForm = async ({ phoneNumber }: LoginProps) => {
		const extractedPin: string = pin.join("");

		if (mutation.failureCount > 0) {
			mutation.reset();
		}

		try {
			if (parseInt(extractedPin) > 999) {
				setOtpError("");
				loginSuccess({ phoneNumber, pin: extractedPin });
			} else {
				setOtpError("Invalid pin, pincode must be a number");
			}
		} catch (err: unknown) {
			setOtpError("Invalid pin, pincode must be a number");
			throw Error("Error brother" + err);
		}
	};

	return (
		<main
			data-theme="light"
			className="flex items-center justify-center h-screen">
			<section className="w-full md:grid grid-cols-2 rounded-xl md:min-h-[500px] md:mx-5 md:max-w-4xl md:shadow-2xl">
				<section
					className={`items-center justify-center h-full bg-[#017DC3] hidden md:flex flex-col gap-4 ${
						isSignUpClick ? "rounded-r-xl order-2 gap-y-4" : "rounded-l-xl"
					}`}>
					<h1 className={`text-5xl font-bold text-white text-center mx-2`}>
						North Atlantic Container Trading
					</h1>
					<p className={`text-white font-medium text-lg text-center`}>
						Company Business Application
					</p>
				</section>
				<section
					className={`flex items-center md:px-5 py-10 justify-center flex-col w-full h-full space-y-6  ${
						isSignUpClick ? "rounded-l-xl" : "rounded-r-xl"
					}`}>
					<a href="/">
						<img src={logo} alt="NACT logo" />
					</a>
					<h2 className="text-2xl font-bold text-center">
						{isSignUpClick ? "Create your account" : "Sign in to your account"}
					</h2>
					{/* USE GLOBAL STATE TO WATCH THE CHANGES OF THE REGISTER PAGE */}
					{shouldShowAlert && <Alert setShouldShowAlert={setShouldShowAlert} />}
					<form
						className={`w-full px-5 space-y-6 ${
							isSignUpClick ? "hidden" : "flex flex-col"
						}`}
						onSubmit={handleSubmit(handleSubmitForm)}>
						<label className="relative" htmlFor="phoneNumber">
							<input
								{...register("phoneNumber")}
								name="phoneNumber"
								type="number"
								id="phoneNumber"
								className={animatedInputClass}
								onChange={(e) => setPhoneNumber(e.target.value)}
								value={phoneNumber}
								autoComplete="off"
								required
							/>
							<span
								className={`${animatedSpanClass} ${
									phoneNumber && "input-contains"
								}`}>
								Phone Number
							</span>
							{errors.phoneNumber && (
								<DisplayErrorMessage
									errorMessage={`${errors.phoneNumber?.message}`}
								/>
							)}
						</label>
						<label>
							<span className="text-black opacity-80 ml-3">Pin code</span>
							<OTPField otp={pin} setOtp={setPin} />
							{otpError && <DisplayErrorMessage errorMessage={otpError} />}
						</label>
						<div className="w-full flex justify-end">
							<a
								href="#"
								className="font-semibold text-[14px] text-[#017DC3] hover:text-[#44C6F3]">
								Forgot Password?
							</a>
						</div>
						{serverError && (
							<p className="text-red-500 text-sm font-bold">{serverError}</p>
						)}
						{mutation.isLoading ? (
							<button
								type="button"
								className="flex items-center justify-center gap-x-2">
								<span className="loading loading-spinner text-primary"></span>
								<span>Submitting</span>
							</button>
						) : (
							<button
								disabled={isSubmitting}
								type="submit"
								className="text-center w-full justify-center rounded-md transition-colors duration-300 bg-[#017DC3] px-3 py-2.5 text-[17px] font-semibold text-white shadow-sm hover:bg-[#44C6F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
								Submit
							</button>
						)}
					</form>
					{isSignUpClick ? (
						<>
							<SignupForm
								setIsSignUpClick={setIsSignUpClick}
								setShouldShowAlert={setShouldShowAlert}
							/>
							<Footer
								buttonText="Sign in"
								setIsSignUpClick={setIsSignUpClick}
								text="Already have an account?"
								key="signUpFormFoooter"
								resetPersonalDetail={reset}
								resetAccountDetail={resetAccount}
							/>
						</>
					) : (
						<Footer
							buttonText="Sign up"
							setIsSignUpClick={setIsSignUpClick}
							text="Don't have an account yet?"
							setShouldShowAlert={setShouldShowAlert}
						/>
					)}
				</section>
			</section>
		</main>
	);
};

type FooterProps = {
	text: string;
	buttonText: string;
	resetPersonalDetail?: () => void;
	resetAccountDetail?: () => void;
	setIsSignUpClick: React.Dispatch<React.SetStateAction<boolean>>;
	setShouldShowAlert?: React.Dispatch<React.SetStateAction<boolean>>;
};

const Footer = ({
	setIsSignUpClick,
	buttonText,
	text,
	resetAccountDetail,
	resetPersonalDetail,
	setShouldShowAlert,
}: FooterProps): JSX.Element => {
	return (
		<p className="text-gray-900 text-[14px] mt-6 text-center">
			{text}{" "}
			<button
				className="text-[#017DC3] font-semibold leading-6 hover:text-[#44C6F3] transition-colors"
				type="button"
				onClick={() => {
					if (resetAccountDetail) {
						resetAccountDetail();
					}
					if (resetPersonalDetail) {
						resetPersonalDetail();
					}
					if (setShouldShowAlert) {
						setShouldShowAlert(false);
					}
					setIsSignUpClick((prev) => !prev);
				}}>
				{buttonText}
			</button>
		</p>
	);
};

export default Index;
