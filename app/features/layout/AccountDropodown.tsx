import { Link } from "@remix-run/react";
import { AvatarImage } from "~/toolkit/components/avatar/Avatar";
import { FormButton } from "~/toolkit/components/buttons/FormButton";
import { Dropdown } from "~/toolkit/components/dropdown/Dropdown";
import { AppUser } from "../users/users.types";

interface AccountDropodownProps {
  user: AppUser;
}

export function AccountDropodown({ user }: AccountDropodownProps) {
  return (
    <Dropdown align="right">
      <Dropdown.CircleTrigger>
        <AvatarImage photo={user.photo} name={user.name || user.email} />
      </Dropdown.CircleTrigger>
      <Dropdown.Content className="p-2 min-w-[200px] ">
        <div className="my-2 text-sm text-center text-gray-300">
          {user.name || user.email}
        </div>

        <Link to="/my-profile" className="btn btn-ghost btn-sm btn-block">
          My Profile
        </Link>
        <hr className="my-2 border-gray-100/30" />
        <FormButton action="/logout" className="btn btn-ghost btn-sm btn-block">
          Log out
        </FormButton>
      </Dropdown.Content>
    </Dropdown>
  );
}
