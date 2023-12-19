import { defineStore } from 'pinia';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import http from '@/helpers/http';
import router from '@/router';
export const useAuthStore = defineStore('auth', {
    state: () => {
        return { 
            loginInfo: {
                email: '',
                password: ''
            },
            userInfo: {
                name: '',
                email: ''
            },

            newUser: {
                name: '',
                email: {
                    value: '',
                    error: ''
                },
                password: ''
            },

            registerError: {}
         }
    },

    persist: {
        storage: sessionStorage,
    },

    actions: {
        async login() {
            try {
                return await http()
                    .post('/login', {
                        email: this.loginInfo.email,
                        password: this.loginInfo.password
                    })
                    .then(({data}) => {
                        if(data.success == true){
                            localStorage.setItem('accessToken', data.data.access_token)
                            this.userInfo.name = data.data.user.name
                            this.userInfo.email = data.data.user.email

                            router.push('/dashboard')
                            toast.success("Login success");
                        }
                    })
                    .catch(({response}) => {
                        if(response.status === 401){
                            toast.error(response.data.message)
                        }

                        if(response.status === 422){
                            commit("errors/SET_VALIDATION_ERRORS", response.data.errors, {root:true})
                        }
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async register() {
            try {
                return await http()
                    .post('/register', {
                        name: this.newUser.name,
                        email: this.newUser.email.value,
                        password: this.newUser.password
                    })
                    .then(({data}) => {
                        if(data.success == true){
                            this.newUser.name = ''
                            this.newUser.email.value = ''
                            this.newUser.email.error = ''
                            this.newUser.password = ''
                            router.push('/login')
                            toast.success("Registration successful");
                        }
                    })
                    .catch(({response}) => {
                        if(response.status === 422){
                            console.log();
                            if(response.data.errors.email.length > 0){
                               this.newUser.email.error = response.data.errors.email[0]  
                            }
                        }
                        
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        removeEmailServerError(){
            this.newUser.email.error = ''
        }
    },
})
