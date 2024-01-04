import { CiEdit } from "react-icons/ci";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getSpecificAccessModule } from "@/api/roles";

interface CardProps {
	role: string;
}

export default function Card({ role }: CardProps) {
	const { data, isLoading } = useQuery(
		[`get-getSpecificAccessModule-card-${role}`],
		{
			queryFn: () => getSpecificAccessModule(role),
		},
	);

	return (
		<div className="rounded-md border border-gray-500 border-opacity-20 p-3 flex items-start justify-between">
			<div className=" space-y-2">
				<h3 className="font-bold">{role}</h3>
				<ul className="space-y-1 text-sm">
					{isLoading ? (
						<div>Loading...</div>
					) : (
						data &&
						data.map((access, index) => (
							<li key={`${index}-${access}`} className="text-xs">
								{access}
							</li>
						))
					)}
				</ul>
			</div>
			<Button variant={"link"} className="text-[#017DC3] space-x-1 text-xs">
				<span className="text-lg">
					<CiEdit />
				</span>
				<span>EDIT</span>
			</Button>
		</div>
	);
}
