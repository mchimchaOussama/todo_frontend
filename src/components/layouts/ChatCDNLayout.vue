<template>
  <div class="flex min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 text-gray-900">
    
    <aside class="w-80 bg-white/80 backdrop-blur-xl border-r border-white/20 hidden md:flex flex-col shadow-2xl relative overflow-hidden">
      <div class="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
      <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600"></div>
    
      <div class="relative p-8 border-b border-gray-100/50">
        <div class="flex items-center space-x-4">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform hover:scale-105 transition-transform duration-300">
              <svg class="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
              </svg>
            </div>
            <div class="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div>
            <h1 class="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">TaskFlow</h1>
            <p class="text-sm text-gray-600 font-medium">Gestion intelligente</p>
          </div>
        </div>
      </div>
      <nav class="relative p-6 flex-1 space-y-2">
        <router-link
          to="/"
          exact
          class="group flex items-center space-x-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          :class="linkClass('/')"
        >
          <div class="relative">
            <svg class="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v6H8V5z"></path>
            </svg>
          </div>
          <span class="text-base">Ajouter Tache</span>
          <div class="ml-auto w-2 h-2 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </router-link>
        
        <router-link
          to="/tasks"
          class="group flex items-center space-x-4 px-5 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg"
          :class="linkClass('tasks')"
        >
          <div class="relative">
            <svg class="w-6 h-6 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path>
            </svg>
          </div>
          <span class="text-base">Mes Tâches</span>
          <div class="ml-auto w-2 h-2 bg-current rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        </router-link>

      </nav>
      <div class="relative p-6 border-t border-gray-100/50">
        <div class="flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-100/50 mb-6 hover:shadow-lg transition-all duration-300">
          <div class="relative">
            <div class="w-12 h-12 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-lg font-bold shadow-lg">
              {{ authStore.user ? authStore.user.full_name.charAt(0).toUpperCase() : '' }}
            </div>
            <div class="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse"></div>
          </div>
          <div class="flex-1">
            <p class="text-sm font-bold text-gray-900">{{ authStore.user ? authStore.user.full_name : 'Chargement...' }}</p>
            <p class="text-xs text-gray-600 font-medium">2CA Business</p>
          </div>
        </div>
        
        <button @click="handleLogout" class="w-full group relative overflow-hidden bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-[1.02] hover:shadow-xl flex items-center justify-center space-x-3">
          <div class="absolute inset-0 bg-gradient-to-r from-red-400 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <svg class="w-5 h-5 relative z-10 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span class="relative z-10">Déconnexion</span>
        </button>
      </div>
    </aside>
    <div class="flex-1 flex flex-col">
      <header class="bg-white/80 backdrop-blur-xl border-b border-white/20 px-8 py-6 shadow-lg relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-indigo-600/5"></div>
        <div class="relative flex justify-between items-center">
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
              Bienvenue dans votre espace
            </h1>
            <p class="text-base text-gray-600 mt-2 font-medium">
              Gérez vos tâches avec style et efficacité
            </p>
          </div>
          <div class="flex items-center space-x-6">

            <div class="flex items-center space-x-4 bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-3 rounded-2xl border border-blue-100/50 hover:shadow-lg transition-all duration-300">
              <span class="text-sm font-bold text-blue-900">
                Salut, {{ authStore.user ? authStore.user.full_name.split(' ')[0] : 'Chargement...' }}
              </span>
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-sm font-bold shadow-lg">
                {{ authStore.user ? authStore.user.full_name.charAt(0).toUpperCase() : '' }}
              </div>
            </div>
          </div>
        </div>
      </header>

     
      <main class="p-8 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 overflow-y-auto flex-1 relative">
      
        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-20 left-20 w-32 h-32 bg-blue-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div class="absolute bottom-20 right-20 w-40 h-40 bg-purple-400/10 rounded-full blur-2xl animate-pulse animation-delay-1000"></div>
          <div class="absolute top-1/2 left-1/3 w-24 h-24 bg-indigo-400/10 rounded-full blur-2xl animate-pulse animation-delay-2000"></div>
        </div>
        
        <div class="max-w-7xl mx-auto relative z-10">
          <div class="bg-white/90 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 min-h-96 relative overflow-hidden">
         
            <div class="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-transparent to-indigo-50/50 pointer-events-none"></div>
            
        
            <div class="relative z-10">
              <slot />
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { onMounted } from 'vue'

const route = useRoute()
const authStore = useAuthStore()

onMounted(() => {
  authStore.initialize()
})

function handleLogout() {
  authStore.logout()
}

const linkClass = (match) => {
  const isActive =
    (route.path === '/' && match === '/') ||
    (match !== '/' && route.path.includes(match))
  
  return isActive
    ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-600/25'
    : 'text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:text-gray-900'
}
</script>

<style scoped>
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: linear-gradient(to bottom, #f1f5f9, #e2e8f0);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: linear-gradient(to bottom, #cbd5e1, #94a3b8);
  border-radius: 4px;
  border: 1px solid #f1f5f9;
}

::-webkit-scrollbar-thumb:hover {
  background: linear-gradient(to bottom, #94a3b8, #64748b);
}

input:focus, button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

button:hover, .router-link-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.animation-delay-1000 {
  animation-delay: 1s;
}

.animation-delay-2000 {
  animation-delay: 2s;
}

@supports not (backdrop-filter: blur(12px)) {
  .backdrop-blur-xl {
    background-color: rgba(255, 255, 255, 0.95);
  }
}

@keyframes gradientShift {
  0%, 100% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
}

.bg-gradient-to-r {
  background-size: 200% 200%;
  animation: gradientShift 6s ease-in-out infinite;
}

@keyframes shadowPulse {
  0%, 100% { box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04); }
  50% { box-shadow: 0 20px 35px -5px rgba(0, 0, 0, 0.15), 0 10px 15px -5px rgba(0, 0, 0, 0.08); }
}

.shadow-2xl {
  animation: shadowPulse 4s ease-in-out infinite;
}
</style>