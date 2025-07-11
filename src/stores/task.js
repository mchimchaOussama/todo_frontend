import { defineStore } from 'pinia'
import axios from 'axios'

export const useTaskStore = defineStore('task', {
  state: () => ({
    tasks: [],
    loading: false
  }),
  actions: {
    async fetchTasks() {
      this.loading = true
      try {
        const response = await axios.get('/api/tasks')
        this.tasks = response.data.tasks
      } finally {
        this.loading = false
      }
    },
    async addTask(taskData) {
      const response = await axios.post('/api/tasks', taskData)
      this.tasks.push(response.data)
    },
    async updateTask(id, updates) {
      const response = await axios.put(`/api/tasks/${id}`, updates)
      const index = this.tasks.findIndex(t => t.id === id)
      this.tasks.splice(index, 1, response.data)
    },
    async deleteTask(id) {
      await axios.delete(`/api/tasks/${id}`)
      this.tasks = this.tasks.filter(t => t.id !== id)
    }
  }
})