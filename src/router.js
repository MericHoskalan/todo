import { createRouter, createWebHistory } from 'vue-router'
import loginPage from './components/login.vue'
import todoPage from './components/todo.vue';
import registerPage from './components/register.vue';
import { getAuth } from 'firebase/auth'
import { message } from 'ant-design-vue'


const routes = [
    {path: '/', component: loginPage},
    {path: '/todo', component: todoPage, meta: {requiresAuth: true}},
    {path: '/register', component: registerPage}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if(to.matched.some(record => record.meta.requiresAuth)){
    if(getAuth().currentUser){
      next()
    }
    else{
      message.error('You must be logged in to access this page');
      next("/");
    }
  }   
  else{
    next();
  }
})

export default router