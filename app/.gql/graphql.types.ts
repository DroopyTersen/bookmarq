import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  jsonb: any;
  timestamptz: any;
  uuid: any;
};

/** columns and relationships of "bookmarks" */
export type Bookmarks = {
  __typename?: 'Bookmarks';
  articleData?: Maybe<Scalars['jsonb']>;
  /** An object relationship */
  collection: Collections;
  collectionId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  /** An object relationship */
  createdBy: Users;
  createdById: Scalars['uuid'];
  description?: Maybe<Scalars['String']>;
  embedData?: Maybe<Scalars['jsonb']>;
  html?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  image?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt: Scalars['timestamptz'];
  url: Scalars['String'];
};


/** columns and relationships of "bookmarks" */
export type BookmarksArticleDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};


/** columns and relationships of "bookmarks" */
export type BookmarksEmbedDataArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "bookmarks" */
export type BookmarksAggregate = {
  __typename?: 'BookmarksAggregate';
  aggregate?: Maybe<BookmarksAggregateFields>;
  nodes: Array<Bookmarks>;
};

/** aggregate fields of "bookmarks" */
export type BookmarksAggregateFields = {
  __typename?: 'BookmarksAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<BookmarksMaxFields>;
  min?: Maybe<BookmarksMinFields>;
};


