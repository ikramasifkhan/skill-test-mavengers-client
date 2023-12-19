<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useCategoryStore } from '../../stores/category'

const categoryStore = useCategoryStore()

const headers = [
  { title: '#', sortable: false, key: 'serial' },
  { title: 'Name', key: 'name' },
  { title: 'Status', key: 'status' },
  { title: 'Action', key: 'action' },
]

onMounted(() => {
  categoryStore.categoryList()
})

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <div class="d-flex justify-space-between">
            <div>
              <h4>Category list</h4>
            </div>
            <div>
              <v-btn :to="{name: 'article-create'}">
                Add category
              </v-btn>
              
            </div>
          </div>
        </VCardTitle>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="categoryStore.categories"
            :items-per-page="5"
            >
              <template #item.serial="{ item }">
                {{ categoryStore.categories.map(article => article.id).indexOf(item.value) + 1 }}
              </template>

              

              <template #item.status="{ item }">
                <v-chip color="primary" variant="flat" v-if="item.raw.status == 'active'">
                  Active
                </v-chip>
                <v-chip color="warning" variant="flat" v-if="item.raw.status == 'inactive'">
                  Inactive
                </v-chip>
              </template>

              <template #item.action="{ item }">
                <div class="d-flex">
                  <VBtn
                    size="38"
                    color="info"
                    class="mr-1"
                    :to="{name: 'category-details',  params: { slug: item.raw.slug }}"
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
                </div>
              </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
