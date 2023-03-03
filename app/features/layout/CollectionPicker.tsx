import { useNavigate, useParams } from "@remix-run/react";
import { useMemo } from "react";
import { Select } from "~/toolkit/components/forms";
import { useCurrentUser } from "../auth/useCurrentUser";

export const CollectionPicker = () => {
  let currentUser = useCurrentUser();
  let { collectionId } = useParams();
  let navigate = useNavigate();
  if (!currentUser) return null;
  let collections = useMemo(() => {
    return (
      currentUser?.roles?.map((role) => {
        return {
          label: role.collection.name,
          value: role.collection.id,
        };
      }) || []
    );
  }, [currentUser?.roles]);
  return (
    <Select
      value={collectionId || ""}
      key={collectionId || "none"}
      onChange={(e) => {
        e.preventDefault();
        let targetPage = e.currentTarget.value || "";
        if (targetPage === "new-collection") {
          targetPage =
            targetPage +
            `?returnTo=${encodeURIComponent(
              window.location.pathname + "?" + window.location.search
            )}`;
        }
        navigate("/" + targetPage);
      }}
    >
      {!collectionId && (
        <option disabled value="">
          -- Select a collection --
        </option>
      )}
      <optgroup label="Your collections">
        {collections.map((collection) => (
          <option key={collection.value} value={collection.value}>
            {collection.label}
          </option>
        ))}
      </optgroup>
      <optgroup label="More">
        <option value="new-collection">+ Create New</option>
      </optgroup>
    </Select>
  );
};

export const useCurrentCollection = () => {
  let currentUser = useCurrentUser();
  let { collectionId } = useParams();
  let current = useMemo(() => {
    return currentUser?.roles?.find(
      (role) => role.collection.id === collectionId
    );
  }, [currentUser?.roles, collectionId]);
  return {
    role: current?.role,
    ...current?.collection,
  };
};
