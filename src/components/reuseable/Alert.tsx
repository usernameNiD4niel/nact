import { FC } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface AlertProps {
  setShouldShowAlert: React.Dispatch<React.SetStateAction<boolean>>;
}

const Alert: FC<AlertProps> = ({ setShouldShowAlert }) => {
  const handleShowAlert = () => {
    setShouldShowAlert(false);
  };
  return (
    <div className="w-full px-5">
      <div className="flex gap-2 bg-green-500 w-full py-4 px-6 rounded-md text-white relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-white">Account successfully created!</span>
        <span
          className="absolute right-2 top-2 hover:cursor-pointer text-lg text-white"
          onClick={handleShowAlert}
        >
          <AiOutlineClose />
        </span>
      </div>
    </div>
  );
};

export default Alert;
