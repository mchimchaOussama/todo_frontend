<template>
  <div class="task-manager">
    <h2>Gestionnaire de Tâches</h2>
    
    <!-- Votre implémentation existante des tâches -->
    <TaskList />
  </div>
</template>

<script setup>
import TaskList from '@/components/TaskList.vue'
</script>

<style scoped>
.task-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>