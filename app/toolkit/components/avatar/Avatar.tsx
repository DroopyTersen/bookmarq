import { FaUserCircle } from "react-icons/fa";

interface Props {
  className?: string;
  photo?: string | null;
  name?: string | null;
}

export function AvatarImage({ className = "", photo = "", name = "" }: Props) {
  if (!photo) {
    return (
      <FaUserCircle
        className={`relative inline-block h-10 w-10 rounded-full ring-2 ring-gray-300 ${className}`}
      />
    );
  }
  return (
    <img
      title={name || ""}
      className={`relative inline-block h-10 w-10 rounded-full ring-2 ring-gray-300`}
      src={photo}
      alt={name || "Avatar"}
      referrerPolicy="no-referrer"
    />
  );
}

export function AvatarFull({ photo = "", title = "", subtitle = "" }) {
  return (
    <div className="flex items-center">
      <div>
        {!photo && (
          <FaUserCircle className="inline-block rounded-full h-9 w-9 text-primary-200" />
        )}
        {photo && (
          <img
            className="inline-block rounded-full h-9 w-9"
            src={photo}
            alt={title}
            referrerPolicy="no-referrer"
          />
        )}
      </div>
      <div className="ml-3">
        <p className="m-0 text-sm font-medium text-gray-700 group-hover:text-gray-900">
          {title}
        </p>
        <p className="m-0 text-xs font-medium text-gray-500 group-hover:text-gray-700">
          {subtitle}
        </p>
      </div>
    </div>
  );
}
