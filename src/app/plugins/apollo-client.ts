import {
  ApolloClient,
  from,
  HttpLink,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client/core";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";
// TODO: поправить импорты
import { refreshFullGql } from "../../shared/api/mutations";
import { useUserSession, type TUser } from "../../entities/user";
import { getLS, setLS } from "~/src/shared/lib";

export default defineNuxtPlugin(() => {
  const userSessionStore = useUserSession();
  const cfg = useRuntimeConfig();

  const NUXT_API_BASE_URL = cfg.public.NUXT_API_BASE_URL;
  const NUXT_REFRESH_TOKEN_NAME = cfg.public.NUXT_REFRESH_TOKEN_NAME;
  const NUXT_ACCESS_TOKEN_NAME = cfg.public.NUXT_ACCESS_TOKEN_NAME;

  const saveAccessToken = (val: string) => setLS(NUXT_ACCESS_TOKEN_NAME, val);
  const saveRefreshToken = (val: string) => setLS(NUXT_REFRESH_TOKEN_NAME, val);

  const generateRefreshTokenLinkOnUnauthError = ({
    refreshTokenRequestFunc,
  }: {
    refreshTokenRequestFunc: () => Promise<any>;
  }) => {
    return [
      onError(({ graphQLErrors, operation, forward }) => {
        if (!graphQLErrors) return;
        const unauthorizedError = graphQLErrors?.find(
          (err) => err.extensions?.code === 401
        );
        const isRefreshError = graphQLErrors.find((i) =>
          i.path?.includes("refresh")
        );

        // TODO: вот тут нужно нормалдьно сделать постоянно редиректит
        if (isRefreshError || unauthorizedError?.path?.includes("signIn")) {
          setLS("isUserAuth", "false");
          return;
        }

        if (unauthorizedError) {
          const { getContext, setContext } = operation;
          const context = getContext();

          setContext({
            ...context,
            headers: {
              ...context?.headers,
              _needsRefresh: true,
            },
          });

          return forward(operation);
        }
        return;
      }),
      setContext(async (_, previousContext) => {
        if (previousContext?.headers?._needsRefresh) {
          await refreshTokenRequestFunc();
        }

        return previousContext;
      }),
    ];
  };

  const httpLink = new HttpLink({
    uri: NUXT_API_BASE_URL + "/graphql",
    // TODO: надо разобраться с корсами
    credentials: "include",
  });

  const authLink = new ApolloLink((operation, forward) => {
    const accessToken = getLS(NUXT_ACCESS_TOKEN_NAME);

    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
    }));
    return forward(operation);
  });

  const refreshTokenReq = async () => {
    const refreshToken = getLS(NUXT_REFRESH_TOKEN_NAME);

    const res = await apolloClient.mutate<{
      refresh: { user: TUser; refresh_token: string; access_token: string };
    }>({
      mutation: refreshFullGql,
      variables: { refreshInput: { refresh_token: refreshToken } },
    });

    const user = res.data?.refresh.user;
    if (!user) return;

    userSessionStore.setMe(user);

    const { access_token, refresh_token } = res.data?.refresh || {};
    if (access_token) saveAccessToken(access_token);
    if (refresh_token) saveRefreshToken(refresh_token);
  };

  const apolloClient = new ApolloClient({
    link: from([
      ...generateRefreshTokenLinkOnUnauthError({
        refreshTokenRequestFunc: refreshTokenReq,
      }),
      authLink,
      httpLink,
    ]),
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  return {
    provide: {
      apolloClient,
    },
  };
});
