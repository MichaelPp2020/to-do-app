<template>
  <form @submit.prevent="addTask" class="flex gap-2 mb-4">
    <input
      v-model="newTask"
      type="text"
      class="flex-1 p-2 border rounded"
      placeholder="Nueva tarea"
      required
    />
    <button class="px-4 text-white bg-blue-500 rounded">Agregar</button>
  </form>
</template>

<script setup>
import { ref, watch } from 'vue'

const props = defineProps(['tasks'])
const emit = defineEmits(['update:tasks'])

const newTask = ref('')

function addTask() {
  if (!newTask.value.trim()) return
  const task = {
    id: Date.now(),
    text: newTask.value.trim(),
    completed: false
  }
  const updated = [...props.tasks, task]
  emit('update:tasks', updated)
  localStorage.setItem('tasks', JSON.stringify(updated))
  newTask.value = ''
}
</script>
