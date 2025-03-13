import { ApolloError } from "@apollo/client/core";

export function useGeneralToast() {
  const toast = useToast();

  function successToast(message: string = "Операция успешно выполнена") {
    toast.add({
      closable: true,
      severity: "success",
      summary: "Операция выполнена",
      detail: message,
      life: 3_000,
    });
  }

  function errorToast(
    message: string = "Не удалось выполнить данную операцию"
  ) {
    toast.add({
      closable: true,
      severity: "error",
      summary: "Операция не выполнена",
      detail: message,
      life: 10_000,
    });
  }

  function pendingToast(message: string = "Идет загрузка") {
    toast.add({
      closable: true,
      severity: "info",
      summary: "Загрузка",
      detail: message,
      life: 3000,
    });
  }

  function graphqlErrorToast(error: unknown) {
    if (error instanceof ApolloError) {
      const msg = error.message;
      errorToast(msg);
    }
  }

  return {
    successToast,
    errorToast,
    pendingToast,
    graphqlErrorToast,
  };
}
