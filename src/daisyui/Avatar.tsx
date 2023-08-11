import avatar from "../assets/avatar.svg";

const Avatar = () => {
	return (
		<div className="avatar">
			<div className="w-9 h-9 bg-primary rounded-full">
				<img src={avatar} />
			</div>
		</div>
	);
};

export default Avatar;
