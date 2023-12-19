import { defineStore } from 'pinia';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import http from '@/helpers/http';
import router from '@/router';
export const useUserStore = defineStore('user', {
    state: () => {
        return { 
            user: {}
         }
    },

    actions: {
        async userDetails() {
            try {
                return await http()
                    .get('/user')
                    .then(({data}) => {
                        if(data.success == true){
                            this.user = data.data
                        }
                    })
                    .catch(({response}) => {
                        
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },
    },
})
