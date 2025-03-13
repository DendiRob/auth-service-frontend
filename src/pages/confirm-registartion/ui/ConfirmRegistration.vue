<template>
  <div class="confirm">
    <Toast />
    <Card class="confirm__wrapper">
      <template #content>
        <h1 class="title">Подтвердитe аккаунт</h1>
        <div class="confirm__btns">
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

          <Button
            class="confirm-btn"
            label="Подтвердить"
            severity="success"
            :loading="isPending"
            @click="onClick"
          />
        </div>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import { useMutation } from "@tanstack/vue-query";
import { useGeneralToast } from "~/src/shared/lib";
import { confirmUser, type TConfirmUserVariables } from "../api/mutations.api";

// TODO: заполнить мета данные на всех публичных страницах
// TODO: надо сразу юзера регать и на дашборд перенаправлять
const { params, query } = useRoute();

const confirmData = {
  user_uuid: params?.user_uuid as string,
  confirmation_uuid: query?.confirmationUuid as string,
};

const { graphqlErrorToast, successToast } = useGeneralToast();

const { mutate, isPending } = useMutation({
  mutationFn: (vars: TConfirmUserVariables) => confirmUser(vars),
  onSuccess: ({ data }) => {
    successToast(data?.confirmUser);
    // TODO: написать, что успех
    navigateTo({ name: "dashboard" });
  },
  onError: (error) => {
    graphqlErrorToast(error);
  },
});

const onClick = () => {
  mutate(confirmData);
};
</script>

<style scoped lang="scss">
@import url(ConfirmRegistration.module.scss);
</style>
