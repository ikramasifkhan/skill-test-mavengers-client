<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useUserStore } from '../stores/user'

const userStore = useUserStore()
const headers = [
  { title: '#', sortable: false, key: 'serial' },
  { title: 'Title', key: 'title' },
  { title: 'Content', key: 'content' },
  { title: 'Categories', key: 'categories' },
  { title: 'Published at', key: 'published_at' },
  { title: 'Status', key: 'status' },
]

onMounted(() => {
  userStore.userDetails()
})

</script>

<template>
  <VRow>
    <VCol cols="12">
    <VCard title="Article list">
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="userStore.user.articles"
            :items-per-page="5"
            >
              <template #item.serial="{ item }">
                {{ userStore.user.articles.map(article => article.id).indexOf(item.value) + 1 }}
              </template>

              <template #item.categories="{ item }">
                <ol>
                  <li v-for="category in item.raw.categories" :key="category.id">{{ category.name }}</li>
                </ol>
              </template>

              <template #item.status="{ item }">
                <v-chip color="primary" variant="flat" v-if="item.raw.status == 'published'">
                  Published
                </v-chip>
                <v-chip color="warning" variant="flat" v-if="item.raw.status == 'draft'">
                  Daft
                </v-chip>
              </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
