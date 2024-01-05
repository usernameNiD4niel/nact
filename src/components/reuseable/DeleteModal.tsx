import { deleteSupplier } from "@/api/supplier";
import React, { FC } from "react";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type DeleteModalProps = {
	setIsModalWarning: React.Dispatch<React.SetStateAction<boolean>>;
	endpoint: string;
	navigateTo: string;
	modalLabel: string;
};

const DeleteModal: FC<DeleteModalProps> = ({
	setIsModalWarning,
	endpoint,
	modalLabel,
	navigateTo,
}) => {
	const button_class = "p-3 rounded-md text-center text-sm";
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleCancel = () => {
		setIsModalWarning(false);
	};

	const handleDelete = async () => {
		// Create a delete action here
		const deleteData = await deleteSupplier(endpoint);

		if (deleteData.success) {
			localStorage.clear();
			toast({
				title: "Successfully deleted",
				description: deleteData.message,
			});
			navigate(`/${navigateTo}`);

			return;
		} else {
			toast({
				title: "Failed to delete",
				description: deleteData.message,
			});
		}
		setIsModalWarning(false);
	};
	return (
		<div className="inset-0 z-20 flex items-center justify-center fixed bg-black bg-opacity-70">
			<div className="w-full md:w-[500px] p-6 mx-6 rounded-md border-[1px] border-black bg-white border-opacity-20 space-y-2">
				<h2 className="font-bold">Are you absolutely sure?</h2>
				<p className="text-sm">{modalLabel}</p>
				<div className="flex justify-end items-center gap-2 pt-4">
					<button
						className={`${button_class} border-[1px] border-black border-opacity-30`}
						onClick={handleCancel}>
						Cancel
					</button>
					<button
						className={`${button_class} bg-red-500 text-white`}
						type="button"
						onClick={handleDelete}>
						Continue
					</button>
				</div>
			</div>
		</div>
	);
};

export default DeleteModal;
