import gql from "graphql-tag";
import { getLS } from "../lib";

export const refreshFullGql = gql`
  mutation refresh($refreshInput: RefreshInput!) {
    refresh(refresh: $refreshInput) {
      user {
        uuid
        email
        username
        created_at
        is_deleted
        is_activated
      }
      access_token
      refresh_token
    }
  }
`;

export const logoutGql = gql`
  mutation logout($refreshInput: RefreshInput!) {
    logout(logout: $refreshInput)
  }
`;

export const logout = async () => {
  const cfg = useRuntimeConfig();
  const { $apolloClient } = useNuxtApp();

  const NUXT_REFRESH_TOKEN_NAME = cfg.public.NUXT_REFRESH_TOKEN_NAME;
  const refreshToken = getLS(NUXT_REFRESH_TOKEN_NAME);

  return await $apolloClient.mutate<{ logout: string }>({
    mutation: logoutGql,
    variables: { refreshInput: { refresh_token: refreshToken } },
  });
};
