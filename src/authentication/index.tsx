import "../../styles/unstyle-input.css";
import "../../styles/auth.css";
import React, { useState } from "react";
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

const Index = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [pin, setPin] = useState<string[]>(new Array(4).fill(""));
	const [isSignUpClick, setIsSignUpClick] = useState(false);

	const reset = usePersonalDetailStore((state) => state.reset);
	const resetAccount = useAccountDetailStore((state) => state.reset);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const extractedPin: string = pin.join("");
		const data = await POST({ phoneNumber, extractedPin });
		if (data) {
			alert("success");
		} else {
			alert("error");
		}
	};
	return (
		<main className=" w-full md:grid grid-cols-2 rounded-xl md:min-h-[500px] md:mx-5 md:max-w-4xl md:shadow-2xl">
			<section
				className={`items-center justify-center h-full bg-[#017DC3] hidden md:flex flex-col ${
					isSignUpClick ? "rounded-r-xl order-2" : "rounded-l-xl"
				}`}>
				<h1 className={`text-6xl font-bold text-white text-center`}>
					{!isSignUpClick ? (
						<>
							Adventure <br /> start here
						</>
					) : (
						<>
							Start your dream with <br /> us
						</>
					)}
				</h1>
				<p className={`text-white font-medium text-lg mr-5 text-center`}>
					Create an account to Join Our <br /> Community
				</p>
			</section>
			<section
				className={`flex items-center md:px-5 py-10 justify-center flex-col md:bg-gray-50 w-full h-full space-y-6  ${
					isSignUpClick ? "rounded-l-xl" : "rounded-r-xl"
				}`}>
				<a href="/">
					<img src={logo} alt="NACT logo" />
				</a>
				<h2 className="text-2xl font-bold text-center text-gray-900">
					{isSignUpClick ? "Create your account" : "Sign in to your account"}
				</h2>
				<form
					className={`w-full px-5 space-y-6 ${
						isSignUpClick ? "hidden" : "flex flex-col"
					}`}
					onSubmit={handleSubmit}>
					<label className="relative" htmlFor="phoneNumber">
						<input
							type="number"
							id="phoneNumber"
							className={animatedInputClass}
							name="phoneNumber"
							onChange={(e) => setPhoneNumber(e.target.value)}
							value={phoneNumber}
							required
						/>
						<span
							className={`${animatedSpanClass} ${
								phoneNumber && "input-contains"
							}`}>
							Phone Number
						</span>
					</label>
					<label>
						<span className="text-black opacity-80 ml-3">Pin code</span>
						<OTPField otp={pin} setOtp={setPin} />
					</label>
					<div className="w-full flex justify-end">
						<a
							href="#"
							className="font-semibold text-[14px] text-[#017DC3] hover:text-[#44C6F3]">
							Forgot Password?
						</a>
					</div>
					<button
						type="submit"
						className="text-center w-full justify-center rounded-md transition-colors duration-300 bg-[#017DC3] px-3 py-2.5 text-[17px] font-semibold text-white shadow-sm hover:bg-[#44C6F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Submit
					</button>
				</form>
				{isSignUpClick ? (
					<>
						<SignupForm />
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
					/>
				)}
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
};

const Footer = ({
	setIsSignUpClick,
	buttonText,
	text,
	resetAccountDetail,
	resetPersonalDetail,
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
					setIsSignUpClick((prev) => !prev);
				}}>
				{buttonText}
			</button>
		</p>
	);
};

export default Index;
