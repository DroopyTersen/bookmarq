import { Link, useLocation, useParams } from "@remix-run/react";
import { LoginButton } from "~/routes/__auth/login";
import { useCurrentUser } from "../auth/useCurrentUser";
import { AccountDropodown } from "./AccountDropodown";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  let { collectionId } = useParams();
  let { pathname } = useLocation();

  const currentUser = useCurrentUser();
  return (
    <>
      <header className="w-full px-2 navbar bg-base-200">
        <div className="flex gap-2 navbar-start">
          <Link to="/" className="transition-transform hover:scale-105">
            <div className="flex items-center gap-2">
              <img
                src="/images/icons/icon-96x96.png"
                className="h-10"
                alt="BookmarQ Logo"
              />
              <div className="hidden sm:block">
                <span className="text-xl font-medium text-gray-200">
                  Bookmar
                </span>
                <span className="ml-[2px] text-xl font-bold text-white">Q</span>
              </div>
            </div>
          </Link>
          {/* <div className="">
            <CollectionPicker />
          </div> */}
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
        <div className="flex gap-3 navbar-end">
          {pathname !== `/${collectionId}/new` && currentUser && (
            <Link
              to={collectionId ? `/${collectionId}/new` : "/new-bookmark"}
              className="btn btn-secondary"
            >
              <span className="inline sm:hidden">New</span>
              <span className="hidden sm:block">New Bookmark</span>
            </Link>
          )}
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

export const MainContentCentered = ({
  children,
  className = "",
}: MainContentProps) => {
  return (
    <main
      className={`w-full md:max-w-3xl p-2 md:p-4 pb-8 mx-auto mt-4 md:mt-10 ${className}`}
    >
      {children}
    </main>
  );
};
