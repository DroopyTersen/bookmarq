import dayjs from "dayjs";
import {
  GetCacheItemDocument,
  SetCacheItemDocument,
} from "~/.gql/graphql.types";
import { createAdminGqlClient } from "~/common/hasura.server";
import { ICache } from "./ICache";

export class HasuraCache implements ICache {
  async getItem<T>(key: string): Promise<T | null> {
    // create a hasura admin client
    if (!key) throw new Error("Key is required");
    let adminClient = createAdminGqlClient();
    let result = await adminClient.request(GetCacheItemDocument, { key });
    if (!result.item) return null;
    if (result.item.expires && dayjs(result.item.expires).isBefore(dayjs())) {
      return null;
    }

    return result?.item?.value as T;
  }
  async setItem<T>(key: string, value: T, expires?: Date | string) {
    let adminClient = createAdminGqlClient();
    let expiresAt = expires ? dayjs(expires).toISOString() : undefined;
    let result = await adminClient.request(SetCacheItemDocument, {
      input: { key, value, expires: expiresAt },
    });
    return result.item as { key: string; value: T; expires?: string };
  }
}
