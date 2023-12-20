import { ButtonList } from "@/constants/enums";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface NavigationTabProps {
	access_module: string | undefined;
	selected: ButtonList | null;
	setSelected: (value: ButtonList) => void;
	tabName: string;
}

export default function NavigationTab({
	access_module,
	selected,
	tabName,
	setSelected,
}: NavigationTabProps) {
	const router = useNavigate();
	useEffect(() => {
		const accessModule = JSON.parse(access_module!) as string[];

		const access = accessModule.find((item) => item === tabName);

		if (!access) {
			router(-1);
		}

		console.log(`should navigate back? ${access}`);
		console.log(`access modules ::: ${JSON.stringify(accessModule, null, 2)}`);

		if (selected) {
			setSelected(selected);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <></>;
}
