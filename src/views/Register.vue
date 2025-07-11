<template>
  <div class="register">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister">
      <input v-model="fullName" placeholder="Nom complet" required>
      <input v-model="email" type="email" placeholder="Email" required>
      <input v-model="password" type="password" placeholder="Mot de passe" required>
      <input v-model="passwordConfirm" type="password" placeholder="Confirmer le mot de passe" required>
      <button type="submit">S'inscrire</button>
    </form>
    <p>Déjà un compte ? <router-link to="/login">Se connecter</router-link></p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'

const fullName = ref('')
const email = ref('')
const password = ref('')
const passwordConfirm = ref('')
const router = useRouter()
const authStore = useAuthStore()

const handleRegister = async () => {
  if (password.value !== passwordConfirm.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }

  try {
    await authStore.register({
      full_name: fullName.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirm.value
    })
    router.push('/')
  } catch (error) {
    alert("Erreur lors de l'inscription")
  }
}
</script>