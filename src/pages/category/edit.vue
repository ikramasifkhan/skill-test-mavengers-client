<script setup>
import { useCategoryStore } from "@/stores/category";
import { useRulesStore } from "@/stores/rules";
import { onMounted } from "vue";
import { useRoute } from 'vue-router';

const rulesStore = useRulesStore()
const categoryStore = useCategoryStore()
const route = useRoute()

const breadcrumbItem = [
  {
    title: 'Dashboard',
    disabled: false,
    to: {name: 'dashboard'},
  },
  {
    title: 'List',
    disabled: false,
    to: {name: 'category-list'},
  },
  {
    title: 'Edit',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },       
]


onMounted(() => {
  categoryStore.getCategoryBySlug(route.params.slug)
})

</script>

<template>
  <div>
    <VRow>
      <VCol cols="12">
        <VCard>
          <VCardText class="d-flex justify-space-between">
            <div>
              <h3>Category</h3>
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
                    v-model="categoryStore.category.name"
                    autofocus
                    placeholder="Enter name"
                    label="Name"
                    :rules="rulesStore.requiredRules"
                    @keyup="categoryStore.errors.name = ''"
                    :error-messages="categoryStore.errors.name"
                  />
                </VCol>
                
  
                <VCol class="mt-4">
                  <VBtn
                    block
                    type="button"
                    :disabled="!rulesStore.isValidForm"
                    @click="categoryStore.updateCategory"
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
