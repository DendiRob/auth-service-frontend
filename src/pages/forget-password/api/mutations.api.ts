import gql from "graphql-tag";

export type TForgotPasswordVariables = {
  email: string;
};

export const forgotPassword = async (vars: TForgotPasswordVariables) => {
  const { $apolloClient } = useNuxtApp();

  return await $apolloClient.mutate<{
    forgotPassword: string;
  }>({
    mutation: gql`
      mutation forgotPassword($forgotPasswordInput: ForgotPasswordInput!) {
        forgotPassword(forgotPassword: $forgotPasswordInput)
      }
    `,
    variables: { forgotPasswordInput: vars },
  });
};
