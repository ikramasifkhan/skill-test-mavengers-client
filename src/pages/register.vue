<script setup>
import logo from '@images/logo.svg?raw';

import { useAuthStore } from "@/stores/auth";
import { useRulesStore } from "@/stores/rules";

const authStore = useAuthStore()
const rulesStore = useRulesStore()

const form = ref({
  username: '',
  email: '',
  password: '',
  privacyPolicies: false,
})

const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="500"
    >
      <VCardItem class="justify-center">
        <template #prepend>
          <div class="d-flex">
            <div
              class="d-flex text-primary"
              v-html="logo"
            />
          </div>
        </template>

        <VCardTitle class="text-2xl font-weight-bold">
          Mavengers
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Register & Adventure starts here 🚀
        </h5>
      </VCardText>

      <VCardText>
        <VForm v-model="rulesStore.isValidForm">
          <VRow>
            <VCol cols="12">
              <VTextField
                v-model="authStore.newUser.name"
                autofocus
                placeholder="Your name"
                label="Name"
                :rules="rulesStore.requiredRules"
              />
            </VCol>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="authStore.newUser.email.value"
                autofocus
                placeholder="johndoe@email.com"
                @keyup="authStore.removeEmailServerError()"
                :error-messages="authStore.newUser.email.error"
                label="Email"
                type="email"
                :rules="rulesStore.emailRules"
              />
            </VCol>
           
            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="authStore.newUser.password"
                label="Password"
                placeholder="············"
                :rules="rulesStore.passwordRules"
                :type="isPasswordVisible ? 'text' : 'password'"
                :append-inner-icon="isPasswordVisible ? 'bx-hide' : 'bx-show'"
                @click:append-inner="isPasswordVisible = !isPasswordVisible"
              />

              <!-- remember me checkbox -->
              <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                
              </div>

              <!-- login button -->
              <VBtn
                block
                type="button"
                @click="authStore.register"
                :disabled="!rulesStore.isValidForm"
              >
                Create an account
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>Already Have an account</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{name: 'login'}"
              >
                Just Login
              </RouterLink>
            </VCol>
          </VRow>
        </VForm>
      </VCardText>
    </VCard>
  </div>
</template>

<style lang="scss">
@use "@core/scss/template/pages/page-auth.scss";
</style>
