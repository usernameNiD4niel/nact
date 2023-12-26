import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

interface UpdateRoleProps {
	roles: string[];
}

export default function UpdateRole({ roles }: UpdateRoleProps) {
	return (
		<Dialog>
			<DialogTrigger>Update</DialogTrigger>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Update Role</DialogTitle>
					<DialogDescription>
						Select a role to update or rename them
					</DialogDescription>
				</DialogHeader>
				<Select>
					<SelectTrigger /*className="w-[180px]"*/>
						<SelectValue placeholder="Select a role" />
					</SelectTrigger>
					<SelectContent>
						{roles.map((role) => (
							<SelectItem value={role} key={role}>
								{role}
							</SelectItem>
						))}
						{/* <SelectItem value="dark">Dark</SelectItem>
						<SelectItem value="system">System</SelectItem> */}
					</SelectContent>
				</Select>
			</DialogContent>
		</Dialog>
	);
}
