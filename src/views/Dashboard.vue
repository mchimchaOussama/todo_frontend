
<template>
  <ChatCDNLayout>
    <div class="max-w-3xl mx-auto p-6">
      <TaskForm :task="newTask" :loading="taskStore.loading" @submit="addNewTask" />
    </div>
  </ChatCDNLayout>
</template>

<script setup>
import { ref } from 'vue'
import ChatCDNLayout from '@/components/layouts/ChatCDNLayout.vue'
import TaskForm from '@/components/TaskForm.vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()

const newTask = ref({
  title: '',
  description: '',
  completed: false
})

const addNewTask = async () => {
  await taskStore.addTask({ ...newTask.value })
  newTask.value = { title: '', description: '', completed: false }
}
</script>
