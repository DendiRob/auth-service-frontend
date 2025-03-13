import { queryOptions } from "@tanstack/vue-query";
import type { TGetUserVariables } from "./queries.user.types";
import type { TUser } from "@@/src/entities/user";
import gql from "graphql-tag";

const userBaseQuery = "users";
export const meBaseQuery = "user-me";

const getUserFullGql = gql`
  query user($uniqueField: UniqueUserInput!) {
    user(uniqueField: $uniqueField) {
      uuid
      email
      username
      created_at
      is_deleted
      is_activated
    }
  }
`;

export const getMeFullGql = gql`
  query me {
    me {
      uuid
      email
      username
      created_at
      is_deleted
      is_activated
    }
  }
`;

export const getUserFullQueryOptions = (variables: TGetUserVariables) => {
  const { $apolloClient } = useNuxtApp();

  return queryOptions({
    queryKey: [userBaseQuery, variables],
    queryFn: async () => {
      return await $apolloClient.query<{ user: TUser }>({
        query: getUserFullGql,
        variables,
      });
    },
  });
};

export const getUserMeQueryOptions = () => {
  const { $apolloClient } = useNuxtApp();

  return queryOptions({
    queryKey: [meBaseQuery],
    queryFn: async () => {
      return await $apolloClient.query<{ me: TUser }>({
        query: getMeFullGql,
      });
    },
    staleTime: 60 * 1000 * 2,
  });
};
