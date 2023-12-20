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
                email: '',
                password: ''
            },

            errors: {
                loginError: '',
                registerError: ''
            }
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
                            toast.success("Login success");
                            router.push('/dashboard')
                            
                            localStorage.setItem('accessToken', data.data.access_token)
                            this.userInfo.name = data.data.user.name
                            this.userInfo.email = data.data.user.email
                            this.loginInfo.email = ''
                            this.loginInfo.password = ''
                            this.errors.loginError = ''
                            
                        }
                    })
                    .catch(({response}) => {
                        if(response.status === 401){
                            this.errors.loginError = response.data.message  
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
                        email: this.newUser.email,
                        password: this.newUser.password
                    })
                    .then(({data}) => {
                        if(data.success == true){
                            toast.success("Registration successful");
                            router.push('/login')
                            this.newUser.name = ''
                            this.newUser.email = ''
                            this.newUser.password = ''
                            this.errors.registerError = ''
                        }
                    })
                    .catch(({response}) => {
                        if(response.status === 422){
                            if(response.data.errors.email.length > 0){
                               this.errors.registerError = response.data.errors.email[0]  
                            }
                        }
                        
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async logout() {
            try {
                return await http()
                    .get('/logout')
                    .then(({data}) => {
                        if(data.success == true){
                            localStorage.removeItem("userInfo");
                            localStorage.removeItem("accessToken");
                            sessionStorage.removeItem("auth");
                            router.push('/')
                            toast.success("Logout successful");
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
