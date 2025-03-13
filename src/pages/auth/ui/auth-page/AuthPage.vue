<template>
  <div class="auth">
    <Toast />
    <Card class="auth__wrapper">
      <template #content>
        <Tabs value="sign-in" lazy class="auth-tabs">
          <TabList>
            <Tab value="sign-in">Вход</Tab>
            <Tab value="sign-up">Регистрация</Tab>
          </TabList>
          <TabPanels>
            <TabPanel value="sign-in">
              <SignIn />
            </TabPanel>
            <TabPanel value="sign-up">
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </template>
    </Card>
  </div>
</template>

<script setup lang="ts">
import SignIn from "../sign-in/SignIn.vue";
import SignUp from "../sign-up/SignUp.vue";
</script>

<style scoped lang="scss">
@import url("AuthPage.module.scss");
</style>
