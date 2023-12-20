<script setup>
import { useCategoryStore } from "@/stores/category";
import { useRulesStore } from "@/stores/rules";
import { onMounted } from "vue";

const rulesStore = useRulesStore()
const categoryStore = useCategoryStore()

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
    title: 'Create',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },       
]


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
                  <input type="hidden" v-model="categoryStore.newCategory.id">
                  <VTextField
                    v-model="categoryStore.newCategory.name"
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
                    @click="categoryStore.createCategory"
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
