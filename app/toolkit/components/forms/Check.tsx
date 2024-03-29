import { forwardRef } from "react";

export const Check = forwardRef<HTMLInputElement, CheckProps>(
  // eslint-disable-next-line
  function Check({ children, name, id, className, ...rest }, ref) {
    return (
      <label
        className={
          "label cursor-pointer justify-start gap-2 hover:bg-primary/5 rounded " +
          className
        }
      >
        <input
          className="border-2 checkbox checkbox-primary"
          type="checkbox"
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
        {children}
      </label>
    );
  }
);
export type CheckProps = React.HTMLProps<HTMLInputElement> & {
  name: string;
  children: React.ReactNode;
  className?: string;
};
