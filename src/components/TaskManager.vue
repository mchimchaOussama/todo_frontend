<template>
    <ChatCDNLayout>
  <div class="task-manager">
    <h2>Gestionnaire de Tâches</h2>
    <TaskList />
  </div>
  </ChatCDNLayout>
</template>

<script setup>
import TaskList from '@/components/TaskList.vue'
import ChatCDNLayout from '@/components/layouts/ChatCDNLayout.vue'
</script>

<style scoped>
.task-manager {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}
</style>