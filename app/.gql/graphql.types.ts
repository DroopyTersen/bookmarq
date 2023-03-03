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
  timestamptz: any;
  uuid: any;
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
  roles: Array<WorkspaceRoles>;
  /** An aggregate relationship */
  rolesAggregate: WorkspaceRolesAggregate;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "users" */
export type UsersRolesArgs = {
  distinctOn?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspaceRolesOrderBy>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};


/** columns and relationships of "users" */
export type UsersRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspaceRolesOrderBy>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
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
  roles?: InputMaybe<WorkspaceRolesBoolExp>;
  roles_aggregate?: InputMaybe<Workspace_Roles_Aggregate_Bool_Exp>;
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
  roles?: InputMaybe<WorkspaceRolesArrRelInsertInput>;
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
  rolesAggregate?: InputMaybe<WorkspaceRolesAggregateOrderBy>;
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

/** columns and relationships of "workspace_roles" */
export type WorkspaceRoles = {
  __typename?: 'WorkspaceRoles';
  createdAt: Scalars['timestamptz'];
  role: Scalars['String'];
  updatedAt: Scalars['timestamptz'];
  /** An object relationship */
  user: Users;
  userId: Scalars['uuid'];
  /** An object relationship */
  workspace: Workspaces;
  workspaceId: Scalars['String'];
};

/** aggregated selection of "workspace_roles" */
export type WorkspaceRolesAggregate = {
  __typename?: 'WorkspaceRolesAggregate';
  aggregate?: Maybe<WorkspaceRolesAggregateFields>;
  nodes: Array<WorkspaceRoles>;
};

/** aggregate fields of "workspace_roles" */
export type WorkspaceRolesAggregateFields = {
  __typename?: 'WorkspaceRolesAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<WorkspaceRolesMaxFields>;
  min?: Maybe<WorkspaceRolesMinFields>;
};


/** aggregate fields of "workspace_roles" */
export type WorkspaceRolesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "workspace_roles" */
export type WorkspaceRolesAggregateOrderBy = {
  count?: InputMaybe<OrderBy>;
  max?: InputMaybe<Workspace_Roles_Max_Order_By>;
  min?: InputMaybe<Workspace_Roles_Min_Order_By>;
};

/** input type for inserting array relation for remote table "workspace_roles" */
export type WorkspaceRolesArrRelInsertInput = {
  data: Array<WorkspaceRolesInsertInput>;
  /** upsert condition */
  onConflict?: InputMaybe<WorkspaceRolesOnConflict>;
};

/** Boolean expression to filter rows from the table "workspace_roles". All fields are combined with a logical 'AND'. */
export type WorkspaceRolesBoolExp = {
  _and?: InputMaybe<Array<WorkspaceRolesBoolExp>>;
  _not?: InputMaybe<WorkspaceRolesBoolExp>;
  _or?: InputMaybe<Array<WorkspaceRolesBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  role?: InputMaybe<StringComparisonExp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
  user?: InputMaybe<UsersBoolExp>;
  userId?: InputMaybe<UuidComparisonExp>;
  workspace?: InputMaybe<WorkspacesBoolExp>;
  workspaceId?: InputMaybe<StringComparisonExp>;
};

/** unique or primary key constraints on table "workspace_roles" */
export enum WorkspaceRolesConstraint {
  /** unique or primary key constraint on columns "workspace_id", "user_id" */
  WorkspaceRolesPkey = 'workspace_roles_pkey'
}

/** input type for inserting data into table "workspace_roles" */
export type WorkspaceRolesInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  user?: InputMaybe<UsersObjRelInsertInput>;
  userId?: InputMaybe<Scalars['uuid']>;
  workspace?: InputMaybe<WorkspacesObjRelInsertInput>;
  workspaceId?: InputMaybe<Scalars['String']>;
};

