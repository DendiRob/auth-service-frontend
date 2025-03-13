import gql from "graphql-tag";

export type TConfirmUserVariables = {
  user_uuid: string;
  confirmation_uuid: string;
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
    variables: { confirmUserInput: vars },
  });
};
