<template>
    <div id="navbar">
        <router-link to="/" class="logo">
            <img src="@/assets/img/favicon.png" alt="Logo" />
            <h1>Tutorino</h1>
        </router-link>
        <router-link :to="userLoggedIn ? '/panel' : '/enter'" class="user" id="user_profile">
            <div class="username">{{ userLoggedIn ? 'Idź do Panelu' : 'Zaloguj się' }}</div>
            <div class="pfp">
                <img :src="userPfp" alt="User Profile" />
            </div>
        </router-link>
    </div>
</template>

<script>
export default {
    name: "HomeNavbar",
    data() {
        return {
            userLoggedIn: false,
            userPfp: require('@/assets/img/user.png')
        };
    },
    mounted() {
        this.checkLoginStatus();
    },
    methods: {
        async checkLoginStatus() {
            try {
                const uuid = localStorage.getItem('uuid'); // Assuming UUID is stored in localStorage
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
                        // Update other user-related data as needed
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
@import "@/assets/css/common/homenavbar.css";
</style>