/** aggregate max on columns */
export type WorkspaceRolesMaxFields = {
  __typename?: 'WorkspaceRolesMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
  workspaceId?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type WorkspaceRolesMinFields = {
  __typename?: 'WorkspaceRolesMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  role?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
  userId?: Maybe<Scalars['uuid']>;
  workspaceId?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "workspace_roles" */
export type WorkspaceRolesMutationResponse = {
  __typename?: 'WorkspaceRolesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<WorkspaceRoles>;
};

/** on_conflict condition type for table "workspace_roles" */
export type WorkspaceRolesOnConflict = {
  constraint: WorkspaceRolesConstraint;
  update_columns?: Array<WorkspaceRolesUpdateColumn>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};

/** Ordering options when selecting data from "workspace_roles". */
export type WorkspaceRolesOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  user?: InputMaybe<UsersOrderBy>;
  userId?: InputMaybe<OrderBy>;
  workspace?: InputMaybe<WorkspacesOrderBy>;
  workspaceId?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: workspace_roles */
export type WorkspaceRolesPkColumnsInput = {
  userId: Scalars['uuid'];
  workspaceId: Scalars['String'];
};

/** select columns of table "workspace_roles" */
export enum WorkspaceRolesSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId',
  /** column name */
  WorkspaceId = 'workspaceId'
}

/** input type for updating data in table "workspace_roles" */
export type WorkspaceRolesSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['String']>;
};

/** update columns of table "workspace_roles" */
export enum WorkspaceRolesUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Role = 'role',
  /** column name */
  UpdatedAt = 'updatedAt',
  /** column name */
  UserId = 'userId',
  /** column name */
  WorkspaceId = 'workspaceId'
}

export type WorkspaceRolesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WorkspaceRolesSetInput>;
  where: WorkspaceRolesBoolExp;
};

/** columns and relationships of "workspaces" */
export type Workspaces = {
  __typename?: 'Workspaces';
  createdAt: Scalars['timestamptz'];
  id: Scalars['String'];
  name: Scalars['String'];
  /** An array relationship */
  roles: Array<WorkspaceRoles>;
  /** An aggregate relationship */
  rolesAggregate: WorkspaceRolesAggregate;
  updatedAt: Scalars['timestamptz'];
};


/** columns and relationships of "workspaces" */
export type WorkspacesRolesArgs = {
  distinctOn?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspaceRolesOrderBy>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};


/** columns and relationships of "workspaces" */
export type WorkspacesRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspaceRolesOrderBy>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};

/** aggregated selection of "workspaces" */
export type WorkspacesAggregate = {
  __typename?: 'WorkspacesAggregate';
  aggregate?: Maybe<WorkspacesAggregateFields>;
  nodes: Array<Workspaces>;
};

/** aggregate fields of "workspaces" */
export type WorkspacesAggregateFields = {
  __typename?: 'WorkspacesAggregateFields';
  count: Scalars['Int'];
  max?: Maybe<WorkspacesMaxFields>;
  min?: Maybe<WorkspacesMinFields>;
};


/** aggregate fields of "workspaces" */
export type WorkspacesAggregateFieldsCountArgs = {
  columns?: InputMaybe<Array<WorkspacesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
};

/** Boolean expression to filter rows from the table "workspaces". All fields are combined with a logical 'AND'. */
export type WorkspacesBoolExp = {
  _and?: InputMaybe<Array<WorkspacesBoolExp>>;
  _not?: InputMaybe<WorkspacesBoolExp>;
  _or?: InputMaybe<Array<WorkspacesBoolExp>>;
  createdAt?: InputMaybe<TimestamptzComparisonExp>;
  id?: InputMaybe<StringComparisonExp>;
  name?: InputMaybe<StringComparisonExp>;
  roles?: InputMaybe<WorkspaceRolesBoolExp>;
  roles_aggregate?: InputMaybe<Workspace_Roles_Aggregate_Bool_Exp>;
  updatedAt?: InputMaybe<TimestamptzComparisonExp>;
};

/** unique or primary key constraints on table "workspaces" */
export enum WorkspacesConstraint {
  /** unique or primary key constraint on columns "id" */
  WorkspacesPkey = 'workspaces_pkey'
}

