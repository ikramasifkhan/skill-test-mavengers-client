<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
import { useUserStore } from '../../stores/user'

const userStore = useUserStore()

const headers = [
  { title: '#', sortable: false, key: 'serial' },
  { title: 'Name', key: 'name' },
  { title: 'Email', key: 'email' },
  { title: 'Registration date', key: 'created_at' },
]

onMounted(() => {
  userStore.userList()
})

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard>
        <VCardTitle>
          <div class="d-flex justify-space-between">
            <div>
              <h4>User list</h4>
            </div>
          </div>
        </VCardTitle>
        <VCardText>
          <VDataTable
            :headers="headers"
            :items="userStore.users"
            :items-per-page="5"
            >
              <template #item.serial="{ item }">
                {{ userStore.users.map(article => article.id).indexOf(item.value) + 1 }}
              </template>
          </VDataTable>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
