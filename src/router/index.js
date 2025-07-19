import { createRouter, createWebHistory } from 'vue-router'
import AllTasks from '../views/AllTasks.vue'
import CompletedTasks from '../views/CompletedTasks.vue'

const routes = [
  { path: '/', component: AllTasks },
  { path: '/completed', component: CompletedTasks }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
