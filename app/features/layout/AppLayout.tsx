import { Link } from "@remix-run/react";
import { LoginButton } from "~/routes/__auth/login";
import { useEnvVar } from "~/toolkit/remix/useEnvVar";
import { useCurrentUser } from "../auth/useCurrentUser";
import { AccountDropodown } from "./AccountDropodown";
import { CollectionPicker } from "./CollectionPicker";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const currentUser = useCurrentUser();
  let environment = useEnvVar("PUBLIC_ENV");
  return (
    <>
      <header className="w-full px-2 navbar bg-base-200">
        <div className="flex gap-2 navbar-start">
          <Link to="/">
            <img
              src="/images/icons/icon-96x96.png"
              className="h-10"
              alt="BookmarQ Logo"
            />
          </Link>
          <div className="">
            <CollectionPicker />
          </div>
        </div>
        {/* <div className="relative navbar-center">
          {environment && environment !== "PROD" && (
            <span className="absolute top-0 text-[11px] text-center w-full text-white/50">
              {environment}
            </span>
          )}
          <Link to="/" className="text-xl text-white normal-case btn btn-ghost">
            bookmarQ
          </Link>
        </div> */}
        <div className="navbar-end">
          <div>
            {currentUser ? (
              <AccountDropodown user={currentUser} />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </header>
      {children}
    </>
  );
}

interface MainContentProps {
  children: React.ReactNode;
  className?: string;
}
export const MainContentPadded = ({
  children,
  className = "",
}: MainContentProps) => {
  return (
    <main className={`p-3 sm:p-6 prose-sm prose max-w-none ${className}`}>
      {children}
    </main>
  );
};

export const MainContentFullBleed = ({
  children,
  className = "",
}: MainContentProps) => {
  return (
    <main className={`py-3 sm:py-6 prose-sm prose max-w-none ${className}`}>
      {children}
    </main>
  );
};
