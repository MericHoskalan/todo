<template>
    <a-form @submit.prevent="handleSubmit" class="login-form">
    <h1 class="heading">Login</h1>
    <br />
        <div class="inputs">
            <div class="input-element">
                <span>Email:</span>
                <input type="text" v-model="email" placeholder="Email">
            </div>
            <br>
            <div class="input-element">
                <span>Password:</span>
                <input type="password" v-model="password" placeholder="Password">
            </div>
        </div>
        <br>
        <div class="buttons"></div>
        <button type="button" class="login-button" @click="handleSubmit">Login</button>
        <button type="button" class="login-button" @click="loginWithGoogle">Login with Google</button>
        <p>Don't have an account? <router-link to="/register">Register</router-link></p>    
    </a-form>
</template>

<script setup>
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { useAuthStore } from '../stores/auth'
    import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
    import { message } from 'ant-design-vue'

    const authStore = useAuthStore()
    const email = ref('')
    const password = ref('')
    const router = useRouter();

    const handleSubmit = async () => {
        return new Promise((resolve, reject) => {
            //Input validation
            if(!email.value || !password.value){
                reject(new Error("Email and password are required"))
                message.error("Email and password are required")
                return
            }
            //Login process
            authStore.login(email.value, password.value)
            .then(success => {
                if(success){
                    message.success("Login successful")
                    router.push('/todo')
                    console.log("Login successful")
                    resolve(success)
                } else {
                    message.error("Invalid email or password")
                    console.log("Login failed")
                    reject(new Error("Invalid email or password"))
                }
            })
            .catch((error) => {
                let errorMessage = "Login failed"
                switch(error.code){
                    case "auth/invalid-email":
                        errorMessage = "Invalid email format"
                        break  
                }
                console.log(errorMessage)
                reject(new Error(errorMessage))
            })
        })
    }
        
    const loginWithGoogle = async () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log("Google sign in successful");
            router.push('/todo');
        })
        .catch((error) => {
            console.log(error.message);
        })
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

body {
    background-color: #764fa6;
    margin: 0;
    padding: 0;
    height: 400px;
}

.login-form {
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    padding: 25px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin-top: 200px;
    width: 300px;
    height: 400px;
    margin-left: auto;
    margin-right: auto;
    margin-top: 150px;
}

.login-form input {
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    width: 200px;
}

.input-element {
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;    
    width: 100%;
    justify-content: space-between;
}

.heading {
    font-size: 30px;
    font-family: 'BebasNeue';
    font-weight: bold;
    margin-bottom: 10px;
}

.login-button {
    background-color: #764fa6;
    color: white;
    width: 100%;
    justify-content: end;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
}

.login-button:hover {
    background-color: #8b5fc7;
}

</style>