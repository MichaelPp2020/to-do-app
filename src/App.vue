<template>
  <div class="max-w-xl p-4 mx-auto">
    <h1 class="mb-4 text-2xl font-bold text-center">📝 To-Do App</h1>
    <nav class="flex justify-center gap-4 mb-4">
      <RouterLink to="/" class="text-blue-600">Todas</RouterLink>
      <RouterLink to="/completed" class="text-green-600">Completadas</RouterLink>
    </nav>
    <router-view />
  </div>
</template>
