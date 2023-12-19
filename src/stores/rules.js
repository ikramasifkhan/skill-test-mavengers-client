import { defineStore } from 'pinia';


export const useRulesStore = defineStore('rules', {
    state: () => {
        return { 
            isValidForm: false,
            emailRules: [
                value => {
                  if (value) return true
        
                  return 'E-mail is required.'
                },
                value => {
                  if (/.+@.+\..+/.test(value)) return true
        
                  return 'E-mail must be valid.'
                },
            ],

            passwordRules: [
                value => {
                  if (value) return true
        
                  return 'Password field is required'
                },
                value => {
                    if (value?.length > 7) return true
        
                  return 'Password must be 8 character'
                },
            ],

            requiredRules: [
              value => {
                if (value) return true
      
                return 'This field is required'
              },
            ]
         }
    },

    actions: {
        
    },
})
