interface ErrorTextProps {
  errorMessage: string;
}

export default function ErrorText({ errorMessage }: ErrorTextProps) {
  return <p className="text-red-500 my-1">{errorMessage}</p>;
}
