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
          :ui-props="{ invalid: !!errorMessage }"
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

    <NuxtLink :to="{ name: 'forget-password' }" class="forget-password">
      Забыли пароль?
    </NuxtLink>

    <Button type="submit" severity="success" label="Войти" />
  </form>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { signInInputSchema } from "../../model/auth.validation";
import { signIn, type TSignInVariables } from "../../api/mutations.api";
import { useUserSession } from "~/src/entities/user";
import { setLS } from "~/src/shared/lib";
import { useGeneralToast } from "~/src/shared/lib";

const router = useRouter();
const userSessionStore = useUserSession();
const { graphqlErrorToast } = useGeneralToast();

// TODO: забыл пароль
const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(signInInputSchema),
});

const { mutate } = useMutation({
  mutationFn: (vars: TSignInVariables) => signIn(vars),
  onSuccess: ({ data }) => {
    if (data) {
      userSessionStore.setMe(data?.signIn.user);
    }

    setLS("access_token", data?.signIn?.access_token as string);
    setLS("refresh_token", data?.signIn?.refresh_token as string);
    setLS("isUserAuth", "true");

    router.push("/dashboard");
  },
  onError: (error) => graphqlErrorToast(error),
});

const onSubmit = handleSubmit((values) => mutate(values));
</script>

<style scoped lang="scss">
@import url("SignIn.module.scss");
</style>
