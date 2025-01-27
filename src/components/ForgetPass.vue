<template>
    <div class="forgot-password">
    <img src="../assets/logo-community.png" alt="logo" class="logo">
    <h2>Recuperar Contraseña</h2>
    <p>Ingresa tu correo electrónico para recibir un enlace de recuperación.</p>
    <form @submit.prevent="handleForgotPassword">
        <input
        v-model="email"
        type="email"
        placeholder="Ingresa tu correo..."
        required
        />
        <button type="submit">Enviar enlace</button>
    </form>
    <p v-if="message" :class="{ success: isSuccess, error: !isSuccess }">
        {{ message }}
    </p>
    </div>
</template>

<script>
import { sendResetPasswordEmail } from "@/main";

export default {
    data() {
    return {
        email: "",
        message: "",
        isSuccess: false,
    };
},
    methods: {
    async handleForgotPassword() {
        const response = await sendResetPasswordEmail(this.email);
        this.message = response.message;
        this.isSuccess = response.success;
    },
},
};
</script>

<style lang="sass" scoped>
.forgot-password 
    height: 100dvh
    width: 100%
    display: flex
    align-items: center
    flex-direction: column
    font-family: 'Roboto', sans-serif
    gap: 5px
    margin-bottom: 50px

    img 
        width: 17%
        @media (max-width: 500px)
        width:200px 
    h2
        color: white
        font-weight: bold

    p 
        color: #e9e9e9
        text-align: center
        @media (max-width: 500px)
            font-size: .9rem
            width: 70%

    input 
        width: 100%
        padding: 10px
        margin: 10px 0
        @media (max-width: 500px)
            width: 100%
            display: flex
            justify-content: center
            align-items: center
            flex-direction: column


    button 
        padding: 10px 20px
        background-color: #4CAF50
        color: white
        border: none
        cursor: pointer
        border-radius: 5px
        transition: background-color 0.3s ease


    button:hover 
        background-color: #0056b3


    .success 
        color: green


    .error 
        color: red

</style>
