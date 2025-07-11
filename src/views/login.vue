<template>
  <div class="login">
    <h2>Connexion</h2>
    <form @submit.prevent="handleLogin">
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Mot de passe" required>
      <button type="submit">Se connecter</button>
    </form>
    <p>Pas de compte ? <router-link to="/register">S'inscrire</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleLogin = async () => {
  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })
    router.push('/')
  } catch (error) {
    alert('Identifiants incorrects')
  }
}
</script>