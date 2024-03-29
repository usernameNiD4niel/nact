import React, { FC, useEffect, useRef, useState } from "react";
import "../../styles/remove-scroll-bar.css";
import { HiOutlineArrowRight } from "react-icons/hi2";

export type OTPFieldProps = {
	otp: string[];
	setOtp: React.Dispatch<React.SetStateAction<string[]>>;
};

let currentOtpIndex: number = 0;

const OTPField: FC<OTPFieldProps> = ({ otp, setOtp }): JSX.Element => {
	const inputRef = useRef<HTMLInputElement>(null);

	const [activeOTPIndex, setActiveOTPIndex] = useState<number>(0);

	const placeHolder = ["C", "O", "D", "E"];

	const handleOnChange = ({
		target,
	}: React.ChangeEvent<HTMLInputElement>): void => {
		const { value } = target;
		const newOTP: string[] = [...otp];
		const onlyNumbers = value.replace(/[^0-9]/g, "");
		newOTP[currentOtpIndex] = onlyNumbers.substring(onlyNumbers.length - 1);
		setOtp(newOTP);
		if (!value) {
			setActiveOTPIndex(currentOtpIndex - 1);
		} else {
			if (onlyNumbers.length === 0) {
				return;
			}
			setActiveOTPIndex(currentOtpIndex + 1);
		}
	};

	const handleOnKeyDown = (
		{ key }: React.KeyboardEvent<HTMLInputElement>,
		index: number,
	) => {
		currentOtpIndex = index;
		if (key === "Backspace") {
			setActiveOTPIndex(currentOtpIndex - 1);
		}
	};

	useEffect(() => {
		inputRef.current?.focus();
		console.log(activeOTPIndex);
	}, [activeOTPIndex]);

	return (
		<div className="flex justify-evenly items-center space-x-2">
			{otp.map((_, index) => {
				return (
					<React.Fragment key={index}>
						<input
							ref={index === activeOTPIndex ? inputRef : null}
							onChange={handleOnChange}
							key={index}
							name={`pin${index + 1}`}
							onKeyDown={(e) => handleOnKeyDown(e, index)}
							type="password"
							value={otp[index]}
							placeholder={placeHolder[index]}
							autoComplete="off"
							required
							className="w-12 h-12 border-[1px] rounded bg-transparent outline-none text-center text-2xl placeholder:text-[16px] spin-button-none border-black border-opacity-30 focus:border-[#017DC3] focus:text-[#017DC3] text-gray-600 transition"
						/>
						{index === otp.length - 1 ? null : (
							<p className="text-[10px]">
								<HiOutlineArrowRight />
							</p>
						)}
					</React.Fragment>
				);
			})}
		</div>
	);
};

export default OTPField;