/** input type for inserting data into table "workspaces" */
export type WorkspacesInsertInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  roles?: InputMaybe<WorkspaceRolesArrRelInsertInput>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type WorkspacesMaxFields = {
  __typename?: 'WorkspacesMaxFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type WorkspacesMinFields = {
  __typename?: 'WorkspacesMinFields';
  createdAt?: Maybe<Scalars['timestamptz']>;
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "workspaces" */
export type WorkspacesMutationResponse = {
  __typename?: 'WorkspacesMutationResponse';
  /** number of rows affected by the mutation */
  affected_rows: Scalars['Int'];
  /** data from the rows affected by the mutation */
  returning: Array<Workspaces>;
};

/** input type for inserting object relation for remote table "workspaces" */
export type WorkspacesObjRelInsertInput = {
  data: WorkspacesInsertInput;
  /** upsert condition */
  onConflict?: InputMaybe<WorkspacesOnConflict>;
};

/** on_conflict condition type for table "workspaces" */
export type WorkspacesOnConflict = {
  constraint: WorkspacesConstraint;
  update_columns?: Array<WorkspacesUpdateColumn>;
  where?: InputMaybe<WorkspacesBoolExp>;
};

/** Ordering options when selecting data from "workspaces". */
export type WorkspacesOrderBy = {
  createdAt?: InputMaybe<OrderBy>;
  id?: InputMaybe<OrderBy>;
  name?: InputMaybe<OrderBy>;
  rolesAggregate?: InputMaybe<WorkspaceRolesAggregateOrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
};

/** primary key columns input for table: workspaces */
export type WorkspacesPkColumnsInput = {
  id: Scalars['String'];
};

/** select columns of table "workspaces" */
export enum WorkspacesSelectColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

/** input type for updating data in table "workspaces" */
export type WorkspacesSetInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

/** update columns of table "workspaces" */
export enum WorkspacesUpdateColumn {
  /** column name */
  CreatedAt = 'createdAt',
  /** column name */
  Id = 'id',
  /** column name */
  Name = 'name',
  /** column name */
  UpdatedAt = 'updatedAt'
}

export type WorkspacesUpdates = {
  /** sets the columns of the filtered rows to the given values */
  _set?: InputMaybe<WorkspacesSetInput>;
  where: WorkspacesBoolExp;
};

/** mutation root */
export type Mutation_Root = {
  __typename?: 'mutation_root';
  /** delete data from the table: "users" */
  deleteUsers?: Maybe<UsersMutationResponse>;
  /** delete single row from the table: "users" */
  deleteUsersByPk?: Maybe<Users>;
  /** delete data from the table: "workspace_roles" */
  deleteWorkspaceRoles?: Maybe<WorkspaceRolesMutationResponse>;
  /** delete single row from the table: "workspace_roles" */
  deleteWorkspaceRolesByPk?: Maybe<WorkspaceRoles>;
  /** delete data from the table: "workspaces" */
  deleteWorkspaces?: Maybe<WorkspacesMutationResponse>;
  /** delete single row from the table: "workspaces" */
  deleteWorkspacesByPk?: Maybe<Workspaces>;
  /** insert data into the table: "users" */
  insertUsers?: Maybe<UsersMutationResponse>;
  /** insert a single row into the table: "users" */
  insertUsersOne?: Maybe<Users>;
  /** insert data into the table: "workspace_roles" */
  insertWorkspaceRoles?: Maybe<WorkspaceRolesMutationResponse>;
  /** insert a single row into the table: "workspace_roles" */
  insertWorkspaceRolesOne?: Maybe<WorkspaceRoles>;
  /** insert data into the table: "workspaces" */
  insertWorkspaces?: Maybe<WorkspacesMutationResponse>;
  /** insert a single row into the table: "workspaces" */
  insertWorkspacesOne?: Maybe<Workspaces>;
  /** update data of the table: "users" */
  updateUsers?: Maybe<UsersMutationResponse>;
  /** update single row of the table: "users" */
  updateUsersByPk?: Maybe<Users>;
  /** update multiples rows of table: "users" */
  updateUsersMany?: Maybe<Array<Maybe<UsersMutationResponse>>>;
  /** update data of the table: "workspace_roles" */
  updateWorkspaceRoles?: Maybe<WorkspaceRolesMutationResponse>;
  /** update single row of the table: "workspace_roles" */
  updateWorkspaceRolesByPk?: Maybe<WorkspaceRoles>;
  /** update multiples rows of table: "workspace_roles" */
  updateWorkspaceRolesMany?: Maybe<Array<Maybe<WorkspaceRolesMutationResponse>>>;
  /** update data of the table: "workspaces" */
  updateWorkspaces?: Maybe<WorkspacesMutationResponse>;
  /** update single row of the table: "workspaces" */
  updateWorkspacesByPk?: Maybe<Workspaces>;
  /** update multiples rows of table: "workspaces" */
  updateWorkspacesMany?: Maybe<Array<Maybe<WorkspacesMutationResponse>>>;
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
export type Mutation_RootDeleteWorkspaceRolesArgs = {
  where: WorkspaceRolesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteWorkspaceRolesByPkArgs = {
  userId: Scalars['uuid'];
  workspaceId: Scalars['String'];
};


/** mutation root */
export type Mutation_RootDeleteWorkspacesArgs = {
  where: WorkspacesBoolExp;
};


/** mutation root */
export type Mutation_RootDeleteWorkspacesByPkArgs = {
  id: Scalars['String'];
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
export type Mutation_RootInsertWorkspaceRolesArgs = {
  objects: Array<WorkspaceRolesInsertInput>;
  onConflict?: InputMaybe<WorkspaceRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkspaceRolesOneArgs = {
  object: WorkspaceRolesInsertInput;
  onConflict?: InputMaybe<WorkspaceRolesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkspacesArgs = {
  objects: Array<WorkspacesInsertInput>;
  onConflict?: InputMaybe<WorkspacesOnConflict>;
};


/** mutation root */
export type Mutation_RootInsertWorkspacesOneArgs = {
  object: WorkspacesInsertInput;
  onConflict?: InputMaybe<WorkspacesOnConflict>;
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


/** mutation root */
export type Mutation_RootUpdateWorkspaceRolesArgs = {
  _set?: InputMaybe<WorkspaceRolesSetInput>;
  where: WorkspaceRolesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateWorkspaceRolesByPkArgs = {
  _set?: InputMaybe<WorkspaceRolesSetInput>;
  pk_columns: WorkspaceRolesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkspaceRolesManyArgs = {
  updates: Array<WorkspaceRolesUpdates>;
};


/** mutation root */
export type Mutation_RootUpdateWorkspacesArgs = {
  _set?: InputMaybe<WorkspacesSetInput>;
  where: WorkspacesBoolExp;
};


/** mutation root */
export type Mutation_RootUpdateWorkspacesByPkArgs = {
  _set?: InputMaybe<WorkspacesSetInput>;
  pk_columns: WorkspacesPkColumnsInput;
};


/** mutation root */
export type Mutation_RootUpdateWorkspacesManyArgs = {
  updates: Array<WorkspacesUpdates>;
};

export type Query_Root = {
  __typename?: 'query_root';
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table: "workspace_roles" */
  workspaceRoles: Array<WorkspaceRoles>;
  /** fetch aggregated fields from the table: "workspace_roles" */
  workspaceRolesAggregate: WorkspaceRolesAggregate;
  /** fetch data from the table: "workspace_roles" using primary key columns */
  workspaceRolesByPk?: Maybe<WorkspaceRoles>;
  /** fetch data from the table: "workspaces" */
  workspaces: Array<Workspaces>;
  /** fetch aggregated fields from the table: "workspaces" */
  workspacesAggregate: WorkspacesAggregate;
  /** fetch data from the table: "workspaces" using primary key columns */
  workspacesByPk?: Maybe<Workspaces>;
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


export type Query_RootWorkspaceRolesArgs = {
  distinctOn?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspaceRolesOrderBy>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};


export type Query_RootWorkspaceRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspaceRolesOrderBy>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};


export type Query_RootWorkspaceRolesByPkArgs = {
  userId: Scalars['uuid'];
  workspaceId: Scalars['String'];
};


export type Query_RootWorkspacesArgs = {
  distinctOn?: InputMaybe<Array<WorkspacesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspacesOrderBy>>;
  where?: InputMaybe<WorkspacesBoolExp>;
};


export type Query_RootWorkspacesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkspacesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspacesOrderBy>>;
  where?: InputMaybe<WorkspacesBoolExp>;
};


export type Query_RootWorkspacesByPkArgs = {
  id: Scalars['String'];
};

export type Subscription_Root = {
  __typename?: 'subscription_root';
  /** fetch data from the table: "users" */
  users: Array<Users>;
  /** fetch aggregated fields from the table: "users" */
  usersAggregate: UsersAggregate;
  /** fetch data from the table: "users" using primary key columns */
  usersByPk?: Maybe<Users>;
  /** fetch data from the table in a streaming manner: "users" */
  usersStream: Array<Users>;
  /** fetch data from the table: "workspace_roles" */
  workspaceRoles: Array<WorkspaceRoles>;
  /** fetch aggregated fields from the table: "workspace_roles" */
  workspaceRolesAggregate: WorkspaceRolesAggregate;
  /** fetch data from the table: "workspace_roles" using primary key columns */
  workspaceRolesByPk?: Maybe<WorkspaceRoles>;
  /** fetch data from the table in a streaming manner: "workspace_roles" */
  workspaceRolesStream: Array<WorkspaceRoles>;
  /** fetch data from the table: "workspaces" */
  workspaces: Array<Workspaces>;
  /** fetch aggregated fields from the table: "workspaces" */
  workspacesAggregate: WorkspacesAggregate;
  /** fetch data from the table: "workspaces" using primary key columns */
  workspacesByPk?: Maybe<Workspaces>;
  /** fetch data from the table in a streaming manner: "workspaces" */
  workspacesStream: Array<Workspaces>;
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


export type Subscription_RootWorkspaceRolesArgs = {
  distinctOn?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspaceRolesOrderBy>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};


export type Subscription_RootWorkspaceRolesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspaceRolesOrderBy>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};


export type Subscription_RootWorkspaceRolesByPkArgs = {
  userId: Scalars['uuid'];
  workspaceId: Scalars['String'];
};


export type Subscription_RootWorkspaceRolesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Workspace_Roles_StreamCursorInput>>;
  where?: InputMaybe<WorkspaceRolesBoolExp>;
};


export type Subscription_RootWorkspacesArgs = {
  distinctOn?: InputMaybe<Array<WorkspacesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspacesOrderBy>>;
  where?: InputMaybe<WorkspacesBoolExp>;
};


export type Subscription_RootWorkspacesAggregateArgs = {
  distinctOn?: InputMaybe<Array<WorkspacesSelectColumn>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Array<WorkspacesOrderBy>>;
  where?: InputMaybe<WorkspacesBoolExp>;
};


export type Subscription_RootWorkspacesByPkArgs = {
  id: Scalars['String'];
};


export type Subscription_RootWorkspacesStreamArgs = {
  batchSize: Scalars['Int'];
  cursor: Array<InputMaybe<Workspaces_StreamCursorInput>>;
  where?: InputMaybe<WorkspacesBoolExp>;
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

export type Workspace_Roles_Aggregate_Bool_Exp = {
  count?: InputMaybe<Workspace_Roles_Aggregate_Bool_Exp_Count>;
};

export type Workspace_Roles_Aggregate_Bool_Exp_Count = {
  arguments?: InputMaybe<Array<WorkspaceRolesSelectColumn>>;
  distinct?: InputMaybe<Scalars['Boolean']>;
  filter?: InputMaybe<WorkspaceRolesBoolExp>;
  predicate: IntComparisonExp;
};

/** order by max() on columns of table "workspace_roles" */
export type Workspace_Roles_Max_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
  workspaceId?: InputMaybe<OrderBy>;
};

/** order by min() on columns of table "workspace_roles" */
export type Workspace_Roles_Min_Order_By = {
  createdAt?: InputMaybe<OrderBy>;
  role?: InputMaybe<OrderBy>;
  updatedAt?: InputMaybe<OrderBy>;
  userId?: InputMaybe<OrderBy>;
  workspaceId?: InputMaybe<OrderBy>;
};

/** Streaming cursor of the table "workspace_roles" */
export type Workspace_Roles_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Workspace_Roles_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Workspace_Roles_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  role?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
  userId?: InputMaybe<Scalars['uuid']>;
  workspaceId?: InputMaybe<Scalars['String']>;
};

/** Streaming cursor of the table "workspaces" */
export type Workspaces_StreamCursorInput = {
  /** Stream column input with initial value */
  initialValue: Workspaces_StreamCursorValueInput;
  /** cursor ordering */
  ordering?: InputMaybe<CursorOrdering>;
};

/** Initial value of the column from where the streaming should start */
export type Workspaces_StreamCursorValueInput = {
  createdAt?: InputMaybe<Scalars['timestamptz']>;
  id?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  updatedAt?: InputMaybe<Scalars['timestamptz']>;
};

export type CreateWorkspaceMutationVariables = Exact<{
  name: Scalars['String'];
  userId: Scalars['uuid'];
}>;


export type CreateWorkspaceMutation = { __typename?: 'mutation_root', workspace?: { __typename?: 'Workspaces', id: string, name: string } | null };

export type UserFieldsFragment = { __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null };

export type GetUsersByEmailQueryVariables = Exact<{
  email?: InputMaybe<Scalars['String']>;
}>;


export type GetUsersByEmailQuery = { __typename?: 'query_root', users: Array<{ __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null }> };

export type GetUserRolesQueryVariables = Exact<{
  userId: Scalars['uuid'];
}>;


export type GetUserRolesQuery = { __typename?: 'query_root', user?: { __typename?: 'Users', roles: Array<{ __typename?: 'WorkspaceRoles', role: string, workspace: { __typename?: 'Workspaces', id: string, name: string } }> } | null };

export type GetUserByIdQueryVariables = Exact<{
  id: Scalars['uuid'];
}>;


export type GetUserByIdQuery = { __typename?: 'query_root', user?: { __typename?: 'Users', id: any, name?: string | null, email: string, photo?: string | null, roles: Array<{ __typename?: 'WorkspaceRoles', role: string, workspace: { __typename?: 'Workspaces', id: string, name: string } }> } | null };

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

export const UserFieldsFragmentDoc = {"kind":"Document","definitions":[{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<UserFieldsFragment, unknown>;
export const CreateWorkspaceDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateWorkspace"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"workspace"},"name":{"kind":"Name","value":"insertWorkspacesOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"roles"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"data"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"userId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"role"},"value":{"kind":"StringValue","value":"owner","block":false}}]}},{"kind":"ObjectField","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"workspace_roles_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"role"}]}}]}}]}}]}},{"kind":"Argument","name":{"kind":"Name","value":"onConflict"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"constraint"},"value":{"kind":"EnumValue","value":"workspaces_pkey"}},{"kind":"ObjectField","name":{"kind":"Name","value":"update_columns"},"value":{"kind":"ListValue","values":[{"kind":"EnumValue","value":"name"}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]} as unknown as DocumentNode<CreateWorkspaceMutation, CreateWorkspaceMutationVariables>;
export const GetUsersByEmailDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUsersByEmail"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"limit"},"value":{"kind":"IntValue","value":"1"}},{"kind":"Argument","name":{"kind":"Name","value":"where"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"_ilike"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<GetUsersByEmailQuery, GetUsersByEmailQueryVariables>;
export const GetUserRolesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserRoles"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"userId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"usersByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"userId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"roles"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"workspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}}]} as unknown as DocumentNode<GetUserRolesQuery, GetUserRolesQueryVariables>;
export const GetUserByIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetUserById"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"usersByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}},{"kind":"Field","name":{"kind":"Name","value":"roles"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"orderBy"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"workspace"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"EnumValue","value":"ASC"}}]}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"role"}},{"kind":"Field","name":{"kind":"Name","value":"workspace"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}}]}}]}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<GetUserByIdQuery, GetUserByIdQueryVariables>;
export const GetAllUsersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"GetAllUsers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"users"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<GetAllUsersQuery, GetAllUsersQueryVariables>;
export const UpdateUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"uuid"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"updates"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"UsersSetInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"updateUsersByPk"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"pk_columns"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}]}},{"kind":"Argument","name":{"kind":"Name","value":"_set"},"value":{"kind":"Variable","name":{"kind":"Name","value":"updates"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<UpdateUserMutation, UpdateUserMutationVariables>;
export const InsertUserDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"InsertUser"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"email"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"photo"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"user"},"name":{"kind":"Name","value":"insertUsersOne"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"object"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"email"},"value":{"kind":"Variable","name":{"kind":"Name","value":"email"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"name"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"photo"},"value":{"kind":"Variable","name":{"kind":"Name","value":"photo"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"FragmentSpread","name":{"kind":"Name","value":"UserFields"}}]}}]}},{"kind":"FragmentDefinition","name":{"kind":"Name","value":"UserFields"},"typeCondition":{"kind":"NamedType","name":{"kind":"Name","value":"Users"}},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"photo"}}]}}]} as unknown as DocumentNode<InsertUserMutation, InsertUserMutationVariables>;