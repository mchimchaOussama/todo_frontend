<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-8 rounded-2xl shadow-lg">
      <h2 class="text-2xl font-bold text-center mb-6 text-gray-800">Connexion à votre compte</h2>

      <form @submit.prevent="handleLogin" class="space-y-5">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            v-model="email"
            type="email"
            aria-label="Email"
            placeholder="Entrez votre email"
            class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            aria-label="Mot de passe"
            placeholder="Entrez votre mot de passe"
            class="w-full px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <button
          type="submit"
          :disabled="isLoading"
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {{ isLoading ? 'Connexion...' : 'Se connecter' }}
        </button>
      </form>

      <!-- Affichage du message d'erreur -->
      <p v-if="errorMessage" class="text-red-500 text-sm text-center mt-4">
        {{ errorMessage }}
      </p>

      <p class="mt-6 text-center text-sm text-gray-600">
        Pas de compte ?
        <router-link to="/register" class="text-blue-600 hover:underline">S'inscrire</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const email = ref('')
const password = ref('')
const isLoading = ref(false)
const errorMessage = ref('')

const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/')
  } catch (error) {
    console.error('Erreur de connexion :', error)
    errorMessage.value = 'Email ou mot de passe incorrect.'
  } finally {
    isLoading.value = false
  }
}
</script>
