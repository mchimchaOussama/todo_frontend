<template>
  <div class="register">
    <h2>Inscription</h2>
    <form @submit.prevent="handleRegister" enctype="multipart/form-data">
      <input v-model="fullName" placeholder="Nom complet" required />

      <input v-model="email" type="email" placeholder="Email" required />

      <input v-model="phoneNumber" placeholder="Téléphone" required />

      <input v-model="address" placeholder="Adresse" required />

      <input v-model="password" type="password" placeholder="Mot de passe" required />

      <input v-model="passwordConfirm" type="password" placeholder="Confirmer le mot de passe" required />

      <input type="file" @change="handleFile" accept="image/*" />

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
const phoneNumber = ref('')
const address = ref('')
const password = ref('')
const passwordConfirm = ref('')
const image = ref(null)

const router = useRouter()
const authStore = useAuthStore()

const handleFile = (event) => {
  image.value = event.target.files[0]
}

const handleRegister = async () => {
  if (password.value !== passwordConfirm.value) {
    alert('Les mots de passe ne correspondent pas')
    return
  }

  const formData = new FormData()
  formData.append('full_name', fullName.value)
  formData.append('email', email.value)
  formData.append('phone_number', phoneNumber.value)
  formData.append('address', address.value)
  formData.append('password', password.value)
  formData.append('password_confirmation', passwordConfirm.value)
  if (image.value) {
    formData.append('image', image.value)
  }

  try {
    await authStore.register(formData)
    router.push('/')
  } catch (error) {
    console.error(error.response?.data || error.message)
    alert("Erreur lors de l'inscription")
  }
}
</script>
