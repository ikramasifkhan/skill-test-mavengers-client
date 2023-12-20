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
    title: 'Edit',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },       
]


onMounted(() => {
  categoryStore.categoryList()
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
                  <input type="hidden" v-model="articleStore.article.id">
                  <VTextField
                    v-model="articleStore.article.title"
                    autofocus
                    placeholder="Enter title"
                    label="Title"
                    :rules="rulesStore.requiredRules"
                    @keyup="articleStore.errors.title = ''"
                    :error-messages="articleStore.errors.title"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextarea
                    v-model="articleStore.article.content"
                    placeholder="Enter content"
                    label="Content"
                    :rules="rulesStore.requiredRules"
                  />
                </VCol>
                <VCol cols="12">
                  <VAutocomplete
                    v-model="articleStore.article.categories"
                    :items="categoryStore.categories"
                    item-title="name"
                    item-value="id"
                    autofocus
                    placeholder="Enter categories"
                    label="Categories"
                    :rules="rulesStore.requiredRules"
                    multiple
                    chips
                    closable-chips
                  />
                </VCol>

                <VCol cols="12">
                  <VAutocomplete
                    v-model="articleStore.article.status"
                    :items="['published', 'draft']"
                    autofocus
                    placeholder="Enter status"
                    label="Status"
                    :rules="rulesStore.requiredRules"
                    chips
                  />
                </VCol>
     
                <VCol>
                  <!-- remember me checkbox -->
                  <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                  </div>

                  <!-- login button -->
                  <VBtn
                    block
                    type="button"
                    :disabled="!rulesStore.isValidForm"
                    @click="articleStore.updateArticle"
                  >
                    Update
                  </VBtn>
                </VCol>
                
              </VRow>
            </VForm>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
