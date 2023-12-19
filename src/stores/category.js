import { defineStore } from 'pinia';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import http from '@/helpers/http';
import router from '@/router';
export const useCategoryStore = defineStore('category', {
    state: () => {
        return { 
            categories: [],
            category: {}
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
