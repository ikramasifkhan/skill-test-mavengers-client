<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useCategoryStore } from '../../stores/category'
import Swal from 'sweetalert2'

const categoryStore = useCategoryStore()

const headers = [
  { title: '#', sortable: false, key: 'serial' },
  { title: 'Name', key: 'name' },
  { title: 'Action', key: 'action' },
]

onMounted(() => {
  categoryStore.categoryList()
})

const deleteCategory = (id)=>{
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then((result) => {
    if (result.isConfirmed) {
      categoryStore.deleteCategory(id)
    }
  });          
}
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
              <v-btn :to="{name: 'category-create'}">
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
                    :to="{name: 'category-edit',  params: { slug: item.raw.slug }}"
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
                    @click="deleteCategory(item.raw.id)"
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
