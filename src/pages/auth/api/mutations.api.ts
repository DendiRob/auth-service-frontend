import gql from "graphql-tag";
import type { TUser } from "@@/src/entities/user";

export type TSignInVariables = {
  email: string;
  password: string;
};

export type TSignUpVariables = {
  email: string;
  password: string;
  repeatedPassword: string;
};

export type TConfirmUserVariables = {
  user_uuid: string;
  confirmation_uuid: string;
};

export const signIn = async (vars: TSignInVariables) => {
  const { $apolloClient } = useNuxtApp();

  return await $apolloClient.mutate<{
    signIn: { user: TUser; refresh_token: string; access_token: string };
  }>({
    mutation: gql`
      mutation signIn($SignInInput: SignInInput!) {
        signIn(signIn: $SignInInput) {
          user {
            uuid
            email
            username
            created_at
            is_deleted
            is_activated
          }
          refresh_token
          access_token
        }
      }
    `,
    variables: { SignInInput: vars },
  });
};

export const signUp = async (vars: TSignUpVariables) => {
  const { $apolloClient } = useNuxtApp();

  return await $apolloClient.mutate<{
    signUp: string;
  }>({
    mutation: gql`
      mutation signUp($signUpInput: SignUpInput!) {
        signUp(signUp: $signUpInput)
      }
    `,
    variables: { signUpInput: vars },
  });
};

export const confirmUser = async (vars: TConfirmUserVariables) => {
  const { $apolloClient } = useNuxtApp();

  return await $apolloClient.mutate<{
    confirmUser: string;
  }>({
    mutation: gql`
      mutation confirmUser($confirmUserInput: ConfirmUserInput!) {
        confirmUser(confirmUserInput: $confirmUserInput)
      }
    `,
    variables: { signUpInput: vars },
  });
};
