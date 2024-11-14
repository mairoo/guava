// components/FormField.tsx
import { ReactNode } from "react";
import { FieldError } from "react-hook-form";
import FormErrorMessage from "./FormErrorMessage";

interface FormFieldProps {
  children: ReactNode;
  error?: FieldError;
  className?: string;
}

const FormField = ({ children, error, className = "" }: FormFieldProps) => {
  return (
    <div className={className}>
      {children}
      <FormErrorMessage error={error} />
    </div>
  );
};

export default FormField;
