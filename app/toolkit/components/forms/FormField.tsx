export const FormField = ({
  name,
  label,
  altLabel = "",
  className,
  error,
  required,
  children,
  hint,
}: FormFieldProps) => {
  const errorMsg = parseErrorMessage(error);
  return (
    <div className={`form-control ${className}`}>
      <label className="label" htmlFor={name}>
        {label && (
          <span className="label-text">
            {label}
            {required && <span className="ml-[2px] text-red-300">*</span>}
          </span>
        )}
        {altLabel && <span className="label-text-alt">{altLabel}</span>}
      </label>
      {children}
      {hint && (
        <label className="label">
          <span className="label-text-alt" id={`${name}-hint`}>
            {hint}
          </span>
        </label>
      )}
      {errorMsg && (
        <label className="label">
          <span className="text-red-200 label-text-alt" id={`${name}-hit`}>
            {errorMsg}
          </span>
        </label>
      )}
    </div>
  );
};

export interface FormFieldProps {
  /** The input name */
  name: string;
  /** The field label */
  label?: string;
  /** Display in top right */
  altLabel?: string;
  /** Helper text */
  hint?: string;
  /** The React Hook Form error */
  error?: Error | string;
  /** JSX that contains an input element with a matching name. */
  children?: React.ReactNode;
  /** Show the little red asterisk? */
  required?: boolean;
  /** Additional CSS classes to add */
  className?: string;
}

export const pluckFormFieldProps = (props: any) => {
  const {
    name,
    label,
    error,
    altLabel,
    required,
    hint,
    className,
    id,
    ...formControlProps
  } = props;

  return {
    formFieldProps: {
      name,
      altLabel,
      label,
      error,
      required,
      hint,
    },

    formControlProps: {
      name,
      id: id || name,
      ...formControlProps,
    },
  };
};

export const parseErrorMessage = (error?: Error | string) => {
  if (!error) return "";
  if (typeof error === "string") return error;

  if (error.message) return error.message;
};