/** aggregate fields of "bookmarks" */
export type BookmarksAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<BookmarksSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type BookmarksAppendInput = {
  articleData?: InputMaybe<Scalars['jsonb']>;
  embedData?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "bookmarks". All fields are combined with a logical 'AND'. */
export type BookmarksBoolExp = {
  _and?: InputMaybe<Array<BookmarksBoolExp>>;
  _not?: InputMaybe<BookmarksBoolExp>;
  _or?: InputMaybe<Array<BookmarksBoolExp>>;
  articleData?: InputMaybe<JsonbComparisonExp>;
  collection?: InputMaybe<CollectionsBoolExp>;
  collectionId?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  createdBy?: InputMaybe<UsersBoolExp>;
  createdById?: InputMaybe<UuidComparisonExp>;
  description?: InputMaybe<StringComparisonExp>;
  embedData?: InputMaybe<JsonbComparisonExp>;
  html?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  image?: InputMaybe<StringComparisonExp>;
  text?: InputMaybe<StringComparisonExp>;
  title?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  url?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "bookmarks" */
export enum BookmarksConstraint {
  /** unique or primary key constraint on columns "id" */
  BookmarksPkey = 'bookmarks_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type BookmarksDeleteAtPathInput = {
  articleData?: InputMaybe<Array<Scalars['String']>>;
  embedData?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type BookmarksDeleteElemInput = {
  articleData?: InputMaybe<Scalars['Int']>;
  embedData?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type BookmarksDeleteKeyInput = {
  articleData?: InputMaybe<Scalars['String']>;
  embedData?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "bookmarks" */
export type BookmarksInsertInput = {
  articleData?: InputMaybe<Scalars['jsonb']>;
  collection?: InputMaybe<CollectionsObjRelInsertInput>;
  collectionId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdBy?: InputMaybe<UsersObjRelInsertInput>;
  createdById?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  embedData?: InputMaybe<Scalars['jsonb']>;
  html?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type BookmarksMaxFields = {
  __typename?: 'BookmarksMaxFields';
  collectionId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  createdById?: Maybe<Scalars['uuid']>;
  description?: Maybe<Scalars['String']>;
  html?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type BookmarksMinFields = {
  __typename?: 'BookmarksMinFields';
  collectionId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  createdById?: Maybe<Scalars['uuid']>;
  description?: Maybe<Scalars['String']>;
  html?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  text?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  url?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "bookmarks" */
export type BookmarksMutationResponse = {
  __typename?: 'BookmarksMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Bookmarks>;
};

/** on_conflict condition type for table "bookmarks" */
export type BookmarksOnConflict = {
  constraint: BookmarksConstraint;
  update_columns?: Array<BookmarksUpdateColumn>;
  where?: InputMaybe<BookmarksBoolExp>;
};

/** Ordering options when selecting data from "bookmarks". */
export type BookmarksOrderBy = {
  articleData?: InputMaybe<OrderBy>;
  collection?: InputMaybe<CollectionsOrderBy>;
  collectionId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  createdBy?: InputMaybe<UsersOrderBy>;
  createdById?: InputMaybe<OrderBy>;
  description?: InputMaybe<OrderBy>;
  embedData?: InputMaybe<OrderBy>;
  html?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  image?: InputMaybe<OrderBy>;
  text?: InputMaybe<OrderBy>;
  title?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  url?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: bookmarks */
export type BookmarksPkColumnsInput = {
  id: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type BookmarksPrependInput = {
  articleData?: InputMaybe<Scalars['jsonb']>;
  embedData?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "bookmarks" */
export enum BookmarksSelectColumn {
  /** column name */
  ArticleData = 'articleData',
  /** column name */
  CollectionId = 'collectionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedById = 'createdById',
  /** column name */
  Description = 'description',
  /** column name */
  EmbedData = 'embedData',
  /** column name */
  Html = 'html',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Text = 'text',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Url = 'url'
}

/** input type for updating data in table "bookmarks" */
export type BookmarksSetInput = {
  articleData?: InputMaybe<Scalars['jsonb']>;
  collectionId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdById?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  embedData?: InputMaybe<Scalars['jsonb']>;
  html?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
};

/** update columns of table "bookmarks" */
export enum BookmarksUpdateColumn {
  /** column name */
  ArticleData = 'articleData',
  /** column name */
  CollectionId = 'collectionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  CreatedById = 'createdById',
  /** column name */
  Description = 'description',
  /** column name */
  EmbedData = 'embedData',
  /** column name */
  Html = 'html',
  /** column name */
  Id = 'id',
  /** column name */
  Image = 'image',
  /** column name */
  Text = 'text',
  /** column name */
  Title = 'title',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Url = 'url'
}

export type BookmarksUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<BookmarksAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath?: InputMaybe<BookmarksDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem?: InputMaybe<BookmarksDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey?: InputMaybe<BookmarksDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<BookmarksPrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<BookmarksSetInput>;
  where: BookmarksBoolExp;
};

/** columns and relationships of "cache" */
export type Cache = {
  __typename?: 'Cache';
  createdAt: Scalars['timestamptz'];
  expires?: Maybe<Scalars['timestamptz']>;
  key: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  value: Scalars['jsonb'];
};


/** columns and relationships of "cache" */
export type CacheValueArgs = {
  path?: InputMaybe<Scalars['String']>;
};

/** aggregated selection of "cache" */
export type CacheAggregate = {
  __typename?: 'CacheAggregate';
  aggregate?: Maybe<CacheAggregateFields>;
  nodes: Array<Cache>;
};

/** aggregate fields of "cache" */
export type CacheAggregateFields = {
  __typename?: 'CacheAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<CacheMaxFields>;
  min?: Maybe<CacheMinFields>;
};


/** aggregate fields of "cache" */
export type CacheAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CacheSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** append existing jsonb value of filtered columns with new jsonb value */
export type CacheAppendInput = {
  value?: InputMaybe<Scalars['jsonb']>;
};

/** Boolean expression to filter rows from the table "cache". All fields are combined with a logical 'AND'. */
export type CacheBoolExp = {
  _and?: InputMaybe<Array<CacheBoolExp>>;
  _not?: InputMaybe<CacheBoolExp>;
  _or?: InputMaybe<Array<CacheBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  expires?: InputMaybe<TimestamptzComparisonExp>;
  key?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  value?: InputMaybe<JsonbComparisonExp>;
};

/** unique or primary key constraints on table "cache" */
export enum CacheConstraint {
  /** unique or primary key constraint on columns "key" */
  CachePkey = 'cache_pkey'
}

/** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
export type CacheDeleteAtPathInput = {
  value?: InputMaybe<Array<Scalars['String']>>;
};

/** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
export type CacheDeleteElemInput = {
  value?: InputMaybe<Scalars['Int']>;
};

/** delete key/value pair or string element. key/value pairs are matched based on their key value */
export type CacheDeleteKeyInput = {
  value?: InputMaybe<Scalars['String']>;
};

/** input type for inserting data into table "cache" */
export type CacheInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expires?: InputMaybe<Scalars['timestamptz']>;
  key?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  value?: InputMaybe<Scalars['jsonb']>;
};

/** aggregate max on columns */
export type CacheMaxFields = {
  __typename?: 'CacheMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expires?: Maybe<Scalars['timestamptz']>;
  key?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type CacheMinFields = {
  __typename?: 'CacheMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  expires?: Maybe<Scalars['timestamptz']>;
  key?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "cache" */
export type CacheMutationResponse = {
  __typename?: 'CacheMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Cache>;
};

/** on_conflict condition type for table "cache" */
export type CacheOnConflict = {
  constraint: CacheConstraint;
  update_columns?: Array<CacheUpdateColumn>;
  where?: InputMaybe<CacheBoolExp>;
};

/** Ordering options when selecting data from "cache". */
export type CacheOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  expires?: InputMaybe<OrderBy>;
  key?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  value?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: cache */
export type CachePkColumnsInput = {
  key: Scalars['String'];
};

/** prepend existing jsonb value of filtered columns with new jsonb value */
export type CachePrependInput = {
  value?: InputMaybe<Scalars['jsonb']>;
};

/** select columns of table "cache" */
export enum CacheSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Expires = 'expires',
  /** column name */
  Key = 'key',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value'
}

/** input type for updating data in table "cache" */
export type CacheSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expires?: InputMaybe<Scalars['timestamptz']>;
  key?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  value?: InputMaybe<Scalars['jsonb']>;
};

/** update columns of table "cache" */
export enum CacheUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Expires = 'expires',
  /** column name */
  Key = 'key',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  Value = 'value'
}

export type CacheUpdates = {
  /** append existing jsonb value of filtered columns with new jsonb value */
  _append?: InputMaybe<CacheAppendInput>;
  /** delete the field or element with specified path (for JSON arrays, negative integers count from the end) */
  _deleteAtPath?: InputMaybe<CacheDeleteAtPathInput>;
  /** delete the array element with specified index (negative integers count from the end). throws an error if top level container is not an array */
  _deleteElem?: InputMaybe<CacheDeleteElemInput>;
  /** delete key/value pair or string element. key/value pairs are matched based on their key value */
  _deleteKey?: InputMaybe<CacheDeleteKeyInput>;
  /** prepend existing jsonb value of filtered columns with new jsonb value */
  _prepend?: InputMaybe<CachePrependInput>;
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CacheSetInput>;
  where: CacheBoolExp;
};

/** columns and relationships of "collection_roles" */
export type CollectionRoles = {
  __typename?: 'CollectionRoles';
  /** An object relationship */
  collection: Collections;
  collectionId: Scalars['String'];
  createdAt: Scalars['timestamptz'];
  role: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
};

/** aggregated selection of "collection_roles" */
export type CollectionRolesAggregate = {
  __typename?: 'CollectionRolesAggregate';
  aggregate?: Maybe<CollectionRolesAggregateFields>;
  nodes: Array<CollectionRoles>;
};

/** aggregate fields of "collection_roles" */
export type CollectionRolesAggregateFields = {
  __typename?: 'CollectionRolesAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<CollectionRolesMaxFields>;
  min?: Maybe<CollectionRolesMinFields>;
};


/** aggregate fields of "collection_roles" */
export type CollectionRolesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "collection_roles" */
export type CollectionRolesAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Collection_Roles_Max_Order_By>;
  min?: InputMaybe<Collection_Roles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "collection_roles" */
export type CollectionRolesArrRelInsertInput = {
  data: Array<CollectionRolesInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<CollectionRolesOnConflict>;
};

/** Boolean expression to filter rows from the table "collection_roles". All fields are combined with a logical 'AND'. */
export type CollectionRolesBoolExp = {
  _and?: InputMaybe<Array<CollectionRolesBoolExp>>;
  _not?: InputMaybe<CollectionRolesBoolExp>;
  _or?: InputMaybe<Array<CollectionRolesBoolExp>>;
  collection?: InputMaybe<CollectionsBoolExp>;
  collectionId?: InputMaybe<StringComparisonExp>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  role?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
};

/** unique or primary key constraints on table "collection_roles" */
export enum CollectionRolesConstraint {
  /** unique or primary key constraint on columns "collection_id", "user_id" */
  CollectionRolesPkey = 'collection_roles_pkey'
}

/** input type for inserting data into table "collection_roles" */
export type CollectionRolesInsertInput = {
  collection?: InputMaybe<CollectionsObjRelInsertInput>;
  collectionId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** aggregate max on columns */
export type CollectionRolesMaxFields = {
  __typename?: 'CollectionRolesMaxFields';
  collectionId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** aggregate min on columns */
export type CollectionRolesMinFields = {
  __typename?: 'CollectionRolesMinFields';
  collectionId?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['timestamptz']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
};

/** response of any mutation on the table "collection_roles" */
export type CollectionRolesMutationResponse = {
  __typename?: 'CollectionRolesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<CollectionRoles>;
};

/** on_conflict condition type for table "collection_roles" */
export type CollectionRolesOnConflict = {
  constraint: CollectionRolesConstraint;
  update_columns?: Array<CollectionRolesUpdateColumn>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};

/** Ordering options when selecting data from "collection_roles". */
export type CollectionRolesOrderBy = {
  collection?: InputMaybe<CollectionsOrderBy>;
  collectionId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: collection_roles */
export type CollectionRolesPkColumnsInput = {
  collectionId: Scalars['String'];
  userId: Scalars['uuid'];
};

/** select columns of table "collection_roles" */
export enum CollectionRolesSelectColumn {
  /** column name */
  CollectionId = 'collectionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

/** input type for updating data in table "collection_roles" */
export type CollectionRolesSetInput = {
  collectionId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** update columns of table "collection_roles" */
export enum CollectionRolesUpdateColumn {
  /** column name */
  CollectionId = 'collectionId',
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId'
}

export type CollectionRolesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CollectionRolesSetInput>;
  where: CollectionRolesBoolExp;
};

/** columns and relationships of "collections" */
export type Collections = {
  __typename?: 'Collections';
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  name: Scalars['String'];
  /** An array relationship */
  roles: Array<CollectionRoles>;
  /** An aggregate relationship */
  rolesAggregate: CollectionRolesAggregate;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "collections" */
export type CollectionsRolesArgs = {
  distinctOn?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionRolesOrderBy>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};


/** columns and relationships of "collections" */
export type CollectionsRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionRolesOrderBy>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};

/** aggregated selection of "collections" */
export type CollectionsAggregate = {
  __typename?: 'CollectionsAggregate';
  aggregate?: Maybe<CollectionsAggregateFields>;
  nodes: Array<Collections>;
};

/** aggregate fields of "collections" */
export type CollectionsAggregateFields = {
  __typename?: 'CollectionsAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<CollectionsMaxFields>;
  min?: Maybe<CollectionsMinFields>;
};


/** aggregate fields of "collections" */
export type CollectionsAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<CollectionsSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "collections". All fields are combined with a logical 'AND'. */
export type CollectionsBoolExp = {
  _and?: InputMaybe<Array<CollectionsBoolExp>>;
  _not?: InputMaybe<CollectionsBoolExp>;
  _or?: InputMaybe<Array<CollectionsBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  roles?: InputMaybe<CollectionRolesBoolExp>;
  roles_aggregate?: InputMaybe<Collection_Roles_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "collections" */
export enum CollectionsConstraint {
  /** unique or primary key constraint on columns "id" */
  CollectionsPkey = 'collections_pkey'
}

/** input type for inserting data into table "collections" */
export type CollectionsInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<CollectionRolesArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type CollectionsMaxFields = {
  __typename?: 'CollectionsMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type CollectionsMinFields = {
  __typename?: 'CollectionsMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "collections" */
export type CollectionsMutationResponse = {
  __typename?: 'CollectionsMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Collections>;
};

/** input type for inserting object relation for remote table "collections" */
export type CollectionsObjRelInsertInput = {
  data: CollectionsInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<CollectionsOnConflict>;
};

/** on_conflict condition type for table "collections" */
export type CollectionsOnConflict = {
  constraint: CollectionsConstraint;
  update_columns?: Array<CollectionsUpdateColumn>;
  where?: InputMaybe<CollectionsBoolExp>;
};

/** Ordering options when selecting data from "collections". */
export type CollectionsOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  rolesAggregate?: InputMaybe<CollectionRolesAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: collections */
export type CollectionsPkColumnsInput = {
  id: Scalars['String'];
};

/** select columns of table "collections" */
export enum CollectionsSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "collections" */
export type CollectionsSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "collections" */
export enum CollectionsUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type CollectionsUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<CollectionsSetInput>;
  where: CollectionsBoolExp;
};

/** ordering argument of a cursor */
export enum CursorOrdering {
  /** ascending ordering of the cursor */
  Asc = 'ASC',
  /** descending ordering of the cursor */
  Desc = 'DESC'
}

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type IntComparisonExp = {
  _eq?: InputMaybe<Scalars['Int']>;
  _gt?: InputMaybe<Scalars['Int']>;
  _gte?: InputMaybe<Scalars['Int']>;
  _in?: InputMaybe<Array<Scalars['Int']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['Int']>;
  _lte?: InputMaybe<Scalars['Int']>;
  _neq?: InputMaybe<Scalars['Int']>;
  _nin?: InputMaybe<Array<Scalars['Int']>>;
};

export type JsonbCastExp = {
  String?: InputMaybe<StringComparisonExp>;
};

/** Boolean expression to compare columns of type "jsonb". All fields are combined with logical 'AND'. */
export type JsonbComparisonExp = {
  _cast?: InputMaybe<JsonbCastExp>;
  /** is the column contained in the given json value */
  _containedIn?: InputMaybe<Scalars['jsonb']>;
  /** does the column contain the given json value at the top level */
  _contains?: InputMaybe<Scalars['jsonb']>;
  _eq?: InputMaybe<Scalars['jsonb']>;
  _gt?: InputMaybe<Scalars['jsonb']>;
  _gte?: InputMaybe<Scalars['jsonb']>;
  /** does the string exist as a top-level key in the column */
  _hasKey?: InputMaybe<Scalars['String']>;
  /** do all of these strings exist as top-level keys in the column */
  _hasKeysAll?: InputMaybe<Array<Scalars['String']>>;
  /** do any of these strings exist as top-level keys in the column */
  _hasKeysAny?: InputMaybe<Array<Scalars['String']>>;
  _in?: InputMaybe<Array<Scalars['jsonb']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['jsonb']>;
  _lte?: InputMaybe<Scalars['jsonb']>;
  _neq?: InputMaybe<Scalars['jsonb']>;
  _nin?: InputMaybe<Array<Scalars['jsonb']>>;
};

/** column ordering options */
export enum OrderBy {
  /** in ascending order, nulls last */
  Asc = 'ASC',
  /** in ascending order, nulls first */
  AscNullsFirst = 'ASC_NULLS_FIRST',
  /** in ascending order, nulls last */
  AscNullsLast = 'ASC_NULLS_LAST',
  /** in descending order, nulls first */
  Desc = 'DESC',
  /** in descending order, nulls first */
  DescNullsFirst = 'DESC_NULLS_FIRST',
  /** in descending order, nulls last */
  DescNullsLast = 'DESC_NULLS_LAST'
}

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type StringComparisonExp = {
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  /** does the column match the given case-insensitive pattern */
  _ilike?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<Scalars['String']>>;
  /** does the column match the given POSIX regular expression, case insensitive */
  _iregex?: InputMaybe<Scalars['String']>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  /** does the column match the given pattern */
  _like?: InputMaybe<Scalars['String']>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given case-insensitive pattern */
  _nilike?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<Scalars['String']>>;
  /** does the column NOT match the given POSIX regular expression, case insensitive */
  _niregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given pattern */
  _nlike?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given POSIX regular expression, case sensitive */
  _nregex?: InputMaybe<Scalars['String']>;
  /** does the column NOT match the given SQL regular expression */
  _nsimilar?: InputMaybe<Scalars['String']>;
  /** does the column match the given POSIX regular expression, case sensitive */
  _regex?: InputMaybe<Scalars['String']>;
  /** does the column match the given SQL regular expression */
  _similar?: InputMaybe<Scalars['String']>;
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type TimestamptzComparisonExp = {
  _eq?: InputMaybe<Scalars['timestamptz']>;
  _gt?: InputMaybe<Scalars['timestamptz']>;
  _gte?: InputMaybe<Scalars['timestamptz']>;
  _in?: InputMaybe<Array<Scalars['timestamptz']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['timestamptz']>;
  _lte?: InputMaybe<Scalars['timestamptz']>;
  _neq?: InputMaybe<Scalars['timestamptz']>;
  _nin?: InputMaybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
  __typename?: 'Users';
  createdAt: Scalars['timestamptz'];
  email: Scalars['String'];
  id: Scalars['uuid'];
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  /** An array relationship */
  roles: Array<CollectionRoles>;
  /** An aggregate relationship */
  rolesAggregate: CollectionRolesAggregate;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "users" */
export type UsersRolesArgs = {
  distinctOn?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionRolesOrderBy>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};


/** columns and relationships of "users" */
export type UsersRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionRolesOrderBy>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};

/** aggregated selection of "users" */
export type UsersAggregate = {
  __typename?: 'UsersAggregate';
  aggregate?: Maybe<UsersAggregateFields>;
  nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type UsersAggregateFields = {
  __typename?: 'UsersAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<UsersMaxFields>;
  min?: Maybe<UsersMinFields>;
};


/** aggregate fields of "users" */
export type UsersAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<UsersSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type UsersBoolExp = {
  _and?: InputMaybe<Array<UsersBoolExp>>;
  _not?: InputMaybe<UsersBoolExp>;
  _or?: InputMaybe<Array<UsersBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  email?: InputMaybe<StringComparisonExp>;
  id?: InputMaybe<UuidComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  photo?: InputMaybe<StringComparisonExp>;
  roles?: InputMaybe<CollectionRolesBoolExp>;
  roles_aggregate?: InputMaybe<Collection_Roles_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "users" */
export enum UsersConstraint {
  /** unique or primary key constraint on columns "email" */
  UsersEmailKey = 'users_email_key',
  /** unique or primary key constraint on columns "id" */
  UsersPkey = 'users_pkey'
}

/** input type for inserting data into table "users" */
export type UsersInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<CollectionRolesArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type UsersMaxFields = {
  __typename?: 'UsersMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type UsersMinFields = {
  __typename?: 'UsersMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  email?: Maybe<Scalars['String']>;
  id?: Maybe<Scalars['uuid']>;
  name?: Maybe<Scalars['String']>;
  photo?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "users" */
export type UsersMutationResponse = {
  __typename?: 'UsersMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type UsersObjRelInsertInput = {
  data: UsersInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<UsersOnConflict>;
};

/** on_conflict condition type for table "users" */
export type UsersOnConflict = {
  constraint: UsersConstraint;
  update_columns?: Array<UsersUpdateColumn>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Ordering options when selecting data from "users". */
export type UsersOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  email?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  photo?: InputMaybe<OrderBy>;
  rolesAggregate?: InputMaybe<CollectionRolesAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: users */
export type UsersPkColumnsInput = {
  id: Scalars['uuid'];
};

/** select columns of table "users" */
export enum UsersSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Photo = 'photo',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "users" */
export type UsersSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "users" */
export enum UsersUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Email = 'email',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  Photo = 'photo',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type UsersUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type UuidComparisonExp = {
  _eq?: InputMaybe<Scalars['uuid']>;
  _gt?: InputMaybe<Scalars['uuid']>;
  _gte?: InputMaybe<Scalars['uuid']>;
  _in?: InputMaybe<Array<Scalars['uuid']>>;
  _isNull?: InputMaybe<Scalars['Boolean']>;
  _lt?: InputMaybe<Scalars['uuid']>;
  _lte?: InputMaybe<Scalars['uuid']>;
  _neq?: InputMaybe<Scalars['uuid']>;
  _nin?: InputMaybe<Array<Scalars['uuid']>>;
};

/** Streaming cursor of the table "bookmarks" */
export type Bookmarks_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Bookmarks_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Bookmarks_StreamCursorValueInput = {
  articleData?: InputMaybe<Scalars['jsonb']>;
  collectionId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  createdById?: InputMaybe<Scalars['uuid']>;
  description?: InputMaybe<Scalars['String']>;
  embedData?: InputMaybe<Scalars['jsonb']>;
  html?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  image?: InputMaybe<Scalars['String']>;
  text?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  url?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "cache" */
export type Cache_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Cache_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Cache_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  expires?: InputMaybe<Scalars['timestamptz']>;
  key?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  value?: InputMaybe<Scalars['jsonb']>;
};

export type Collection_Roles_Aggregate_Bool_Exp = {
  count?: InputMaybe<Collection_Roles_Aggregate_Bool_Exp_Count>;
};

export type Collection_Roles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<CollectionRolesBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "collection_roles" */
export type Collection_Roles_Max_Order_By = {
  collectionId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "collection_roles" */
export type Collection_Roles_Min_Order_By = {
  collectionId?: InputMaybe<OrderBy>;
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "collection_roles" */
export type Collection_Roles_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Collection_Roles_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Collection_Roles_StreamCursorValueInput = {
  collectionId?: InputMaybe<Scalars['String']>;
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
};

/** Streaming cursor of the table "collections" */
export type Collections_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Collections_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Collections_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "bookmarks" */
  deleteBookmarks?: Maybe<BookmarksMutationResponse>;
  /** delete single row from the table: "bookmarks" */
  deleteBookmarksByPk?: Maybe<Bookmarks>;
  /** delete data from the table: "cache" */
  deleteCache?: Maybe<CacheMutationResponse>;
  /** delete single row from the table: "cache" */
  deleteCacheByPk?: Maybe<Cache>;
  /** delete data from the table: "collection_roles" */
  deleteCollectionRoles?: Maybe<CollectionRolesMutationResponse>;
  /** delete single row from the table: "collection_roles" */
  deleteCollectionRolesByPk?: Maybe<CollectionRoles>;
  /** delete data from the table: "collections" */
  deleteCollections?: Maybe<CollectionsMutationResponse>;
  /** delete single row from the table: "collections" */
  deleteCollectionsByPk?: Maybe<Collections>;
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  /** insert data into the table: "bookmarks" */
  insertBookmarks?: Maybe<BookmarksMutationResponse>;
  /** insert a single row into the table: "bookmarks" */
  insertBookmarksOne?: Maybe<Bookmarks>;
  /** insert data into the table: "cache" */
  insertCache?: Maybe<CacheMutationResponse>;
  /** insert a single row into the table: "cache" */
  insertCacheOne?: Maybe<Cache>;
  /** insert data into the table: "collection_roles" */
  insertCollectionRoles?: Maybe<CollectionRolesMutationResponse>;
  /** insert a single row into the table: "collection_roles" */
  insertCollectionRolesOne?: Maybe<CollectionRoles>;
  /** insert data into the table: "collections" */
  insertCollections?: Maybe<CollectionsMutationResponse>;
  /** insert a single row into the table: "collections" */
  insertCollectionsOne?: Maybe<Collections>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  /** update data of the table: "bookmarks" */
  updateBookmarks?: Maybe<BookmarksMutationResponse>;
  /** update single row of the table: "bookmarks" */
  updateBookmarksByPk?: Maybe<Bookmarks>;
  /** update multiples rows of table: "bookmarks" */
  updateBookmarksMany?: Maybe<Array<Maybe<BookmarksMutationResponse>>>;
  /** update data of the table: "cache" */
  updateCache?: Maybe<CacheMutationResponse>;
  /** update single row of the table: "cache" */
  updateCacheByPk?: Maybe<Cache>;
  /** update multiples rows of table: "cache" */
  updateCacheMany?: Maybe<Array<Maybe<CacheMutationResponse>>>;
  /** update data of the table: "collection_roles" */
  updateCollectionRoles?: Maybe<CollectionRolesMutationResponse>;
  /** update single row of the table: "collection_roles" */
  updateCollectionRolesByPk?: Maybe<CollectionRoles>;
  /** update multiples rows of table: "collection_roles" */
  updateCollectionRolesMany?: Maybe<Array<Maybe<CollectionRolesMutationResponse>>>;
  /** update data of the table: "collections" */
  updateCollections?: Maybe<CollectionsMutationResponse>;
  /** update single row of the table: "collections" */
  updateCollectionsByPk?: Maybe<Collections>;
  /** update multiples rows of table: "collections" */
  updateCollectionsMany?: Maybe<Array<Maybe<CollectionsMutationResponse>>>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
};


/** mutation root */
export type Mutation_RootDeleteBookmarksArgs = {
  where: BookmarksBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteBookmarksByPkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteCacheArgs = {
  where: CacheBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCacheByPkArgs = {
  key: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteCollectionRolesArgs = {
  where: CollectionRolesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCollectionRolesByPkArgs = {
  collectionId: Scalars['String'];
  userId: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDeleteCollectionsArgs = {
  where: CollectionsBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteCollectionsByPkArgs = {
  id: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteUsersArgs = {
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteUsersByPkArgs = {
  id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootInsertBookmarksArgs = {
  objects: Array<BookmarksInsertInput>;
  onConflict?: InputMaybe<BookmarksOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertBookmarksOneArgs = {
  object: BookmarksInsertInput;
  onConflict?: InputMaybe<BookmarksOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCacheArgs = {
  objects: Array<CacheInsertInput>;
  onConflict?: InputMaybe<CacheOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCacheOneArgs = {
  object: CacheInsertInput;
  onConflict?: InputMaybe<CacheOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCollectionRolesArgs = {
  objects: Array<CollectionRolesInsertInput>;
  onConflict?: InputMaybe<CollectionRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCollectionRolesOneArgs = {
  object: CollectionRolesInsertInput;
  onConflict?: InputMaybe<CollectionRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCollectionsArgs = {
  objects: Array<CollectionsInsertInput>;
  onConflict?: InputMaybe<CollectionsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertCollectionsOneArgs = {
  object: CollectionsInsertInput;
  onConflict?: InputMaybe<CollectionsOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersArgs = {
  objects: Array<UsersInsertInput>;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertUsersOneArgs = {
  object: UsersInsertInput;
  onConflict?: InputMaybe<UsersOnConflict>;
};


/** mutation root */
export type Mutation_RootUpdateBookmarksArgs = {
  _append?: InputMaybe<BookmarksAppendInput>;
  _deleteAtPath?: InputMaybe<BookmarksDeleteAtPathInput>;
  _deleteElem?: InputMaybe<BookmarksDeleteElemInput>;
  _deleteKey?: InputMaybe<BookmarksDeleteKeyInput>;
  _prepend?: InputMaybe<BookmarksPrependInput>;
  _set?: InputMaybe<BookmarksSetInput>;
  where: BookmarksBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateBookmarksByPkArgs = {
  _append?: InputMaybe<BookmarksAppendInput>;
  _deleteAtPath?: InputMaybe<BookmarksDeleteAtPathInput>;
  _deleteElem?: InputMaybe<BookmarksDeleteElemInput>;
  _deleteKey?: InputMaybe<BookmarksDeleteKeyInput>;
  _prepend?: InputMaybe<BookmarksPrependInput>;
  _set?: InputMaybe<BookmarksSetInput>;
  pk_columns: BookmarksPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateBookmarksManyArgs = {
  updates: Array<BookmarksUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCacheArgs = {
  _append?: InputMaybe<CacheAppendInput>;
  _deleteAtPath?: InputMaybe<CacheDeleteAtPathInput>;
  _deleteElem?: InputMaybe<CacheDeleteElemInput>;
  _deleteKey?: InputMaybe<CacheDeleteKeyInput>;
  _prepend?: InputMaybe<CachePrependInput>;
  _set?: InputMaybe<CacheSetInput>;
  where: CacheBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCacheByPkArgs = {
  _append?: InputMaybe<CacheAppendInput>;
  _deleteAtPath?: InputMaybe<CacheDeleteAtPathInput>;
  _deleteElem?: InputMaybe<CacheDeleteElemInput>;
  _deleteKey?: InputMaybe<CacheDeleteKeyInput>;
  _prepend?: InputMaybe<CachePrependInput>;
  _set?: InputMaybe<CacheSetInput>;
  pk_columns: CachePkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCacheManyArgs = {
  updates: Array<CacheUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCollectionRolesArgs = {
  _set?: InputMaybe<CollectionRolesSetInput>;
  where: CollectionRolesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCollectionRolesByPkArgs = {
  _set?: InputMaybe<CollectionRolesSetInput>;
  pk_columns: CollectionRolesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCollectionRolesManyArgs = {
  updates: Array<CollectionRolesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateCollectionsArgs = {
  _set?: InputMaybe<CollectionsSetInput>;
  where: CollectionsBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateCollectionsByPkArgs = {
  _set?: InputMaybe<CollectionsSetInput>;
  pk_columns: CollectionsPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateCollectionsManyArgs = {
  updates: Array<CollectionsUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateUsersArgs = {
  _set?: InputMaybe<UsersSetInput>;
  where: UsersBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateUsersByPkArgs = {
  _set?: InputMaybe<UsersSetInput>;
  pk_columns: UsersPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateUsersManyArgs = {
  updates: Array<UsersUpdates>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "bookmarks" */
  bookmarks: Array<Bookmarks>;
  /** fetch aggregated fields from the table: "bookmarks" */
  bookmarksAggregate: BookmarksAggregate;
  /** fetch data from the table: "bookmarks" using primary key columns */
  bookmarksByPk?: Maybe<Bookmarks>;
  /** fetch data from the table: "cache" */
  cache: Array<Cache>;
  /** fetch aggregated fields from the table: "cache" */
  cacheAggregate: CacheAggregate;
  /** fetch data from the table: "cache" using primary key columns */
  cacheByPk?: Maybe<Cache>;
  /** fetch data from the table: "collection_roles" */
  collectionRoles: Array<CollectionRoles>;
  /** fetch aggregated fields from the table: "collection_roles" */
  collectionRolesAggregate: CollectionRolesAggregate;
  /** fetch data from the table: "collection_roles" using primary key columns */
  collectionRolesByPk?: Maybe<CollectionRoles>;
  /** fetch data from the table: "collections" */
  collections: Array<Collections>;
  /** fetch aggregated fields from the table: "collections" */
  collectionsAggregate: CollectionsAggregate;
  /** fetch data from the table: "collections" using primary key columns */
  collectionsByPk?: Maybe<Collections>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
};


export type Query_RootBookmarksArgs = {
  distinctOn?: InputMaybe<Array<BookmarksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BookmarksOrderBy>>;
  where?: InputMaybe<BookmarksBoolExp>;
};


export type Query_RootBookmarksAggregateArgs = {
  distinctOn?: InputMaybe<Array<BookmarksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BookmarksOrderBy>>;
  where?: InputMaybe<BookmarksBoolExp>;
};


export type Query_RootBookmarksByPkArgs = {
  id: Scalars['String'];
};


export type Query_RootCacheArgs = {
  distinctOn?: InputMaybe<Array<CacheSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CacheOrderBy>>;
  where?: InputMaybe<CacheBoolExp>;
};


export type Query_RootCacheAggregateArgs = {
  distinctOn?: InputMaybe<Array<CacheSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CacheOrderBy>>;
  where?: InputMaybe<CacheBoolExp>;
};


export type Query_RootCacheByPkArgs = {
  key: Scalars['String'];
};


export type Query_RootCollectionRolesArgs = {
  distinctOn?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionRolesOrderBy>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};


export type Query_RootCollectionRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionRolesOrderBy>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};


export type Query_RootCollectionRolesByPkArgs = {
  collectionId: Scalars['String'];
  userId: Scalars['uuid'];
};


export type Query_RootCollectionsArgs = {
  distinctOn?: InputMaybe<Array<CollectionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionsOrderBy>>;
  where?: InputMaybe<CollectionsBoolExp>;
};


export type Query_RootCollectionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CollectionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionsOrderBy>>;
  where?: InputMaybe<CollectionsBoolExp>;
};


export type Query_RootCollectionsByPkArgs = {
  id: Scalars['String'];
};


export type Query_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Query_RootUsersByPkArgs = {
  id: Scalars['uuid'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "bookmarks" */
  bookmarks: Array<Bookmarks>;
  /** fetch aggregated fields from the table: "bookmarks" */
  bookmarksAggregate: BookmarksAggregate;
  /** fetch data from the table: "bookmarks" using primary key columns */
  bookmarksByPk?: Maybe<Bookmarks>;
  /** fetch data from the table in a streaming manner: "bookmarks" */
  bookmarksStream: Array<Bookmarks>;
  /** fetch data from the table: "cache" */
  cache: Array<Cache>;
  /** fetch aggregated fields from the table: "cache" */
  cacheAggregate: CacheAggregate;
  /** fetch data from the table: "cache" using primary key columns */
  cacheByPk?: Maybe<Cache>;
  /** fetch data from the table in a streaming manner: "cache" */
  cacheStream: Array<Cache>;
  /** fetch data from the table: "collection_roles" */
  collectionRoles: Array<CollectionRoles>;
  /** fetch aggregated fields from the table: "collection_roles" */
  collectionRolesAggregate: CollectionRolesAggregate;
  /** fetch data from the table: "collection_roles" using primary key columns */
  collectionRolesByPk?: Maybe<CollectionRoles>;
  /** fetch data from the table in a streaming manner: "collection_roles" */
  collectionRolesStream: Array<CollectionRoles>;
  /** fetch data from the table: "collections" */
  collections: Array<Collections>;
  /** fetch aggregated fields from the table: "collections" */
  collectionsAggregate: CollectionsAggregate;
  /** fetch data from the table: "collections" using primary key columns */
  collectionsByPk?: Maybe<Collections>;
  /** fetch data from the table in a streaming manner: "collections" */
  collectionsStream: Array<Collections>;
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  usersStream: Array<Users>;
};


export type Subscription_RootBookmarksArgs = {
  distinctOn?: InputMaybe<Array<BookmarksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BookmarksOrderBy>>;
  where?: InputMaybe<BookmarksBoolExp>;
};


export type Subscription_RootBookmarksAggregateArgs = {
  distinctOn?: InputMaybe<Array<BookmarksSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<BookmarksOrderBy>>;
  where?: InputMaybe<BookmarksBoolExp>;
};


export type Subscription_RootBookmarksByPkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootBookmarksStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Bookmarks_StreamCursorInput>>;
  where?: InputMaybe<BookmarksBoolExp>;
};


export type Subscription_RootCacheArgs = {
  distinctOn?: InputMaybe<Array<CacheSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CacheOrderBy>>;
  where?: InputMaybe<CacheBoolExp>;
};


export type Subscription_RootCacheAggregateArgs = {
  distinctOn?: InputMaybe<Array<CacheSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CacheOrderBy>>;
  where?: InputMaybe<CacheBoolExp>;
};


export type Subscription_RootCacheByPkArgs = {
  key: Scalars['String'];
};


export type Subscription_RootCacheStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Cache_StreamCursorInput>>;
  where?: InputMaybe<CacheBoolExp>;
};


export type Subscription_RootCollectionRolesArgs = {
  distinctOn?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionRolesOrderBy>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};


export type Subscription_RootCollectionRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<CollectionRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionRolesOrderBy>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};


export type Subscription_RootCollectionRolesByPkArgs = {
  collectionId: Scalars['String'];
  userId: Scalars['uuid'];
};


export type Subscription_RootCollectionRolesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Collection_Roles_StreamCursorInput>>;
  where?: InputMaybe<CollectionRolesBoolExp>;
};


export type Subscription_RootCollectionsArgs = {
  distinctOn?: InputMaybe<Array<CollectionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionsOrderBy>>;
  where?: InputMaybe<CollectionsBoolExp>;
};


export type Subscription_RootCollectionsAggregateArgs = {
  distinctOn?: InputMaybe<Array<CollectionsSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<CollectionsOrderBy>>;
  where?: InputMaybe<CollectionsBoolExp>;
};


export type Subscription_RootCollectionsByPkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootCollectionsStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Collections_StreamCursorInput>>;
  where?: InputMaybe<CollectionsBoolExp>;
};


export type Subscription_RootUsersArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersAggregateArgs = {
  distinctOn?: InputMaybe<Array<UsersSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<UsersOrderBy>>;
  where?: InputMaybe<UsersBoolExp>;
};


export type Subscription_RootUsersByPkArgs = {
  id: Scalars['uuid'];
};


export type Subscription_RootUsersStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Users_StreamCursorInput>>;
  where?: InputMaybe<UsersBoolExp>;
};

/** Streaming cursor of the table "users" */
export type Users_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Users_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Users_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['uuid']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

export type InsertBookmarkMutationVariables = Exact<{
  input: BookmarksInsertInput;
}>;


export type InsertBookmarkMutation = { __typename?: 'mutation_root', bookmark?: { __typename?: 'Bookmarks', id: string } | null };

export type UpdateBookmarkMutationVariables = Exact<{
  id: Scalars['String'];
  input: BookmarksSetInput;
}>;


export type UpdateBookmarkMutation = { __typename?: 'mutation_root', bookmark?: { __typename?: 'Bookmarks', id: string } | null };

export type DeleteBookmarkMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type DeleteBookmarkMutation = { __typename?: 'mutation_root', bookmark?: { __typename?: 'Bookmarks', id: string } | null };

export type BookmarkFragment = { __typename?: 'Bookmarks', id: string, title?: string | null, image?: string | null, description?: string | null, createdAt: any, collectionId: string, url: string };

export type BookmarkDetailsFragment = { __typename?: 'Bookmarks', articleData?: any | null, embedData?: any | null, text?: string | null, html?: string | null, createdAt: any, updatedAt: any, id: string, title?: string | null, image?: string | null, description?: string | null, collectionId: string, url: string, createdBy: { __typename?: 'Users', id: any, name?: string | null, email: string } };

export type GetBookmarksByCollectionQueryVariables = Exact<{
  collectionId: Scalars['String'];
}>;


export type GetBookmarksByCollectionQuery = { __typename?: 'query_root', bookmarks: Array<{ __typename?: 'Bookmarks', id: string, title?: string | null, image?: string | null, description?: string | null, createdAt: any, collectionId: string, url: string }> };

export type GetBookmarksByUserQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetBookmarksByUserQuery = { __typename?: 'query_root', bookmarks: Array<{ __typename?: 'Bookmarks', id: string, title?: string | null, image?: string | null, description?: string | null, createdAt: any, collectionId: string, url: string, collection: { __typename?: 'Collections', name: string, id: string } }> };

export type GetBookmarkByIdQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetBookmarkByIdQuery = { __typename?: 'query_root', bookmark?: { __typename?: 'Bookmarks', articleData?: any | null, embedData?: any | null, text?: string | null, html?: string | null, createdAt: any, updatedAt: any, id: string, title?: string | null, image?: string | null, description?: string | null, collectionId: string, url: string, createdBy: { __typename?: 'Users', id: any, name?: string | null, email: string } } | null };

export type GetCacheItemQueryVariables = Exact<{
  key: Scalars['String'];
}>;


export type GetCacheItemQuery = { __typename?: 'query_root', item?: { __typename?: 'Cache', key: string, value: any, expires?: any | null } | null };

export type SetCacheItemMutationVariables = Exact<{
  input: CacheInsertInput;
}>;


export type SetCacheItemMutation = { __typename?: 'mutation_root', item?: { __typename?: 'Cache', key: string, expires?: any | null, value: any } | null };

export type CreateCollectionMutationVariables = Exact<{
  name: Scalars['String'];
  userId: Scalars['uuid'];
}>;


export type CreateCollectionMutation = { __typename?: 'mutation_root', collection?: { __typename?: 'Collections', id: string, name: string } | null };

export type UserFieldsFragment = { __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null };

export type GetUsersByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersByEmailQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null }> };

export type GetUserRolesQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetUserRolesQuery = { __typename?: 'query_root', user?: { __typename?: 'Users', roles: Array<{ __typename?: 'CollectionRoles', role: string, collection: { __typename?: 'Collections', id: string, name: string } }> } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserByIdQuery = { __typename?: 'query_root', user?: { __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null, roles: Array<{ __typename?: 'CollectionRoles', role: string, collection: { __typename?: 'Collections', id: string, name: string } }> } | null };

export type GetAllUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetAllUsersQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null }> };

export type UpdateUserMutationVariables = Exact<{
  id: Scalars['uuid'];
  updates?: InputMaybe<UsersSetInput>;
}>;


export type UpdateUserMutation = { __typename?: 'mutation_root', user?: { __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null } | null };

export type InsertUserMutationVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  photo?: InputMaybe<Scalars['String']>;
}>;


export type InsertUserMutation = { __typename?: 'mutation_root', user?: { __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null } | null };

export const BookmarkFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Bookmark"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmarks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<BookmarkFragment, unknown>;
export const BookmarkDetailsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookmarkDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmarks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Bookmark"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"articleData"}},{"kind":"Field","name":{"kind":"Name","value":"embedData"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"html"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Bookmark"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmarks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<BookmarkDetailsFragment, unknown>;
export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const InsertBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarksInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookmark"},"name":{"kind":"Name","value":"insertBookmarksOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<InsertBookmarkMutation, InsertBookmarkMutationVariables>;
export const UpdateBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"BookmarksSetInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookmark"},"name":{"kind":"Name","value":"updateBookmarksByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<UpdateBookmarkMutation, UpdateBookmarkMutationVariables>;
export const DeleteBookmarkDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"DeleteBookmark"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookmark"},"name":{"kind":"Name","value":"deleteBookmarksByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<DeleteBookmarkMutation, DeleteBookmarkMutationVariables>;
export const GetBookmarksByCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookmarksByCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"collectionId"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"collectionId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdAt"},"value":{"kind":"EnumValue","value":"DESC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Bookmark"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Bookmark"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmarks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<GetBookmarksByCollectionQuery, GetBookmarksByCollectionQueryVariables>;
export const GetBookmarksByUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookmarksByUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"bookmarks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdById"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_eq"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"createdAt"},"value":{"kind":"EnumValue","value":"DESC"}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Bookmark"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Bookmark"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmarks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}}]} as unknown as DocumentNode<GetBookmarksByUserQuery, GetBookmarksByUserQueryVariables>;
export const GetBookmarkByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetBookmarkById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"bookmark"},"name":{"kind":"Name","value":"bookmarksByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"BookmarkDetails"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"Bookmark"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmarks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"title"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"description"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"collectionId"}},{"kind":"Field","name":{"kind":"Name","value":"url"}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"BookmarkDetails"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Bookmarks"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"Bookmark"}},{"kind":"Field","name":{"kind":"Name","value":"createdBy"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}}]}},{"kind":"Field","name":{"kind":"Name","value":"articleData"}},{"kind":"Field","name":{"kind":"Name","value":"embedData"}},{"kind":"Field","name":{"kind":"Name","value":"text"}},{"kind":"Field","name":{"kind":"Name","value":"html"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}}]}}]} as unknown as DocumentNode<GetBookmarkByIdQuery, GetBookmarkByIdQueryVariables>;
export const GetCacheItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetCacheItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"key"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"item"},"name":{"kind":"Name","value":"cacheByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"key"},"value":{"kind":"Variable","name":{"kind":"Name","value":"key"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"value"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}}]}}]}}]} as unknown as DocumentNode<GetCacheItemQuery, GetCacheItemQueryVariables>;
export const SetCacheItemDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"SetCacheItem"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CacheInsertInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"item"},"name":{"kind":"Name","value":"insertCacheOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"cache_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"value"},{"kind":"EnumValue","value":"expires"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"key"}},{"kind":"Field","name":{"kind":"Name","value":"expires"}},{"kind":"Field","name":{"kind":"Name","value":"value"}}]}}]}}]} as unknown as DocumentNode<SetCacheItemMutation, SetCacheItemMutationVariables>;
export const CreateCollectionDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateCollection"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"collection"},"name":{"kind":"Name","value":"insertCollectionsOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"roles"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"role"},"value":{"kind":"StringValue","value":"owner","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"collection_roles_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"role"}]}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"collections_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"name"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateCollectionMutation, CreateCollectionMutationVariables>;
export const GetUsersByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_ilike"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>;
export const GetUserRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"usersByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserRolesQuery, GetUserRolesQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"usersByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"collection"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"collection"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updates"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UsersSetInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"updateUsersByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updates"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const InsertUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"insertUsersOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"photo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photo"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<InsertUserMutation, InsertUserMutationVariables>;