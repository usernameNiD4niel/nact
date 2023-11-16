import { deleteSupplier } from "@/api/supplier";
import React, { FC } from "react";
import { useToast } from "../ui/use-toast";
import { useNavigate } from "react-router-dom";

type DeleteModalProps = {
  setIsModalWarning: React.Dispatch<React.SetStateAction<boolean>>;
  endpoint: string;
};

const DeleteModal: FC<DeleteModalProps> = ({ setIsModalWarning, endpoint }) => {
  const button_class = "p-3 rounded-md text-center text-sm";
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalWarning(false);
  };

  const handleDelete = async () => {
    // Create a delete action here
    const deleteData = await deleteSupplier(endpoint);

    console.log("the delete ", deleteData);

    if (
      deleteData ===
      "Supplier and associated contact persons deleted successfully"
    ) {
      toast({
        title: "Successfully deleted",
        description: deleteData,
      });
      navigate("/supplier");
      console.log("log 1");

      return;
    } else {
      toast({
        title: "Failed to delete",
        description: deleteData.message,
      });
      console.log("log 2");
    }
    setIsModalWarning(false);
  };
  return (
    <div className="inset-0 z-20 flex items-center justify-center fixed bg-black bg-opacity-70">
      <div className="w-full md:w-[500px] p-6 mx-6 rounded-md border-[1px] border-black bg-white border-opacity-20 space-y-2">
        <h2 className="font-bold">Are you absolutely sure?</h2>
        <p className="text-sm">
          This action cannot be undone. This will permanently delete this
          supplier item and remove this data from our server.
        </p>
        <div className="flex justify-end items-center gap-2 pt-4">
          <button
            className={`${button_class} border-[1px] border-black border-opacity-30`}
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className={`${button_class} bg-red-500 text-white`}
            type="button"
            onClick={handleDelete}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
