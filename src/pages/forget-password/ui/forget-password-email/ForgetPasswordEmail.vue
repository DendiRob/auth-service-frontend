<template>
  <div class="password-form">
    <Toast />
    <Card class="form__wrapper">
      <template #header>
        <h1 class="title">Восcтановление пароля</h1>
        <Message severity="secondary" variant="simple" class="text">
          Введите email аккаунта и нажмите кнопку
          <br />
          "Восстановить пароль"
        </Message>
      </template>
      <template #content>
        <form class="form" @submit="onSubmit">
          <Field name="email" v-slot="{ field, errorMessage }" :as="'div'">
            <FloatLabel variant="on">
              <label for="email">Email</label>
              <CInputText
                id="email"
                v-bind="field"
                :ui-props="{ invalid: !!errorMessage }"
              />
            </FloatLabel>
            <Message
              size="small"
              severity="error"
              variant="simple"
              v-if="errorMessage"
            >
              {{ errorMessage }}
            </Message>
          </Field>

          <Button
            type="submit"
            severity="success"
            label="Восстановить пароль"
            class="submit"
          />
        </form>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { forgetPasswordFormSchema } from "../../model/forget-password.validation";
import { useGeneralToast } from "~/src/shared/lib";
import {
  forgotPassword,
  type TForgotPasswordVariables,
} from "../../api/mutations.api";

const { graphqlErrorToast, successToast } = useGeneralToast();

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(forgetPasswordFormSchema),
});

const { mutate } = useMutation({
  mutationFn: (vars: TForgotPasswordVariables) => forgotPassword(vars),
  onSuccess: ({ data }) => {
    successToast(data?.forgotPassword);
    resetForm();
  },
  onError: (error) => graphqlErrorToast(error),
});

const onSubmit = handleSubmit((values) => mutate(values));
</script>

<style scoped lang="scss">
@import url(ForgetPasswordEmail.module.scss);
</style>
