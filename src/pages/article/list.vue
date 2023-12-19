<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useArticleStore } from '../../stores/article'

const articleStore = useArticleStore()
const articles = articleStore.articles
const headers = [
  { title: '#', sortable: false, key: 'serial' },
  { title: 'Title', key: 'title' },
  { title: 'Content', key: 'content' },
  { title: 'Author', key: 'author.name' },
  { title: 'Categories', key: 'categories' },
  { title: 'Published at', key: 'published_at' },
  { title: 'Status', key: 'status' },
  { title: 'Action', key: 'action' },
]

onMounted(() => {
  articleStore.articleList()
})

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <div class="d-flex justify-space-between">
            <div>
              <h4>Article list</h4>
            </div>
            <div>
              <v-btn :to="{name: 'article-create'}">
                Add article
              </v-btn>
              
            </div>
          </div>
        </VCardTitle>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="articleStore.articles"
            :items-per-page="5"
            >
              <template #item.serial="{ item }">
                {{ articleStore.articles.map(article => article.id).indexOf(item.value) + 1 }}
              </template>

              <template #item.categories="{ item }">
                <ol>
                  <li v-for="category in item.columns.categories" :key="category.id">{{ category.name }}</li>
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

              <template #item.action="{ item }">
                <div class="d-flex">
                  <VBtn
                    size="38"
                    color="info"
                    class="mr-1"
                    :to="{name: 'article-details',  params: { slug: item.raw.slug }}"
                  >
                    <VIcon
                      icon="tabler-eye"
                      size="22"
                    />
                  </VBtn>

                  <VBtn
                    size="38"
                    color="warning"
                    :to="{name: 'article-edit',  params: { slug: item.raw.slug }}"
                  >
                    <VIcon
                      icon="tabler-pencil"
                      size="22"
                    />
                  </VBtn>
                  <VBtn
                    size="38"
                    color="error"
                    class="ml-1"
                    @click="articleStore.deleteArticle(item.raw.id)"
                  >
                    <VIcon
                      icon="tabler-trash"
                      size="22"
                    />
                  </VBtn>
                </div>
              </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
