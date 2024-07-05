<template>
    <div id="alternatives">
        <div class="options">
            <div id="login_with_google" v-on:click="showGoogleLoginError" >
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/800px-Google_%22G%22_logo.svg.png">
            </div>
            <div id="login_with_facebook" v-on:click="showFacebookLoginError">
                <img src="https://upload.wikimedia.org/wikipedia/en/0/04/Facebook_f_logo_%282021%29.svg">
            </div>
            <div id="login_with_discord" v-on:click="showDiscordLoginError">
                <img src="https://www.svgrepo.com/show/353655/discord-icon.svg">
            </div>
        </div>
    </div>
</template>

<script>

import { toast_notification } from "@/assets/js/nimoToastNotifications.js";

export default {
    name: "AlternativeLoginOptionsPanel",
    
    mounted() {
        
    },
    methods: {
        showGoogleLoginError() {
            toast_notification({
                type: "error", 
                time: "10", 
                label: "Logowanie za pomocą konta Google tymczasoswo niedostępne", 
                content: "Przepraszamy, możliwość logowania za pomocą konta Google jest tymczasowo niedostępna. Prosimy spróbować ponownie później."
            });
        },
        showFacebookLoginError() {
            toast_notification({
                type: "error", 
                time: "10", 
                label: "Logowanie za pomocą konta Facebook tymczasoswo niedostępne", 
                content: "Przepraszamy, możliwość logowania za pomocą konta Facebook jest tymczasowo niedostępna. Prosimy spróbować ponownie później."
            });
        },
        showDiscordLoginError() {
            toast_notification({
                type: "error", 
                time: "10", 
                label: "Logowanie za pomocą konta Discord tymczasoswo niedostępne", 
                content: "Przepraszamy, możliwość logowania za pomocą konta Discord jest tymczasowo niedostępna. Prosimy spróbować ponownie później."
            });
        }
    }
};
</script>

<style scoped>
    @import "@/assets/css/Login/alternatives.css";
</style>