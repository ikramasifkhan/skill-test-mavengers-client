<script setup>
import { useCategoryStore } from "@/stores/category";
import { useArticleStore } from "@/stores/article";
import { useRulesStore } from "@/stores/rules";
import { onMounted } from "vue";

const rulesStore = useRulesStore()
const categoryStore = useCategoryStore()
const articleStore = useArticleStore()

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
    title: 'Create',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },       
]


onMounted(() => {
  categoryStore.categoryList()
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <h3>Title</h3>
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
                  <VTextField
                    v-model="articleStore.newArticle.title"
                    autofocus
                    placeholder="Enter title"
                    label="Title"
                    :rules="rulesStore.requiredRules"
                  />
                </VCol>
                <VCol cols="12">
                  <VTextarea
                    v-model="articleStore.newArticle.content"
                    placeholder="Enter content"
                    label="Content"
                    :rules="rulesStore.requiredRules"
                  />
                </VCol>
                <VCol cols="12">
                  <VAutocomplete
                    v-model="articleStore.newArticle.categories"
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
     
                <VCol>
                  <!-- remember me checkbox -->
                  <div class="d-flex align-center justify-space-between flex-wrap mt-1 mb-4">
                  </div>

                  <!-- login button -->
                  <VBtn
                    block
                    type="button"
                    :disabled="!rulesStore.isValidForm"
                    @click="articleStore.createArticle"
                  >
                    Create
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
