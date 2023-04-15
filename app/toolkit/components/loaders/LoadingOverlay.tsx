import { Overlay } from "../overlay/Overlay";
import { LoadingLogo } from "./LoadingLogo";

interface LoadingOverlayProps {
  isLoading: boolean;
  children?: React.ReactNode;
}

export function LoadingOverlay({ isLoading, children }: LoadingOverlayProps) {
  return (
    <Overlay className="rounded-lg" opacity={isLoading ? 0.7 : 0}>
      <div className="flex flex-col items-center">
        <LoadingLogo Logo={Logo} />
        <div className="mt-2 font-bold">{children}</div>
      </div>
    </Overlay>
  );
}
function Logo({ className = "" }) {
  return <img src="/images/icons/icon-128x128.png" className={className} />;
}
