import { AccountDetailProps } from "../../constants/props";
import { inputClass, labelClass } from "../../constants/reusable-class";
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
			<label className={labelClass} htmlFor="mobileNumber">
				Mobile Number
				<input
					type="number"
					className={inputClass}
					id="mobileNumber"
					name="mobileNumber"
					placeholder="09876543212"
					value={mobileNumber}
					onChange={(e) => setMobileNumber(e.target.value)}
					required
				/>
			</label>
			<label className={labelClass} htmlFor="pinCode">
				Pin Code
				<input
					type="password"
					className={inputClass}
					id="pinCode"
					name="pinCode"
					placeholder="1234"
					value={pin}
					onChange={(e) => setPin(e.target.value)}
					required
				/>
			</label>
			<label className={labelClass} htmlFor="confirmPinCode">
				Confirm Pin Code
				<input
					type="password"
					className={inputClass}
					id="confirmPinCode"
					value={confirmPin}
					onChange={(e) => setConfirmPin(e.target.value)}
					name="confirmPinCode"
					placeholder="1234"
					required
				/>
			</label>
			<label className={labelClass} htmlFor="recoveryQuestion">
				Recovery Question
				<input
					type="text"
					className={inputClass}
					id="recoveryQuestion"
					value={recoveryQuestion}
					onChange={(e) => setRecoveryQuestion(e.target.value)}
					name="recoveryQuestion"
					placeholder="Who's your first dog?"
					required
				/>
			</label>
			<label className={labelClass} htmlFor="recoveryAnswer">
				Recovery Answer
				<input
					type="text"
					className={inputClass}
					id="recoveryAnswer"
					value={recoveryAnswer}
					onChange={(e) => setRecoveryAnswer(e.target.value)}
					name="recoveryAnswer"
					placeholder="Alex"
					required
				/>
			</label>
		</>
	);
};

export default AccountDetail;
