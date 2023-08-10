import React, { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import PersonalDetail from "./PersonalDetail";
import SlidingForm from "./SlidingForm";
import AccountDetail from "./AccountDetail";

const SignupForm = () => {
	const [isOneCurrentSlide, setIsOneCurrentSlide] = useState<boolean>(true);

	return (
		<React.Fragment>
			<SlidingForm
				isOneCurrentSlide={isOneCurrentSlide}
				key="signUpFormSlidingForm"
			/>
			{!isOneCurrentSlide ? (
				<div
					className="w-full flex flex-col gap-4"
					key="signUpFormAccountDetail">
					<AccountDetail
						setIsOneCurrentSlide={setIsOneCurrentSlide}
						key="AccountDetail"
					/>
				</div>
			) : (
				<div className={`w-full flex flex-col gap-4`}>
					<PersonalDetail
						setIsOneCurrentSlide={setIsOneCurrentSlide}
						key="PersonalDetail"
					/>
				</div>
			)}
		</React.Fragment>
	);
};

export default SignupForm;
