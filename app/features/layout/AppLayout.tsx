import { Link } from "@remix-run/react";
import { LoginButton } from "~/routes/__auth/login";
import { Dropdown } from "~/toolkit/components/dropdown/Dropdown";
import { useEnvVar } from "~/toolkit/remix/useEnvVar";
import { useCurrentUser } from "../auth/useCurrentUser";
import { AccountDropodown } from "./AccountDropodown";
import { WorkspacePicker } from "./WorkspacePicker";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const currentUser = useCurrentUser();
  let environment = useEnvVar("PUBLIC_ENV");
  return (
    <>
      <header className="w-full px-2 navbar bg-base-200">
        <div className="navbar-start">
          <Dropdown align="left" className="min-w-fit">
            <Dropdown.CircleTrigger>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </Dropdown.CircleTrigger>
            <Dropdown.MenuContent>
              <div className="md:hidden min-w-[200px]">
                <WorkspacePicker />
              </div>
              <li>
                <a href="/">Homepage</a>
              </li>
              <li>
                <a href="/portfolio">Portfolio</a>
              </li>
              <li>
                <a>About</a>
              </li>
            </Dropdown.MenuContent>
          </Dropdown>
          <div className="hidden md:block">
            <WorkspacePicker />
          </div>
        </div>
        <div className="relative navbar-center">
          {environment && environment !== "PROD" && (
            <span className="absolute top-0 text-[11px] text-center w-full text-white/50">
              {environment}
            </span>
          )}
          <Link to="/" className="text-xl text-white normal-case btn btn-ghost">
            bookmarq
          </Link>
        </div>
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
