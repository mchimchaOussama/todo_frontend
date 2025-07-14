<template>
  <li
    class="bg-white p-5 rounded-lg shadow-sm hover:shadow-md transition flex justify-between items-start border-l-4"
    :class="{
      'border-green-500 bg-green-50': task.completed,
      'border-transparent': !task.completed
    }"
  >
    <div class="flex items-start space-x-4 flex-grow">
      <input
        type="checkbox"
        v-model="task.completed"
        @change="() => emit('update', task)"
        class="mt-1 h-5 w-5 rounded focus:ring-0 transition"
        :class="{
          'text-green-600 border-green-300': task.completed,
          'text-blue-600 border-gray-300': !task.completed
        }"
      />
      <div class="flex-grow">
        <h3
          class="font-medium"
          :class="{
            'text-gray-900': !task.completed,
            'text-green-800 line-through': task.completed
          }"
        >
          {{ task.title }}
        </h3>
        <p
          v-if="task.description"
          class="mt-1"
          :class="{
            'text-gray-600': !task.completed,
            'text-green-600': task.completed
          }"
        >
          {{ task.description }}
        </p>
      </div>
    </div>
    <button
      @click="() => emit('delete', task.id)"
      class="p-1 transition"
      :class="{
        'text-gray-400 hover:text-red-500': !task.completed,
        'text-green-400 hover:text-red-500': task.completed
      }"
      title="Delete task"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none"
           viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4
              a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
      </svg>
    </button>
  </li>
</template>

<script setup>
defineProps(['task'])
const emit = defineEmits(['update', 'delete'])
</script>
