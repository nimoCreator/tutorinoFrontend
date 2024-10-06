<template>
    <div class="panel">
        <h1>Panel Instructions</h1>
        <div class="content">
            <p v-if="isLoggedIn">Witaj, {{ username }}!</p>
            <p v-else>Witaj, gościu!</p>
        </div>
    </div>
</template>

<script>
import { getLS } from '@/assets/js/functions.js';
export default {
    name: 'PanelInstructions',
    data() {
        return {
            isLoggedIn: false,
            username: ''
        };
    },
    mounted() {
        this.checkLoginStatus();
    },
    methods: {
        async checkLoginStatus() {
            try {
                let ls = getLS()
                let uuid = ls && ls.loggedInUser && ls.loggedInUser.uuid;
                if (!uuid) {
                    this.$router.push({ path: '/login' });
                    throw new Error('UUID not found in localStorage');
                }
                const response = await fetch('http://localhost/tutorinoAPIs/checkSession.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uuid: uuid }),
                    credentials: 'include'
                });

                if (response.ok) {
                    const data = await response.json();
                    if (data.status === 'success') {
                        this.isLoggedIn = true;
                        this.username = data.nick; // Example: Accessing nick from PHP response
                        if(this.username == "" || this.username == undefined || this.username == null) this.username = data.fullName;
                    }
                } else if (response.status === 401) {
                    this.isLoggedIn = false;
                } else {
                    console.error("HTTP error:", response.status);
                }
            } catch (error) {
                console.error("Error checking login status:", error);
            }
        }

    }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
