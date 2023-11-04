import { FC } from "react";

import avatar from "../assets/avatar.svg";

type ImageProps = {
	alt: string;
};

const Avatar: FC<ImageProps> = ({ alt }) => {
	return (
		<div>
			<img
				src={avatar}
				alt={alt}
				width={66}
				height={66}
				className="rounded-full bg-[#017DC3]"
			/>
		</div>
	);
};

export default Avatar;
