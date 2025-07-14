<!-- /src/views/TaskListPage.vue -->
<template>
     <ChatCDNLayout>
  <div class="max-w-4xl mx-auto p-6">
    <TaskList
      :tasks="taskStore.tasks"
      :loading="taskStore.loading"
      @update="updateTask"
      @delete="deleteTask"
    />
  </div>
  </ChatCDNLayout>
</template>

<script setup>
import { onMounted } from 'vue'
import ChatCDNLayout from '@/components/layouts/ChatCDNLayout.vue'
import TaskList from '@/components/TaskList.vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()

onMounted(() => {
  taskStore.fetchTasks()
})

const updateTask = async (task) => {
  await taskStore.updateTask(task.id, task)
}

const deleteTask = async (id) => {
  if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
    await taskStore.deleteTask(id)
  }
}
</script>
