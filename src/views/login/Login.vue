<template>
    <form id="login" class="nimoForm hidden" @submit.prevent="handleSubmit">
        <h1>Logowanie</h1>
        <div class="panel">
            <div>
                <img :src="loginEmailIcon">
            </div>
            <input 
            id="login_login" 
            placeholder="email / login" 
            type="text" 
            v-model="login"
            @input="updateLoginEmailIcon"/>
        </div>
        <div class="panel password">
            <div>
                <img src="@/assets/img/Login/padlock.svg">
            </div>
            <input class="nimoweb_password" id="login_password" placeholder="password" :type="showPassword ? 'text' : 'password'" v-model="password">
            <button id="login_password_toggle" class="nimoweb_password_eye" type="button" @click="togglePasswordVisibility">
                <img :src="showPassword ? require('@/assets/img/Login/eye_open.svg') : require('@/assets/img/Login/eye_closed.svg')">
            </button>
        </div>
        <input id="login_button" class="submit" type="submit" value="Zaloguj się"/>
    </form>
</template>

<script>
import { toast_notification } from "@/assets/js/nimoToastNotifications";

export default {
    name: "LoginPanel",
    data() {
        return {
            login: '',
            password: '',
            showPassword: false,
            usingLoginNotEmail: true,
            loginEmailIcon: require('@/assets/img/Login/user.svg')
        };
    },
    mounted() {
        this.setLoginOrEmailFromRoute();
        this.checkSession();
    },
    methods: {
        async checkSession() {
            try {
                let uuid = localStorage.getItem('uuid');
                console.log(uuid)
                if ( uuid != null) {
                    this.$router.push({ path: '/panel' });
                }
            } catch (error) {
                console.error("Error checking session:", error);
            }
        },
        updateLoginEmailIcon() {
            this.loginEmailIcon = this.login.includes('@') ? 
                require('@/assets/img/Login/email.svg') 
            :   require('@/assets/img/Login/user.svg');
        },
        async setLoginOrEmailFromRoute() {
            let loginOrEmail = this.$route.params.loginOrEmail || '';

            if (loginOrEmail.includes('@')) {
                this.login = loginOrEmail;
            } else {
                this.login = loginOrEmail;
            }
        },
        async handleSubmit(event) {
            event.preventDefault();

            if (!this.login || !this.password) {
                toast_notification({
                    type: "error", 
                    time: "5", 
                    label: "Błąd", 
                    content: "Proszę uzupełnić wszystkie pola."
                });
                return;
            }

            try {
                const response = await fetch('http://localhost/tutorinoAPIs/login.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        login: this.login,
                        password: this.password
                    })
                });

                console.log(response);
                const data = await response.json();

                console.log(data);
                if (!response.ok) {
                    throw new Error(`${data.message}`);
                }


                if (data.status === 'success') {

                    localStorage.setItem('uuid', JSON.stringify(data.uuid));

                    // toast_notification({
                    //     type: "success", 
                    //     time: "5", 
                    //     label: "Sukces", 
                    //     content: "Logowanie zakończone sukcesem. Zostaniesz przekierowany na panel."
                    // });
                    
                    this.$router.push({ path: '/panel' });
                } else {
                    console.log(data);
                    toast_notification({
                        type: "error", 
                        label: "Błąd", 
                        content: data.message
                    });
                }

            } catch (error) {
                console.error("Error during login:", error);
                toast_notification({
                    type: "error", 
                    time: "5", 
                    label: error, 
                    content: "Wystąpił błąd podczas logowania.<br>" + error
                });
            }
        },
        togglePasswordVisibility() {
            this.showPassword = !this.showPassword;
        }
    }
};
</script>

<style scoped>
    @import "@/assets/css/Login/login.css";
</style>
