<template>
  <div class="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
    <div
      v-if="successMessage"
      class="mb-4 p-4 text-green-800 bg-green-100 border border-green-300 rounded-lg"
    >
      {{ successMessage }}
    </div>

    <input
      v-model="task.title"
      placeholder="Title"
      required
      class="w-full px-4 py-3 mb-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
    />
    <textarea
      v-model="task.description"
      placeholder="Description"
      class="w-full px-4 py-3 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition min-h-[100px]"
    ></textarea>
    <button
      @click="handleSubmit"
      :disabled="loading"
      class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {{ loading ? 'Loading...' : 'Add Task' }}
    </button>
  </div>
</template>


<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['task', 'loading'])
const emit = defineEmits(['submit'])

const successMessage = ref('')

const handleSubmit = () => {
  if (!props.task.title) return
  emit('submit')
}

watch(
  () => props.task.title,
  (newVal, oldVal) => {
    if (!oldVal && newVal) return
    if (!newVal && oldVal) {
      successMessage.value = 'Task created successfully!'
      setTimeout(() => {
        successMessage.value = ''
      }, 3000)
    }
  }
)
</script>

