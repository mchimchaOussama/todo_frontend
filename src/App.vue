<script setup>
import { onMounted } from 'vue'
import TaskManager from '@/components/TaskManager.vue'
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()

onMounted(() => {
  const userId = authStore.user?.id;

  if (!userId) {
    console.error("Missing user ID");
    return;
  }

  Echo.private(`App.Models.User.${userId}`)
    .listen('.task.created', (e) => {
      console.log('Task created event received:', e);
      alert(`Nouvelle tâche : ${e.task.title}`);
    });
});

</script>

<template>
  <div id="app">
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
