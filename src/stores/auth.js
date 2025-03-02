import { defineStore } from 'pinia'
import { auth, db } from '../firebase'
import { 
    signInWithEmailAndPassword,
    signOut
} from 'firebase/auth'
import { doc, getDoc } from 'firebase/firestore'

export const useAuthStore = defineStore('auth', {
    // State: Verilerin tutulduğu yer
    state: () => ({
        user: null,
        loading: false,
        error: null
    }),

    // Getters: State'i okumak için kullanılır
    getters: {
        //Kullanıcı girişi kontrol et
        isAuthenticated: (state) => !!state.user,
    },

    // Actions: State'i değiştirmek için kullanılır
    actions: {
        //Kullanıcı giriş yapmış mı kontrol işlemi
        checkAuth() {
            if (!this.isAuthenticated) {
                message.error('You must be logged in to access this page')
                router.push('/')
                return false
            }
            return true
        },

        //Kullanıcı giriş yap
        async login(email, password){
            this.loadling = true
            this.error = null
            try {
                // Firebase ile giriş yap
                const userCreditional = await signInWithEmailAndPassword(auth, email, password)
                // Başarılı giriş - kullanıcı bilgisini kaydet
                this.user = userCreditional.user
                return true
            } catch (err) {
                this.error = err.message
                return false
            }
            finally {
                this.loading = false
            }
        },

        async logout(){
            try{
                await signOut(auth)
                this.user = null
            } catch(err){
                this.error = err.message
            }
        }
    }
})