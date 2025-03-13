import gql from "graphql-tag";

export type TResetPasswordVariables = {
  forgottenPasswordSessionUuid: string;
  newPassword: string;
  repeatNewPassword: string;
};

export const resetPassword = async (vars: TResetPasswordVariables) => {
  const { $apolloClient } = useNuxtApp();

  return await $apolloClient.mutate<{
    resetPassword: string;
  }>({
    mutation: gql`
      mutation resetPassword($resetPasswordInput: ResetPassordInput!) {
        resetPassword(resetPassordInput: $resetPasswordInput)
      }
    `,
    variables: { resetPasswordInput: vars },
  });
};
