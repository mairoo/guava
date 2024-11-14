import { FieldError } from "react-hook-form";

interface FormErrorMessageProps {
  error?: FieldError;
  className?: string;
}

const FormErrorMessage = ({ error, className = "" }: FormErrorMessageProps) => {
  if (!error) return null;

  return (
    <p className={`mt-2 text-sm text-red-600 ${className}`}>{error.message}</p>
  );
};

export default FormErrorMessage;
