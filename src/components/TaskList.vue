<template>
  <div class="task-list">
    <div class="header">
      <h2>Mes Tâches</h2>
      <button @click="showForm = !showForm">
        {{ showForm ? 'Annuler' : '+ Nouvelle Tâche' }}
      </button>
    </div>

    <TaskForm v-if="showForm" @task-created="handleTaskCreated" />

    <div v-if="taskStore.loading" class="loading">Chargement...</div>
    
    <ul v-else class="tasks">
      <li v-for="task in taskStore.tasks" :key="task.id" :class="{ completed: task.completed }">
        <input
          type="checkbox"
          :checked="task.completed"
          @change="toggleTask(task)"
        >
        <span class="task-title">{{ task.title }}</span>
        <div class="task-actions">
          <button @click="editTask(task)" class="edit-btn"></button>
          <button @click="deleteTask(task.id)" class="delete-btn"></button>
        </div>
        <p v-if="task.description" class="task-description">{{ task.description }}</p>
      </li>
    </ul>

    <div v-if="!taskStore.loading && taskStore.tasks.length === 0" class="empty-state">
      Aucune tâche pour le moment
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'
import TaskForm from '@/components/TaskForm.vue'

const taskStore = useTaskStore()
const showForm = ref(false)
const editingTask = ref(null)

onMounted(async () => {
  await taskStore.fetchTasks()
})

const toggleTask = async (task) => {
  await taskStore.updateTask(task.id, {
    completed: !task.completed
  })
}

const editTask = (task) => {
  editingTask.value = task
  showForm.value = true
}

const deleteTask = async (id) => {
  if (confirm('Supprimer cette tâche ?')) {
    await taskStore.deleteTask(id)
  }
}

const handleTaskCreated = () => {
  showForm.value = false
  editingTask.value = null
}
</script>

<style scoped>
.task-list {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.tasks {
  list-style: none;
  padding: 0;
}

.tasks li {
  background: #f9f9f9;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.task-title {
  flex-grow: 1;
  margin: 0 15px;
}

.completed .task-title {
  text-decoration: line-through;
  color: #888;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.task-description {
  margin: 5px 0 0;
  color: #666;
  font-size: 0.9em;
  width: 100%;
}

.empty-state {
  text-align: center;
  padding: 20px;
  color: #888;
}

.loading {
  text-align: center;
  padding: 20px;
}
</style>