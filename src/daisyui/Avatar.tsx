import { FC } from "react";

import male from "../assets/male.svg";
import female from "../assets/female.svg";

type ImageProps = {
	alt: string;
	gender: string;
};

const Avatar: FC<ImageProps> = ({ alt, gender }) => {
	return (
		<div>
			{gender.toLowerCase() === "male" ? (
				<img
					src={male}
					alt={alt}
					width={66}
					height={66}
					className="rounded-full bg-[#017DC3]"
				/>
			) : (
				<img
					src={female}
					alt={alt}
					width={66}
					height={66}
					className="rounded-full bg-[#017DC3]"
				/>
			)}
		</div>
	);
};

export default Avatar;
