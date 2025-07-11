<script setup>
import { onMounted } from 'vue'
import TaskManager from '@/components/TaskManager.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

onMounted(() => {
window.Echo.channel('tasks')
.listen('.task.created', (e) => {
console.log('Broadcast received:', e.message)
alert('Received message: ' + e.message)
})
})
</script>

<template>
  <div id="app">
    <header>
      <h1>  {{ authStore.user?.full_name || 'invité' }} To-Do List</h1>
    </header>
    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
