<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-0">
    <div class="w-full max-w-lg bg-white p-4 sm:p-6 rounded-xl shadow-md">
      <h2 class="text-lg sm:text-xl font-semibold text-center mb-5 text-gray-800">Créer un compte</h2>

      <form @submit.prevent="handleRegister" enctype="multipart/form-data" class="space-y-3 text-sm">
        <div>
          <label class="block mb-1 text-gray-700">Nom complet</label>
          <input
            v-model="fullName"
            type="text"
            placeholder="Nom complet"
            required
            class="w-full text-sm px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-700">Email</label>
          <input
            v-model="email"
            type="email"
            placeholder="Email"
            required
            class="w-full text-sm px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-700">Téléphone</label>
          <input
            v-model="phoneNumber"
            type="text"
            placeholder="Téléphone"
            required
            class="w-full text-sm px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-700">Adresse</label>
          <input
            v-model="address"
            type="text"
            placeholder="Adresse"
            required
            class="w-full text-sm px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-700">Mot de passe</label>
          <input
            v-model="password"
            type="password"
            placeholder="Mot de passe"
            required
            class="w-full text-sm px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-700">Confirmer le mot de passe</label>
          <input
            v-model="passwordConfirm"
            type="password"
            placeholder="Confirmer le mot de passe"
            required
            class="w-full text-sm px-3 py-1.5 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label class="block mb-1 text-gray-700">Image de profil</label>
          <input
            type="file"
            @change="handleFile"
            accept="image/*"
            class="block w-full text-sm text-gray-700 file:mr-3 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
        </div>

          <button
            type="submit"
            :disabled="isLoading"
            class="w-full flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-4 rounded-md transition disabled:opacity-50"
          >
            <svg
              v-if="isLoading"
              class="w-4 h-4 animate-spin text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
            <span>{{ isLoading ? 'Chargement...' : "S'inscrire" }}</span>
          </button>

      </form>

      <p class="mt-4 text-center text-sm text-gray-600">
        Déjà un compte ?
        <router-link to="/login" class="text-blue-600 hover:underline">Se connecter</router-link>
      </p>
    </div>
  </div>
</template>



<script setup>
import { ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useRouter } from 'vue-router'


const isLoading = ref(false)
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

   isLoading.value = true 

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
  } finally {
    isLoading.value = false
  }
}
</script>
