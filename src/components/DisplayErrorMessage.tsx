const DisplayErrorMessage = ({
  errorMessage,
}: {
  errorMessage: string;
}): JSX.Element => {
  return <p className="text-red-500 text-xs font-semibold">{errorMessage}</p>;
};

export default DisplayErrorMessage;
