import "../../styles/unstyle-input.css";
import "../../styles/auth.css";
import { useState } from "react";

const Index = () => {
	const [phoneNumber, setPhoneNumber] = useState("");
	const [pin, setPin] = useState("");

	const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData();
		formData.append("phoneNumber", phoneNumber.toString());
		formData.append("pin", pin.toString());

		try {
			// TODO: add a valid url to the fetch request
			const response = await fetch("", {
				method: "POST",
				body: formData,
			});

			if (response.ok) {
				console.log("Sucessfully created a POST request");
				const data = await response.json();

				// TODO: change this if there's no status from the response
				if (data.status === "success") {
					console.log("Redirecting to the dashboard...");
				} else {
					console.error("Error: " + data.status);
				}
			} else {
				console.log("Successfully failed!");
			}
		} catch (e: unknown) {
			if (typeof e === "string") {
				console.log(e);
			} else if (e instanceof Error) {
				console.log("Error: " + e.message);
			}
		}
	};
	return (
		<main className=" w-full md:grid grid-cols-2  rounded-xl md:min-h-[500px] md:mx-5 md:max-w-4xl md:shadow-xl">
			<section className="items-center justify-center h-full bg-[#44C6F3] rounded-l-xl hidden md:flex flex-col">
				<h1 className="text-6xl font-bold text-white">
					Adventure <br /> start here
				</h1>
				<p className="text-white font-medium text-xl">
					Create an account to Join Our <br /> Community
				</p>
			</section>
			<section className="flex items-center justify-center flex-col md:bg-gray-50 rounded-r-xl w-full h-full space-y-6">
				<a href="/">
					<img src="src/assets/logo.svg" alt="NACT logo" />
				</a>
				<h2 className="text-2xl font-bold mt-10 text-center leading-9 tracking-tight text-gray-900">
					Sign in to your account
				</h2>
				<form className="w-full px-5 space-y-4" onSubmit={handleSubmit}>
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
							className="font-semibold text-[#44C6F3] hover:text-[#007DC4]">
							Forgot Password?
						</a>
					</div>
					<button
						type="submit"
						className="text-center w-full justify-center rounded-md transition-colors duration-300 bg-[#44C6F3] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#007DC4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
						Submit
					</button>
				</form>
				<p className="text-gray-500 text-sm mt-6 text-center">
					Don't have an account yet?{" "}
					<a
						className="text-[#44C6F3] font-semibold leading-6 hover:text-[#007DC4] transition-colors"
						href="#">
						Sign up
					</a>
				</p>
			</section>
		</main>
	);
};

export default Index;
