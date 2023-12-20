<script setup>
import logo from '@images/logo.svg?raw';
import { useHomeStore } from '../../stores/home';

const homeStore = useHomeStore()

onMounted(() => {
  homeStore.articleList()
})
</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard class="">
            <VCardText class="d-flex justify-space-between">
              <div class="d-flex text-primary">
                <div v-html="logo"></div><h3>Skill Test</h3>
              </div>
              <div>
                <VBtn
                    variant="flat"
                    color="primary"
                    to="/login"
                    class="mr-1"
                  >
                    Login
                  </VBtn>

                  <VBtn
                    variant="flat"
                    color="error"
                    to="/register"
                  >
                    register
                  </VBtn>
              </div>
            </VCardText>
        </VCard>
      </VCol>
    </VRow>
    <VRow v-for="article in homeStore.articles" :key="article.id">
      <VCol
      cols="12"
      >
        <VCard :title="article.title">
          <VCardText class="d-flex align-center flex-wrap">
            <span class="text-subtitle-2">{{ article.author.name }} | {{ article.published_at }}</span>
          </VCardText>

          <VCardText>
            {{ article.content }}
          </VCardText>

          <VCardActions>
            <VBtn v-for="category in article.categories" :key="category.id">{{ category.name }}</VBtn>
          </VCardActions>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
