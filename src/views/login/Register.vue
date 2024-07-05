<template>
    <form id="register" class="nimoForm active" @submit.prevent="handleSubmit">
        <h1>Rejestracja</h1>
        <div class="panel">
            <div>
                <img src="@/assets/img/Login/email.svg" alt="email icon">
            </div>
            <input id="register_email" placeholder="email" type="email" v-model="email" :disabled="isEmailGiven">
        </div>
        <div class="panel">
            <div>
                <img src="@/assets/img/Login/user.svg" alt="user icon">
            </div>
            <input id="register_login" placeholder="login" type="text" v-model="login" :disabled="isLoginGiven">
        </div>
        <div class="panel">
            <div>
                <img src="@/assets/img/Login/user.svg" alt="user icon">
            </div>
            <input id="register_fullname" placeholder="imie i nazwisko" type="text" v-model="name">
        </div>
        <div class="panel password">
            <div>
                <img src="@/assets/img/Login/padlock.svg" alt="password icon">
            </div>
            <input class="nimoweb_password" id="register_password" placeholder="hasło" :type="showPassword ? 'text' : 'password'" v-model="password">
            <button id="register_password1_toggle" class="nimoweb_password_eye" type="button" @click="togglePasswordVisibility('password')">
                <img :src="showPassword ? require('@/assets/img/Login/eye_open.svg') : require('@/assets/img/Login/eye_closed.svg')" alt="toggle password visibility">
            </button>
        </div>
        <div class="panel password">
            <div>
                <img src="@/assets/img/Login/padlock.svg" alt="password icon">
            </div>
            <input class="nimoweb_password" id="register_password_repeat" placeholder="powtórz hasło" :type="showPasswordRepeat ? 'text' : 'password'" v-model="passwordRepeat">
            <button id="register_password2_toggle" class="nimoweb_password_eye" type="button" @click="togglePasswordVisibility('passwordRepeat')">
                <img :src="showPasswordRepeat ? require('@/assets/img/Login/eye_open.svg') : require('@/assets/img/Login/eye_closed.svg')" alt="toggle password visibility">
            </button>
        </div>
        <input id="register_button" class="submit" type="submit" value="Zarejestruj się"/>
    </form>
</template>

<script>
import { toast_notification } from "@/assets/js/nimoToastNotifications";

export default {
    name: "RegisterPanel",
    data() {
        return {
            email: '',
            login: '',
            name: '',
            password: '',
            passwordRepeat: '',
            isEmailTaken: false,
            isLoginTaken: false,
            isEmailGiven: false,
            isLoginGiven: false,
            showPassword: false,
            showPasswordRepeat: false
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
        async handleSubmit(event) {
            event.preventDefault();

            if (!this.validateForm()) {
                return;
            }

            try {
                await this.checkEmailAndLogin();
                
                if (!this.isEmailTaken && !this.isLoginTaken) {
                    await this.registerUser();
                }

            } catch (error) {
                console.error("Error during registration:", error);
                toast_notification({
                    type: "error", 
                    time: "5", 
                    label: "Błąd", 
                    content: "Wystąpił błąd podczas rejestracji.<br>" + error
                });
            }
        },
        async setLoginOrEmailFromRoute() {
            let loginOrEmail = this.$route.params.loginOrEmail || '';

            if (loginOrEmail.includes('@')) {
                this.email = loginOrEmail;
                this.login = '';
                this.isEmailGiven = true;
            } else {
                this.login = loginOrEmail;
                this.email = '';
                this.isLoginGiven = true;
            }
        },
        async checkEmailAndLogin() {
            let loginOrEmail = this.login.includes('@') ? this.login : this.email;
            let apipath = loginOrEmail.includes('@') 
                ? 'http://localhost/tutorinoAPIs/isEmailTaken.php' 
                : 'http://localhost/tutorinoAPIs/isLoginTaken.php';

            const response = await fetch(apipath, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ loginOrEmail })
            });

            if (!response.ok) {
                    throw new Error(`<b>status:</b> <br/> ${response.status} <br/> <b>message:</b> <br/> ${response.message}`);
            }

            const data = await response.json();

            this.isEmailTaken = data.emailTaken;
            this.isLoginTaken = data.loginTaken;

            if (this.isEmailTaken) {
                this.email = '';
                this.isEmailGiven = false;
                this.isLoginGiven = true;
            }
            
            if (this.isLoginTaken) {
                this.login = '';
                this.isEmailGiven = true;
                this.isLoginGiven = false;
            }
        },
        async registerUser() {
            try {
                const response = await fetch('http://localhost/tutorinoAPIs/registerUser.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: this.email,
                        login: this.login,
                        name: this.name,
                        password: this.password
                    })
                });

                if (!response.ok) {
                    throw new Error(`<b>status:</b> <br/> ${response.status} <br/> <b>message:</b> <br/> ${response.message}`);
                }   

                const data = await response.json();

                if (data.status === 'success') {
                    // Save session data to local storage or Vuex store if needed
                    localStorage.setItem('uuid', JSON.stringify(data.user));

                    toast_notification({
                        type: "success", 
                        time: "5", 
                        label: "Sukces", 
                        content: "Rejestracja zakończona sukcesem. Zostaniesz przekierowany na panel."
                    });
                    this.$router.push({ path: '/panel' });
                } else {
                    toast_notification({
                        type: "error", 
                        label: "Błąd", 
                        content: data.message
                    });
                }

            } catch (error) {
                console.error("Error during registration:", error);
                toast_notification({
                    type: "error", 
                    time: "5", 
                    label: "Błąd", 
                    content: "Wystąpił błąd podczas rejestracji.<br>" + error
                });
            }
        },
        togglePasswordVisibility(field) {
            if (field === 'password') {
                this.showPassword = !this.showPassword;
            } else if (field === 'passwordRepeat') {
                this.showPasswordRepeat = !this.showPasswordRepeat;
            }
        },
        validateForm() {
            if (!this.email || !this.login || !this.name || !this.password || !this.passwordRepeat) {
                toast_notification({
                    type: "error", 
                    time: "5", 
                    label: "Wszystkie pola są wymagane.", 
                    content: "Proszę uzupełnić wszystkie pola aby móc się zarejestrować."
                });
                return false;
            }

            if (this.password !== this.passwordRepeat) {
                toast_notification({
                    type: "error", 
                    time: "5", 
                    label: "Hasła nie są takie same.", 
                    content: "Proszę upewnić się, że hasła są takie same."
                });
                return false;
            }

            if (this.password.length < 5 || !this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|\W).*$/))  {
                toast_notification({
                    type: "alert", 
                    time: "5", 
                    label: "Hasło jest bardzo słabe!", 
                    content: "Hasło jest zbyt słabe abyśmy mogli zapewnić ci bezpieczeństwo. Proszę użyć silniejszego hasła.\nWymagamy hasła złożonego z:<ul><li>jednej wielkiej litery</li><li>jednej małej litery</li><li>cyfry bądź znaku specjalnego</li><li>przynajmniej 5 znaków</li></ul>"
                });
                return false;
            }

            if (!this.email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/)) { 
                toast_notification({
                    type: "alert", 
                    time: "5", 
                    label: "Twój email jest niepoprawny!", 
                    content: "Upewnij się, że wpisujesz poprawny adres email, jeżeli jest to błąd skontaktuj się z administracją."
                });
                return false;
            }

            return true;
        }
    }
};
</script>

<style scoped>
    @import "@/assets/css/Login/register.css";
</style>
