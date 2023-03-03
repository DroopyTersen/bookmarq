import {
  ConfirmationButton,
  ConfirmationButtonProps,
} from "./ConfirmationButton";

export function DeleteButton({
  className = "",
  children = null,
  ...props
}: ConfirmationButtonProps) {
  return (
    <ConfirmationButton
      className={className + " btn btn-error text-white flex items-center"}
      {...props}
    >
      {/* <BiTrash size={20} /> */}
      {children || <span className="">Delete</span>}
    </ConfirmationButton>
  );
}
