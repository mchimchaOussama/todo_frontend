<template>
  <div>
    <div
      v-if="loading && tasks.length === 0"
      class="text-center py-12 text-gray-500"
    >
      Loading tasks...
    </div>

    <div
      v-else-if="!loading && tasks.length === 0"
      class="text-center py-12 text-gray-500 bg-white rounded-lg shadow-sm"
    >
      No tasks available. Add one!
    </div>

    <ul v-else class="space-y-3">
      <TaskItem
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @update="(t) => $emit('update', t)"
        @delete="(id) => $emit('delete', id)"
      />
         <!-- <TaskList
          :tasks="taskStore.tasks"
          :loading="taskStore.loading"
          @update="updateTask"
          @delete="deleteTask"
        /> -->
    </ul>
  </div>
</template>

<script setup>
import TaskItem from './TaskItem.vue'

defineProps(['tasks', 'loading'])
defineEmits(['update', 'delete'])
</script>
