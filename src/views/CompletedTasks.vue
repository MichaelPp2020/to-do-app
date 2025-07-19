<!-- src/views/CompletedTasks.vue -->
<template>
  <div class="max-w-2xl px-4 py-8 mx-auto">
    <h1 class="mb-4 text-3xl font-bold">Tareas Completadas</h1>

    <ul class="space-y-2">
      <li v-for="task in completedTasks" :key="task.id" class="flex items-center justify-between p-4 bg-white rounded shadow">
        <div class="flex items-center w-full space-x-2">
          <input 
            type="checkbox" 
            class="w-5 h-5 text-green-600 form-checkbox" 
            :checked="task.completed" 
            @change="toggleTask(task.id)" 
          />

          <div v-if="editingId === task.id" class="flex-grow">
            <input v-model="editedText" @keyup.enter="saveEdit(task.id)" class="w-full px-2 py-1 border rounded" />
          </div>
          <span v-else class="flex-grow text-gray-500 line-through">
            {{ task.text }}
          </span>
        </div>

        <div class="flex space-x-2">
          <button v-if="editingId !== task.id" @click="startEdit(task)" class="text-yellow-500 hover:text-yellow-700">Editar</button>
          <button v-if="editingId === task.id" @click="saveEdit(task.id)" class="text-green-500 hover:text-green-700">Guardar</button>
          <button @click="deleteTask(task.id)" class="text-red-500 hover:text-red-700">Eliminar</button>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const tasks = ref([])
const editingId = ref(null)
const editedText = ref('')

onMounted(() => {
  const savedTasks = localStorage.getItem('tasks')
  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
})

const completedTasks = computed(() =>
  tasks.value.filter(task => task.completed)
)

function toggleTask(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task) {
    task.completed = !task.completed
    updateLocalStorage()
  }
}

function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
  updateLocalStorage()
}

function startEdit(task) {
  editingId.value = task.id
  editedText.value = task.text
}

function saveEdit(id) {
  const task = tasks.value.find(t => t.id === id)
  if (task && editedText.value.trim() !== '') {
    task.text = editedText.value.trim()
    editingId.value = null
    editedText.value = ''
    updateLocalStorage()
  }
}

function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}
</script>
