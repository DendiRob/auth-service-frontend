<template>
  <div class="reset-form">
    <Toast />
    <Card class="form__wrapper">
      <template #header>
        <h1 class="title" v-if="!isPasswordReset">Установите новый пароль</h1>
      </template>
      <template #content>
        <div v-if="!isPasswordReset">
          <form class="form" @submit="onSubmit">
            <Field
              name="newPassword"
              v-slot="{ field, errorMessage }"
              :as="'div'"
            >
              <FloatLabel variant="on">
                <CPassword
                  id="newPassword"
                  v-bind="field"
                  :ui-props="{ invalid: !!errorMessage }"
                />
                <label for="newPassword">Новый пароль</label>
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

            <Field
              name="repeatNewPassword"
              v-slot="{ field, errorMessage }"
              :as="'div'"
            >
              <FloatLabel variant="on">
                <CPassword
                  id="repeatNewPassword"
                  v-bind="field"
                  :ui-props="{ invalid: !!errorMessage }"
                />
                <label for="repeatNewPassword">Повторите новый пароль</label>
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
              label="Сменить пароль"
              class="submit"
            />
          </form>

          <CButton
            class="back-btn"
            label="Вернуться на главную"
            :ui-props="{
              icon: 'pi pi-arrow-left',
              iconPos: 'left',
              as: 'router-link',
              to: '/',
              severity: 'info',
            }"
          />
        </div>
        <div v-else>
          <h1 class="title title-success">Пароль успешно изменен!</h1>
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { useGeneralToast } from "~/src/shared/lib";
import {
  resetPassword,
  type TResetPasswordVariables,
} from "../../api/mutations.api";
import { resetPasswordInputSchema } from "../../model/auth.validation";

const { graphqlErrorToast, successToast } = useGeneralToast();

const route = useRoute();

const isPasswordReset = shallowRef(false);

const { handleSubmit, resetForm } = useForm({
  validationSchema: toTypedSchema(resetPasswordInputSchema),
});

const { mutate } = useMutation({
  mutationFn: (vars: TResetPasswordVariables) => resetPassword(vars),
  onSuccess: ({ data }) => {
    successToast(data?.resetPassword);
    resetForm();
    isPasswordReset.value = true;

    setTimeout(() => navigateTo("/"), 3000);
  },
  onError: (error) => graphqlErrorToast(error),
});

const onSubmit = handleSubmit((values) => {
  const forgottenPasswordSessionUuid = route.params
    ?.forgotten_password_uuid as string;

  mutate({ ...values, forgottenPasswordSessionUuid });
});
</script>

<style scoped lang="scss">
@import url(ResetPassword.module.scss);
</style>
