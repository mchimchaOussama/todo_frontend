import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import Echo from 'laravel-echo'
import Pusher from 'pusher-js'
import "./style.css" 

const app = createApp(App)

app.use(createPinia())
app.use(router)

console.log('Final Pusher Config:', {
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true
})

if (!import.meta.env.VITE_PUSHER_APP_KEY) {
  throw new Error('Missing Pusher key! Verify your frontend .env file')
}

window.Pusher = Pusher

window.Echo = new Echo({
  broadcaster: 'pusher',
  key: import.meta.env.VITE_PUSHER_APP_KEY,
  cluster: import.meta.env.VITE_PUSHER_APP_CLUSTER,
  forceTLS: true,
  authEndpoint: import.meta.env.VITE_API_URL + '/broadcasting/auth',
  auth: {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
});


app.mount('#app')

