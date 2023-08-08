import { AccountDetailProps } from "../constants/props";
import {
	animatedInputClass,
	animatedSpanClass,
} from "../constants/reusable-class";
import "../../styles/unstyle-input.css";

const AccountDetail = ({
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
}: AccountDetailProps): JSX.Element => {
	return (
		<>
			<label className="relative" htmlFor="mobileNumber">
				<input
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
			</label>
			<label className="relative" htmlFor="pinCode">
				<input
					type="password"
					className={animatedInputClass}
					id="pinCode"
					name="pinCode"
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					required
				/>
				<span className={`${animatedSpanClass} ${pin && "input-contains"}`}>
					Pin Code
				</span>
			</label>
			<label className="relative" htmlFor="confirmPinCode">
				<input
					type="password"
					className={animatedInputClass}
					id="confirmPinCode"
					value={confirmPin}
					onChange={(e) => setConfirmPin(e.target.value)}
					name="confirmPinCode"
					required
				/>
				<span
					className={`${animatedSpanClass} ${confirmPin && "input-contains"}`}>
					Confirm Pin Code
				</span>
			</label>
			<label className="relative" htmlFor="recoveryQuestion">
				<input
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
			</label>
			<label className="relative" htmlFor="recoveryAnswer">
				<input
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
			</label>
		</>
	);
};

export default AccountDetail;
