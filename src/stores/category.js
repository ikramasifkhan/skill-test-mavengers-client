import { defineStore } from 'pinia';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import http from '@/helpers/http';
import router from '@/router';

export const useCategoryStore = defineStore('category', {
    state: () => {
        return { 
            categories: [],
            category: {},
            newCategory: {
                name: ''
            },
            errors: {
                name: ''
            }
         }
    },

    actions: {
        async categoryList() {
            try {
                return await http()
                    .get('/categories')
                    .then(({data}) => {
                        if(data.success == true){
                            this.categories = data.data
                        }
                    })
                    .catch(({response}) => {
                        console.log(response);
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async createCategory() {
            try {
                return await http()
                    .post('/categories', {
                        'name': this.newCategory.name
                    })
                    .then(({data}) => {
                        if(data.success == true){
                            toast.success("Category created successfully");
                            router.push('/categories')
                            this.newCategory.name = ''
                        }
                    })
                    .catch(({response}) => {
                        if(response.data.errors.name.length > 0){
                            this.errors.name = response.data.errors.name[0]  
                         }
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async updateCategory() {
            try {
                return await http()
                    .put(`/categories/${this.category.id}`, {
                        'id': this.category.id,
                        'name': this.category.name
                    })
                    .then(({data}) => {
                        if(data.success == true){
                            toast.success("Category updated successfully");
                            router.push('/categories')
                        }
                    })
                    .catch(({response}) => {
                        if(response.data.errors.name.length > 0){
                            this.errors.name = response.data.errors.name[0]  
                         }
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

         async deleteCategory(id) {
            try {
                return await http()
                    .delete(`/categories/${id}`)
                    .then(({data}) => {
                        if(data.success == true){
                            this.categories = this.categories.filter(category => category.id != id)
                            toast.success("Category deleted successfully");
                        }
                    })
                    .catch(({response}) => {
                        console.log(response);
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async getCategoryBySlug(slug) {
            try {
                return await http()
                    .get(`/categories/${slug}`)
                    .then(({data}) => {
                        if(data.success == true){
                            this.category = data.data
                        }
                    })
                    .catch(({response}) => {
                        console.log(response);
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },
    },
})
