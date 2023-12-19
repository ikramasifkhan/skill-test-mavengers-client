<script setup>
import { useArticleStore } from "@/stores/article";
import { useCategoryStore } from "@/stores/category";
import { useRulesStore } from "@/stores/rules";
import { onMounted } from "vue";
import { useRoute } from 'vue-router';

const rulesStore = useRulesStore()
const categoryStore = useCategoryStore()
const articleStore = useArticleStore()
const route = useRoute()
const props = defineProps(['info'])

const breadcrumbItem = [
  {
    title: 'Dashboard',
    disabled: false,
    to: {name: 'dashboard'},
  },
  {
    title: 'List',
    disabled: false,
    to: {path: '/articles'},
  },
  {
    title: 'Details',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },       
]


onMounted(() => {
  articleStore.getArticleBySlug(route.params.slug)
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <h3>Article</h3>
            </div>
            <div>
              <v-breadcrumbs
                  :items="breadcrumbItem"
                  divider="/"
              ></v-breadcrumbs>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>

    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText>
            <VForm v-model="rulesStore.isValidForm">
              <VRow>
                <!-- email -->
                <VCol cols="12">
                  <VTable>
                    <tbody>
                      <tr>
                        <th>Title</th>
                        <td>{{ articleStore.article.title }}</td>
                      </tr>

                      <tr>
                        <th>Content</th>
                        <td>{{ articleStore.article.content }}</td>
                      </tr>

                      <tr>
                        <th>Author</th>
                        <td>{{ articleStore.article.author }}</td>
                      </tr>

                      <tr>
                        <th>Categories</th>
                        <td>
                            <ul v-for="category in articleStore.article.categories" :key="category.id">
                              <li>{{ category.name }}</li>
                            </ul>  
                        </td>
                      </tr>

                      <tr>
                        <th>Published at</th>
                        <td>{{ articleStore.article.published_at }}</td>
                      </tr>

                      <tr>
                        <th>Status</th>
                        <td>
                          <v-chip color="primary" variant="flat" v-if="articleStore.article.status == 'published'">
                            Published
                          </v-chip>
                          <v-chip color="warning" variant="flat" v-if="articleStore.article.status == 'draft'">
                            Daft
                          </v-chip>
                        </td>
                      </tr>
                    </tbody>
                  </VTable>
                </VCol>
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
