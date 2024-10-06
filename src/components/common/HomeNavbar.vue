<template>
    <div id="navbar">
        <router-link to="/" class="logo">
            <img src="@/assets/img/favicon.png" alt="Logo" />
            <h1>Tutorino</h1>
        </router-link>
        <router-link :to="userLoggedIn ? '/panel' : '/enter'" class="user" id="user_profile">
            <div class="username">
                {{ userLoggedIn ? 'Welcome ' + username : 'Login' }}
            </div>
            <div class="pfp">
                <img :src="userPfp" alt="User Profile" />
            </div>
        </router-link>
    </div>
</template>

<script>
import { getLS } from "@/assets/js/functions.js";
import { pfpPath } from "@/assets/js/consts.js";

export default {
    name: "HomeNavbar",
    data() {
        return {
            userLoggedIn: false,
            userPfp: pfpPath + 'user.png',
            username: 'sdfsdf',
        };
    },
    mounted() {
        this.checkLoginStatus();
    },
    methods: {
        async checkLoginStatus() {
            try {
                let ls = getLS();
                let uuid = ls && ls.loggedInUser && ls.loggedInUser.uuid;
                if (!uuid) {
                    throw new Error('UUID not found in localStorage');
                }
                const response = await fetch('http://localhost/tutorinoAPIs/checkSession.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uuid }),
                    credentials: 'include'
                });

                if (!response.ok) {
                    console.error(`HTTP error! status: ${response}`);
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                if (response.status === 401) {
                    this.userLoggedIn  = false;
                } 
                const data = await response.json();
                if (data.status == 'success') {

                    this.userLoggedIn  = true;

                    if(data.pfp !== null) {
                        this.userPfp = pfpPath + data.pfp;
                    }
                    else
                    {
                        this.userPfp = pfpPath + 'user.png';
                    }
                    this.username = data.nick || data.fullName || data.handle;
                }

            } catch (error) {
                console.error("Error checking login status:", error);
            }
        }

    }
};
</script>

<style scoped>
@import "@/assets/css/common/homenavbar.css";
</style>
