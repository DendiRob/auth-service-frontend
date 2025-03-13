<template>
  <form class="form" @submit="onSubmit">
    <Field
      name="email"
      v-slot="{ field, errorMessage }"
      class="form__field"
      :as="'div'"
    >
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
    <Field
      name="password"
      v-slot="{ field, errorMessage }"
      class="form__field"
      :as="'div'"
    >
      <FloatLabel variant="on">
        <CPassword
          id="password"
          v-bind="field"
          :ui-props="{ invalid: !!errorMessage, inputProps: field }"
        />
        <label for="password">Пароль</label>
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
      name="repeatedPassword"
      v-slot="{ field, errorMessage }"
      class="form__field"
      :as="'div'"
    >
      <FloatLabel variant="on">
        <CPassword
          id="repeatedPassword"
          :ui-props="{ invalid: !!errorMessage, inputProps: field }"
        />
        <label for="repeatedPassword">Повторите пароль</label>
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

    <div class="form__field form__policy">
      <CCheckbox
        id="privacyPolicy"
        name="acceptPolicy"
        :uiProps="{ binary: true }"
      />
      <label for="privacyPolicy">
        <Message
          size="small"
          :severity="errors.acceptPolicy ? 'error' : 'severity'"
          variant="simple"
        >
          Соглашаюсь с правилами платформы и даю свое согласие на обработку моих
          персональных данных
        </Message>
      </label>
    </div>

    <Button
      type="submit"
      severity="success"
      label="Зарегестрироваться"
      :loading="isPending"
    />
  </form>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { signUpLocalInputSchema } from "../../model/auth.validation";
import { signUp, type TSignUpVariables } from "../../api/mutations.api";
import { useGeneralToast } from "~/src/shared/lib";

const { graphqlErrorToast, successToast } = useGeneralToast();

const { handleSubmit, resetForm, errors } = useForm({
  validationSchema: toTypedSchema(signUpLocalInputSchema),
});

const { mutate, isPending } = useMutation({
  mutationFn: (vars: TSignUpVariables) => signUp(vars),
  onSuccess: ({ data }) => {
    successToast(data?.signUp);
    resetForm();
  },
  onError: (error) => graphqlErrorToast(error),
});

// TODO: добавить правила платформы и согласие на обработку, узнать нужно ли отправлять это на бэк
const onSubmit = handleSubmit((values) => {
  const { acceptPolicy, ...userData } = values;
  mutate(userData);
});
</script>

<style scoped lang="scss">
@import url("SignUp.module.scss");
</style>
