<template>
  <div class="task-manager">
    <!-- Formulaire d'ajout -->
    <div class="task-form">
      <input v-model="newTask.title" placeholder="Titre" required>
      <textarea v-model="newTask.description" placeholder="Description"></textarea>
      <button @click="addNewTask" :disabled="taskStore.loading">
        {{ taskStore.loading ? 'Chargement...' : 'Ajouter' }}
      </button>
    </div>

    <!-- Liste des tâches -->
    <div v-if="taskStore.loading && taskStore.tasks.length === 0" class="loading">
      Chargement des tâches...
    </div>

    <ul v-else class="task-list">
      <li v-for="task in taskStore.tasks" :key="task.id" 
          :class="{ 'completed': task.completed }">
        <div class="task-content">
          <input type="checkbox" 
                 v-model="task.completed"
                 @change="updateTask(task)">
          <div class="task-details">
            <h3>{{ task.title }}</h3>
            <p v-if="task.description">{{ task.description }}</p>
          </div>
        </div>
        <div class="task-actions">
          <button @click="editTask(task)">✏️</button>
          <button @click="deleteTask(task.id)">🗑️</button>
        </div>
      </li>
    </ul>

    <!-- État vide -->
    <div v-if="!taskStore.loading && taskStore.tasks.length === 0" class="empty-state">
      Aucune tâche disponible. Ajoutez-en une !
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useTaskStore } from '@/stores/task'

const taskStore = useTaskStore()
const newTask = ref({
  title: '',
  description: '',
  completed: false
})

// Charger les tâches au montage
onMounted(async () => {
  await taskStore.fetchTasks()
})

// Ajouter une nouvelle tâche
const addNewTask = async () => {
  if (!newTask.value.title) return
  
  await taskStore.addTask({
    title: newTask.value.title,
    description: newTask.value.description,
    completed: newTask.value.completed
  })
  
  // Réinitialiser le formulaire
  newTask.value = { title: '', description: '', completed: false }
}

// Mettre à jour une tâche
const updateTask = async (task) => {
  await taskStore.updateTask(task.id, {
    completed: task.completed,
    title: task.title,
    description: task.description
  })
}

// Supprimer une tâche
const deleteTask = async (id) => {
  if (confirm('Supprimer cette tâche ?')) {
    await taskStore.deleteTask(id)
  }
}

// Éditer une tâche
const editTask = (task) => {

  console.log('Édition de la tâche:', task)
}
</script>

<style scoped>
.task-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.task-form {
  margin-bottom: 30px;
  padding: 20px;
  background: #f5f5f5;
  border-radius: 8px;
}

.task-form input,
.task-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
}

.task-list {
  list-style: none;
  padding: 0;
}

.task-list li {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.task-content {
  display: flex;
  align-items: center;
  flex-grow: 1;
}

.task-details {
  margin-left: 15px;
}

.task-details h3 {
  margin: 0;
}

.completed .task-details h3 {
  text-decoration: line-through;
  color: #888;
}

.task-actions button {
  background: none;
  border: none;
  cursor: pointer;
  margin-left: 10px;
}

.loading, .empty-state {
  text-align: center;
  padding: 30px;
  color: #666;
}
</style>