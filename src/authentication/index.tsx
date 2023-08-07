import "../../styles/unstyle-input.css";
import "../../styles/auth.css";
import React, { useState } from "react";
import SignupForm from "../components/SignupForm";
import { POST } from "../api/login";
import logo from "../assets/logo.svg";

const Index = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [pin, setPin] = useState("");
	const [isSignUpClick, setIsSignUpClick] = useState(false);

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const data = await POST({ phoneNumber, pin });
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
				<p className={`text-white font-medium text-xl mr-5 text-center`}>
					Create an account to Join Our <br /> Community
				</p>
			</section>
			<section
				className={`flex items-center px-5 py-10 justify-center flex-col md:bg-gray-50 w-full h-full space-y-6  ${
					isSignUpClick ? "rounded-l-xl" : "rounded-r-xl"
				}`}>
				<a href="/">
					<img src={logo} alt="NACT logo" />
				</a>
				<h2 className="text-2xl font-bold mt-10 text-center leading-9 tracking-tight text-gray-900">
					{isSignUpClick
						? "Register to create new account"
						: "Sign in to your account"}
				</h2>
				<form
					className={`w-full px-5 space-y-4 ${
						isSignUpClick ? "hidden" : "flex flex-col"
					}`}
					onSubmit={handleSubmit}>
					<label
						className="block font-medium text-sm leading-6 text-gray-900"
						htmlFor="phoneNumber">
						Phone Number
						<input
							type="number"
							id="phoneNumber"
							className="w-full block px-2 rounded-md mt-1 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							name="phoneNumber"
							placeholder="099876543212"
							onChange={(e) => setPhoneNumber(e.target.value)}
							value={phoneNumber}
							required
						/>
					</label>
					<label
						className="block font-medium text-sm leading-6 text-gray-900"
						htmlFor="fourDigitPin">
						Pin Code (4 digits)
						<input
							type="password"
							className="w-full block px-2 mt-1 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
							id="fourDigitPin"
							name="fourDigitPin"
							placeholder="1234"
							onChange={(e) => setPin(e.target.value)}
							value={pin}
							required
						/>
					</label>
					<div className="w-full flex justify-end">
						<a
							href="#"
							className="font-semibold text-[#017DC3] hover:text-[#44C6F3]">
							Forgot Password?
						</a>
					</div>
					<button
						type="submit"
						className="text-center w-full justify-center rounded-md transition-colors duration-300 bg-[#017DC3] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#44C6F3] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
	setIsSignUpClick: React.Dispatch<React.SetStateAction<boolean>>;
};

const Footer = ({
	setIsSignUpClick,
	buttonText,
	text,
}: FooterProps): JSX.Element => {
	return (
		<p className="text-gray-500 text-sm mt-6 text-center">
			{text}{" "}
			<button
				className="text-[#017DC3] font-semibold leading-6 hover:text-[#44C6F3] transition-colors"
				type="button"
				onClick={() => setIsSignUpClick((prev) => !prev)}>
				{buttonText}
			</button>
		</p>
	);
};

export default Index;
