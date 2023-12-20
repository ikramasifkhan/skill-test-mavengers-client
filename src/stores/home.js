import { defineStore } from 'pinia';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import http from '@/helpers/http';
import router from '@/router';
export const useHomeStore = defineStore('home', {
    state: () => {
        return { 
            articles: []
         }
    },


    actions: {
        async articleList() {
            try {
                return await http()
                    .get('/home')
                    .then(({data}) => {
                        if(data.success == true){
                            this.articles = data.data
                        }
                    })
                    .catch(({response}) => {
                        
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        }
    },
})
