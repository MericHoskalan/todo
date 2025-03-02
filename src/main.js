import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'



const app = createApp(App)
const pinia = createPinia()

// Global hata gösterme fonksiyonu
app.config.globalProperties.$showError = (message) => {
  const toast = document.createElement('div')
  toast.className = 'error-toast'
  toast.textContent = message
  
  // Toast stil tanımları
  toast.style.position = 'fixed'
  toast.style.bottom = '20px'
  toast.style.right = '20px'
  toast.style.backgroundColor = '#ff4444'
  toast.style.color = 'white'
  toast.style.padding = '12px 24px'
  toast.style.borderRadius = '4px'
  toast.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)'
  toast.style.zIndex = '9999'
  toast.style.minWidth = '200px'
  toast.style.textAlign = 'center'
  
  document.body.appendChild(toast)
  
  // 3 saniye sonra toast'u kaldır
  setTimeout(() => {
    document.body.removeChild(toast)
  }, 3000)
}

app.use(pinia)
app.use(router)
app.mount('#app')