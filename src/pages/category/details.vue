<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
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
    to: {path: '/categories'},
  },
  {
    title: 'Details',
    disabled: true,
    href: 'breadcrumbs_link_2',
  },       
]

const articleHeader = [
  { title: 'Title', key: 'title' },
  { title: 'Content', key: 'content' },
  { title: 'Published at', key: 'published_at' },
  { title: 'Status', key: 'status' },
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
              <VRow>
                <VCol cols="12">
                  <VTable>
                    <tbody>
                      <tr>
                        <th>Name</th>
                        <td>{{ categoryStore.category.name }}</td>
                      </tr>

                      <tr>
                        <th>Slug</th>
                        <td>{{ categoryStore.category.slug }}</td>
                      </tr>
                    </tbody>
                  </VTable>
                </VCol>
                <VCol>
                  <VDataTable
                    :headers="articleHeader"
                    :items="categoryStore.category.articles"
                    :items-per-page="5"
                    >
                    <template #item.status="{ item }">
                      <v-chip color="primary" variant="flat" v-if="item.raw.status == 'published'">
                        Published
                      </v-chip>
                      <v-chip color="warning" variant="flat" v-if="item.raw.status == 'draft'">
                        Draft
                      </v-chip>
                    </template>
                  </VDataTable>
                </VCol>
              </VRow>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>
