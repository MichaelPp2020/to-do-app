<!-- src/views/AllTasks.vue -->
<template>
  <div class="max-w-2xl px-4 py-8 mx-auto">
    <h1 class="mb-4 text-3xl font-bold">Todas las Tareas</h1>

    <!-- Formulario para agregar tarea -->
    <form @submit.prevent="addTask" class="flex mb-6 space-x-2">
      <input v-model="newTask" type="text" placeholder="Nueva tarea..." class="flex-grow px-4 py-2 border rounded" />
      <button type="submit" class="px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">Agregar</button>
    </form>

    <ul class="space-y-2">
      <li v-for="task in tasks" :key="task.id" class="flex items-center justify-between p-4 bg-white rounded shadow">
        <div class="flex items-center w-full space-x-2">
          <input 
            type="checkbox" 
            class="w-5 h-5 text-green-600 form-checkbox" 
            v-model="task.completed" 
            @change="updateLocalStorage" 
          />
          
          <div v-if="editingId === task.id" class="flex-grow">
            <input v-model="editedText" @keyup.enter="saveEdit(task.id)" class="w-full px-2 py-1 border rounded" />
          </div>
          <span v-else :class="{ 'line-through text-gray-500': task.completed }" class="flex-grow">
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
import { ref, onMounted } from 'vue'

const tasks = ref([])
const newTask = ref('')
const editingId = ref(null)
const editedText = ref('')

// Cargar desde localStorage
onMounted(() => {
  const saved = localStorage.getItem('tasks')
  if (saved) tasks.value = JSON.parse(saved)
})

// Agregar tarea
function addTask() {
  if (newTask.value.trim() === '') return
  tasks.value.push({
    id: Date.now(),
    text: newTask.value.trim(),
    completed: false
  })
  newTask.value = ''
  updateLocalStorage()
}

// Eliminar
function deleteTask(id) {
  tasks.value = tasks.value.filter(t => t.id !== id)
  updateLocalStorage()
}

// Editar
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

// Guardar
function updateLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks.value))
}
</script>
