<template>
    <div class="nimoFormContainer">
        <form id="enter" class="nimoForm active" @submit.prevent="handleSubmit">
            <h1>Witaj!</h1>
            <div class="panel">
                <div>
                    <img :src="loginEmailIcon" alt="user icon">
                </div>
                <input id="enter_login" placeholder="email / login" type="text" v-model="loginOrEmail" @input="updateLoginEmailIcon" >
            </div>
            <input id="enter_button" class="submit" type="submit" value="Dalej"/>
        </form>
        <Alternatives/>
    </div>
</template>

<script>
import Alternatives from "@/components/Login/Alternatives.vue";
import { toast_notification } from "@/assets/js/nimoToastNotifications";
import { getLS } from "@/assets/js/functions";

export default {
    name: "EnterLoginPanel",
    components: {
        Alternatives,
    },
    data() {
        return {
            loginOrEmail: '',
            loginEmailIcon: require('@/assets/img/Login/user.svg')
        };
    },
    mounted() {
        this.checkSession();
    },
    methods: {
        async checkSession() {
            try {
                let LS = getLS();
                let uuid = LS.loggedInUser.uuid;
                if (uuid) {
                    this.$router.push({ name: '/panel' });
                }
            } catch (error) {
                console.error("not logged in", error);
            }
        },
        updateLoginEmailIcon() {
            this.loginEmailIcon = this.loginOrEmail.includes('@') ? require('@/assets/img/Login/email.svg') : require('@/assets/img/Login/user.svg');
        },
        async handleSubmit(event) {
            event.preventDefault();

            if (!this.loginOrEmail) {
                toast_notification({
                    type: "error", 
                    time: "5", 
                    label: "Empty fieldemail/login", 
                    content: "Enter your email or login"
                });
                return;
            }

            let apipath = this.loginOrEmail.includes('@') 
                ? 'http://localhost/tutorinoAPIs/isEmailTaken.php' 
                : 'http://localhost/tutorinoAPIs/isLoginTaken.php';

            try {
                const response = await fetch(apipath, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ loginOrEmail: this.loginOrEmail })
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();

                
                console.log(data)

                if (data.taken) {
                    this.$router.push({ name: 'Login', params: { loginOrEmail: this.loginOrEmail } });
                } else {
                    this.$router.push({ name: 'Register', params: { loginOrEmail: this.loginOrEmail } });
                }

            } catch (error) {
                console.error("Error fetching data:", error);
                toast_notification({
                    type: "error", 
                    time: "5", 
                    label: "Błąd", 
                    content: "Wystąpił błąd podczas sprawdzania loginu/emaila.<br>"+error
                });
            }
        }
    }
};
</script>

<style scoped>
    @import "@/assets/css/Login/nimoForm.css";
    @import "@/assets/css/Login/enter.css";
</style>
