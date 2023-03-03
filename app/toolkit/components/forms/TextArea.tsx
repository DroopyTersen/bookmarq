import { forwardRef } from "react";

export const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  // eslint-disable-next-line
  function TextArea({ className, ...rest }, ref) {
    let { validationStatus, ...props } = rest as any;
    return (
      <textarea
        ref={ref}
        {...props}
        className={`textarea w-full textarea-bordered focus:textarea-accent text-white bg-transparent focus:bg-black/10 ${className}`}
      ></textarea>
    );
  }
);

export type TextAreaProps = React.HTMLProps<HTMLTextAreaElement> & {
  className?: string;
};
