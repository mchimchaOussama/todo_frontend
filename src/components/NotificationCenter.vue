<template>
  <div class="notification-center">
    <div v-for="notification in notifications" :key="notification.id">
      {{ notification.message }}
    </div>
  </div>
</template>

<script setup>
import { useNotificationStore } from '@/stores/notification'

const notificationStore = useNotificationStore()
const notifications = notificationStore.notifications
</script>