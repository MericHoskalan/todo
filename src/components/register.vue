<template>
    <div class="register-container">
        <h1 class="register-title">Create an Account</h1>
        <div class="register-form">
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
            <div class="buttons">
                <span><button class="google-button" @click="signInWithGoogle">Sign in with Google</button></span>
                <span><button class="register-button" @click="register">Register</button></span>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue';
    import { getAuth, createUserWithEmailAndPassword,
        signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
    import { useRouter } from 'vue-router';
    import { message } from 'ant-design-vue'

    const email = ref('');
    const password = ref('');
    const router = useRouter();


    const register = async () => {
        try{
            await createUserWithEmailAndPassword(getAuth(), email.value, password.value)
            console.log("Succesfully Registered");
            router.push('/');
        }
        catch(error){
            let errorMessage = "Registration failed";
            
            switch(error.code){
                case 'auth/email-already-in-use':
                    errorMessage = "Email already in use";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Invalid email";
                    break;
                case 'auth/weak-password':
                    errorMessage = "Password must be at least 6 characters long";
                    break;
            }
            message.error(errorMessage);
            console.log(error.message);
        }
    }

    const signInWithGoogle = async () => {
            const provider = new GoogleAuthProvider();
            signInWithPopup(getAuth(), provider)
            .then((result) => {
                console.log("Google sign in successful");
                router.push('/todo');
            })
            .catch((error) => {
                message.error(error.message);
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

.register-container {
    background-color: #f2f2f2;
    font-family: Arial, sans-serif;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
    margin-top: 200px;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
}

.register-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
}

.register-input {
    gap: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

.register-form input {
    padding: 8px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    width: 200px;
}

.register-form button:hover {
    background-color: #8b5fc7;
}

.register-title {
    color: #000;
    font-family: 'BebasNeue';
    margin-bottom: 20px;
    font-size: 40px;
}

.input-element {
    gap: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;    
    width: 100%;
    justify-content: space-between;
}

.buttons {
    display: flex;
    font-size: 15px;
    flex-direction: row;
    align-items: center;
    align-content: center;
    width: 100%;
    justify-content: space-between;
}

.register-button {
    background-color: #764fa6;
    color: white;
    width: 100%;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
}

.google-button {
    background-color: #007ef3;
    color: white;
    width: 100%;
    border: none;
    padding: 10px;
    border-radius: 5px;
    margin-top: 10px;
    cursor: pointer;
}


</style>