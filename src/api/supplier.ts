import { SupplierDataProps } from "@/constants/props";
import Cookies from "js-cookie";

const token = Cookies.get("token");
const getSupplierTableData = async () => {
	console.log("token, ", token);

	const response = await fetch(
		`https://flask-service.gi2fod26lfct0.ap-southeast-1.cs.amazonlightsail.com/supplier`,
		{
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + token,
			},
		},
	);

	if (response.ok) {
		const data: Promise<SupplierDataProps> = response.json();
		return (await data).suppliers;
	} else {
		throw new Error(response.arrayBuffer.toString());
	}
};

export { getSupplierTableData };
