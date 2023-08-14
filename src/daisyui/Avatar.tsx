import { FC } from "react";

import avatar from "../assets/avatar.svg";

type ImageProps = {
	width: string;
	height: string;
	alt: string;
};

const Avatar: FC<ImageProps> = ({ alt, height, width }) => {
	return (
		<div className="avatar">
			<div className={`${width} ${height} bg-primary rounded-full`}>
				<img src={avatar} alt={alt} />
			</div>
		</div>
	);
};

export default Avatar;
