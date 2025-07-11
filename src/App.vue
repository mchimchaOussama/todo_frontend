<script setup>
import TaskManager from '@/components/TaskManager.vue'
</script>

<template>
  <div id="app">
    <header>
      <h1>Ma To-Do List</h1>
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
