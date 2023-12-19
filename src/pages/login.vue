<script setup>
import { useAuthStore } from "@/stores/auth";
import { useRulesStore } from "@/stores/rules";
import logo from '@images/logo.svg?raw';

const authStore = useAuthStore()
const rulesStore = useRulesStore()

const form = ref({
  email: '',
  password: '',
  remember: false,
})


const isPasswordVisible = ref(false)
</script>

<template>
  <div class="auth-wrapper d-flex align-center justify-center pa-4">
    <VCard
      class="auth-card pa-4 pt-7"
      max-width="448"
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
          Skill Test
        </VCardTitle>
      </VCardItem>

      <VCardText class="pt-2">
        <h5 class="text-h5 mb-1">
          Skill Test Mavengers! 👋🏻
        </h5>
      </VCardText>

      <VCardText>
        <VForm v-model="rulesStore.isValidForm">
          <VRow>
            <!-- email -->
            <VCol cols="12">
              <VTextField
                v-model="authStore.loginInfo.email"
                autofocus
                placeholder="johndoe@email.com"
                label="Email"
                type="email"
                :rules="rulesStore.emailRules"
              />
            </VCol>

            <!-- password -->
            <VCol cols="12">
              <VTextField
                v-model="authStore.loginInfo.password"
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
                @click="authStore.login"
                :disabled="!rulesStore.isValidForm"
              >
                Login
              </VBtn>
            </VCol>

            <!-- create account -->
            <VCol
              cols="12"
              class="text-center text-base"
            >
              <span>New on our platform?</span>
              <RouterLink
                class="text-primary ms-2"
                :to="{name: 'register'}"
              >
                Create an account
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
