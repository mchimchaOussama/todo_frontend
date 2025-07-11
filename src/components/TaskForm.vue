<template>
  <form @submit.prevent="handleSubmit">
    <input v-model="title" placeholder="Titre" required>
    <textarea v-model="description" placeholder="Description"></textarea>
    <button type="submit">{{ editing ? 'Modifier' : 'Ajouter' }}</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useTaskStore } from '@/stores/task'

const props = defineProps({
  task: { type: Object, default: null }
})

const taskStore = useTaskStore()
const title = ref(props.task?.title || '')
const description = ref(props.task?.description || '')

const handleSubmit = async () => {
  const taskData = { title: title.value, description: description.value }
  
  if (props.task) {
    await taskStore.updateTask(props.task.id, taskData)
  } else {
    await taskStore.addTask(taskData)
  }
  
  // Reset form
  if (!props.task) {
    title.value = ''
    description.value = ''
  }
}
</script>