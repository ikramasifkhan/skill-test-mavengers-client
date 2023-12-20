import { defineStore } from 'pinia';

import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

import http from '@/helpers/http';
import router from '@/router';
export const useArticleStore = defineStore('article', {
    state: () => {
        return { 
            articles: [],
            newArticle: {
                title: '',
                content: '',
                categories: []
            },
            article: {
                id: '',
                author: '',
                title: '',
                content: '',
                categories: [],
                status: '',
                published_at: ''
            },
            errors: {
                title: ''
            }
         }
    },


    actions: {
        async articleList() {
            try {
                return await http()
                    .get('/articles')
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
        },

        async createArticle() {
            try {
                return await http()
                    .post('/articles', {
                        title: this.newArticle.title,
                        content: this.newArticle.content,
                        categories: this.newArticle.categories
                    })
                    .then(({data}) => {
                        if(data.success == true){
                            this.newArticle.title = ''
                            this.newArticle.content = ''
                            this.newArticle.categories = ''
                            toast.success("Article created successfully");
                            router.push('/articles')
                        }
                    })
                    .catch(({response}) => {
                        if(response.data.errors.title.length > 0){
                            this.errors.title = response.data.errors.title[0]  
                         }
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async updateArticle() {
            try {
                var categoryRes = this.article.categories.every((category)=> {
                    return typeof category === 'number'
                });

                return await http()
                    .put(`/articles/${this.article.id}`, {
                        id: this.article.id,
                        title: this.article.title,
                        content: this.article.content,
                        categories: (!categoryRes) ? this.article.categories.map(category=>category.id) :  this.article.categories,
                        status: this.article.status
                    })
                    .then(({data}) => {
                        if(data.success == true){
                            router.push('/articles')
                            toast.success("Article created successfully");
                        }
                    })
                    .catch(({response}) => {
                        if(response.data.errors.title.length > 0){
                            this.errors.title = response.data.errors.title[0]  
                         }
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async getArticleBySlug(slug) {
            try {
                return await http()
                    .get(`/articles/${slug}`)
                    .then(({data}) => {
                        if(data.success == true){
                            console.log(data.data);
                            this.article.id= data.data.id
                            this.article.title= data.data.title
                            this.article.author= data.data.author.name
                            this.article.content= data.data.content
                            this.article.categories= data.data.categories
                            this.article.status= data.data.status
                            this.article.published_at= data.data.published_at
                        }
                    })
                    .catch(({response}) => {
                        
                    })
            } catch (loginError) {
                console.log(loginError)
            }
        },

        async deleteArticle(id) {
            try {
                return await http()
                    .delete(`/articles/${id}`)
                    .then(({data}) => {
                        if(data.success == true){
                            this.articles = this.articles.filter(article => article.id != id)
                            toast.success("Article deleted successfully");
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
