<template>
    <div class="todo-list">
        <h1 class="heading">TODO LIST</h1>
        <input class="input" type="text" v-model="newTodo" @keyup.enter="addTodo" placeholder="What needs to be done?">
        <br>
        <ul class="list">           
            <li 
                v-for="todo in todos"
                class="todo"
                :key="todo.id"
                :class="[
                    todo.id === editingTodoId ? 'editing' : ' '
                    ]"
            >
            <label class="label" :class="{'cross-out': todo.completed}" for="checkbox">{{ todo.text }}</label>
            <div class="button-container">
                <input type="checkbox" class="checkbox" id="todo.id" v-model="todo.completed">    
                <button type="button" class="delete-button" @click="deleteTodo(todo.id)">Delete</button>            
            </div>
            </li>  
        </ul>
    </div>
    <button type="button" class="logout-button" @click='handleLogout'>Logout</button>     


</template>
<script setup>
import { ref, computed } from 'vue';
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const newTodo = ref('');
const todos = ref([]);
const editingTodoId = ref(null);
const router = useRouter();

const addTodo = () => {
    console.log('addTodo called');
    if(newTodo.value.trim() === '') {
        return;
    }
    todos.value.push({
        id: todos.value.length + 1,
        text: newTodo.value,
        completed: false
    });
    newTodo.value = '';
}
const completedTodos = computed(() => {
    const isDone = todos.value.filter(todo => !todo.completed);
    return isDone.strike-out;
});

const deleteTodo = (id) => {
    if (confirm('Bu görevi silmek istediğinize emin misiniz?')) {
        todos.value = todos.value.filter(todo => todo.id !== id);
    }
}

const handleLogout = async () => {
    await authStore.logout();
    router.push('/');
}
</script>
<style>
@font-face{
    font-family: 'BebasNeue';
    src: url('/BebasNeue/Commercial/TTF/BebasNeue-Bold.ttf');
    font-weight: normal;
    font-style: normal;
}
@font-face{
    font-family: 'BebasNeue-Regular';
    src: url('/BebasNeue/Commercial/TTF/BebasNeue-Regular.ttf');
    font-weight: normal;
    font-style: normal;
}

.todo-list{
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-top: 50px;
    width: 100%;
    
}

.heading {
    font-family: 'BebasNeue';
    font-size: 50px;
    color: #000000;
    text-align: center;
    margin-top: 50px;
}

.input {
    justify-content: center;
    width: 60%;
    height: 40px;
    font-size: 20px;
    padding: 5px;
    margin-top: 20px;
    border: 1px solid #000000;
    border-radius: 10px;
}

.list {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 60%;
    margin-top: 20px;
    padding: 0;
    list-style-type: none;
}

.todo {
    font-family:Arial, Helvetica, sans-serif;
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 120%;
    height: 40px;
    margin-top: 20px;
    border: 1px solid #000000;
    border-radius: 10px;
    padding: 10px;
    background-color: rgb(94, 48, 141);
    color: white;
}  

.checkbox {
    width: 20px;
    height: 40px;
}

.logout-button {
    font-family: 'BebasNeue';
    font-size: 20px;
    position: absolute;
    right: 5px;
    top: 5px;
    background-color: #000000;
    color: white;
    height: 40px;
    border-radius: 10px;
    border: 1px solid #000000;
    cursor: pointer;
}

.cross-out {
    text-decoration: line-through;
}

.delete-button {
    font-family: 'BebasNeue';
    background-color: #870f1d;
    font-size: 20px;
    height: 40px;
    right: 5px;
    top: 5px;
}

.button-container {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    width: 100%;
}

.label {
    width: 100%;
    font-size: 20px;
    color: white;
}
</style>