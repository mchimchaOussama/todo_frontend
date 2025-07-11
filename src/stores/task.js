// stores/task.js
import { defineStore } from 'pinia'
import api from '@/plugins/axios'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false
  }),
  actions: {
async fetchTasks() {
  this.loading = true
  try {
    const response = await api.get('/tasks')
    console.log('Fetched tasks:', response.data)
    this.tasks = response.data.tasks || response.data.data || response.data
  } finally {
    this.loading = false
  }
},
async addTask(task) {
  this.loading = true;
  try {
    await api.post('/tasks', task);
    await this.fetchTasks(); 
  } catch (error) {
    console.error('Erreur lors de l\'ajout:', error);
  } finally {
    this.loading = false;
  }
},
    async updateTask(id, task) {
      this.loading = true
      try {
        const response = await api.put(`/tasks/${id}`, task)
        const index = this.tasks.findIndex(t => t.id === id)
        if (index !== -1) this.tasks[index] = response.data
      } finally {
        this.loading = false
      }
    },
    async deleteTask(id) {
      this.loading = true
      try {
        await api.delete(`/tasks/${id}`)
        this.tasks = this.tasks.filter(t => t.id !== id)
      } finally {
        this.loading = false
      }
    }
  }
})
