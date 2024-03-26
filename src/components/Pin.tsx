import { memo, useEffect, useState } from "react";
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "./ui/input-otp";

type Props = {
	setPin: React.Dispatch<React.SetStateAction<string>>;
};

const Pin = memo(({ setPin }: Props) => {
	const [value, setValue] = useState("");

	useEffect(() => {
		if (value.length === 4) {
			setPin(value);
		}
	}, [value, setPin]);

	return (
		<div className="space-y-2 w-full flex items-center justify-center flex-col">
			<InputOTP maxLength={4} value={value} onChange={setValue} name="pin">
				<InputOTPGroup className="space-x-5">
					<InputOTPSlot index={0} />
					<InputOTPSeparator />
					<InputOTPSlot index={1} />
					<InputOTPSeparator />
					<InputOTPSlot index={2} />
					<InputOTPSeparator />
					<InputOTPSlot index={3} />
				</InputOTPGroup>
			</InputOTP>
		</div>
	);
});

export default Pin;
