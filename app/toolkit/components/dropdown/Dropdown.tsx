interface DropdownProps {
  children: React.ReactNode;
  align?: "left" | "right";
  className?: string;
}

export function Dropdown({
  children,
  align = "right",
  className = "",
}: DropdownProps) {
  return (
    <div
      className={`dropdown ${className} ${
        align === "right" ? "dropdown-end" : "dropdown-start"
      }`}
    >
      {children}
    </div>
  );
}

function DropdownContent({ className = "", children, elem = "div" }) {
  let Elem: any = elem;
  return (
    <Elem
      tabIndex={0}
      className={`mt-1 shadow dropdown-content bg-base-300 rounded-box ${className}`}
    >
      {children}
    </Elem>
  );
}

function DropdownMenuContent({ className = "", children }) {
  return (
    <DropdownContent elem="ul" className={`menu p-2`}>
      {children}
    </DropdownContent>
  );
}

Dropdown.Content = DropdownContent;
Dropdown.MenuContent = DropdownMenuContent;
Dropdown.Trigger = DropdownTrigger;
Dropdown.CircleTrigger = CircleTrigger;

interface DropdownTriggerProps {
  className?: string;
  children: React.ReactNode;
}

function DropdownTrigger({ children, className = "" }: DropdownTriggerProps) {
  return (
    <label tabIndex={0} className={`${className}`}>
      {children}
    </label>
  );
}
function CircleTrigger({ children, className = "" }: DropdownTriggerProps) {
  return (
    <label tabIndex={0} className={`btn btn-ghost btn-circle ${className}`}>
      {children}
    </label>
  );
}
