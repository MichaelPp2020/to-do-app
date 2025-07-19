<template>
  <ul class="space-y-2">
    <li v-for="task in tasks" :key="task.id" class="flex items-center gap-2">
      <input type="checkbox" v-model="task.completed" @change="save" />
      <span :class="{ 'line-through text-gray-500': task.completed }">{{ task.text }}</span>
      <button @click="remove(task.id)" class="ml-auto text-red-600">🗑</button>
    </li>
  </ul>
</template>

<script setup>
const props = defineProps(['tasks'])
const emit = defineEmits(['update:tasks'])

function save() {
  emit('update:tasks', props.tasks)
  localStorage.setItem('tasks', JSON.stringify(props.tasks))
}

function remove(id) {
  const filtered = props.tasks.filter(task => task.id !== id)
  emit('update:tasks', filtered)
  localStorage.setItem('tasks', JSON.stringify(filtered))
}
</script>
