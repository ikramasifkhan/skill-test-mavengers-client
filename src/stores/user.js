import { defineStore } from 'pinia';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import http from '@/helpers/http';
import router from '@/router';
export const useUserStore = defineStore('user', {
    state: () => {
        return { 
            users: [],
            user: {}
         }
    },

    actions: {
        async userList() {
            try {
                return await http()
                    .get('/users')
                    .then(({data}) => {
                        if(data.success == true){
                            this.users = data.data
                        }
                    })
                    .catch(({response}) => {
                        console.log(response);
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },
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
                        console.log(response);
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },
    },
})
