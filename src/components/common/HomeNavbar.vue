<template>
    <div id="navbar">
        <router-link to="/" class="logo">
            <img src="@/assets/img/favicon.png" alt="Logo" />
            <h1>Tutorino</h1>
        </router-link>
        <router-link :to="userLoggedIn ? '/panel' : '/enter'" class="user" id="user_profile">
            <div class="username">
                {{ userLoggedIn ? 'Witaj ' + username : 'Zaloguj się' }}
            </div>
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
            userPfp: require('@/assets/img/user.png'),
            username: 'sdfsdf',
        };
    },
    mounted() {
        this.checkLoginStatus();
    },
    methods: {
        async checkLoginStatus() {
            try {
                const uuid = localStorage.getItem('uuid'); // Assuming UUID is stored in localStorage
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
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                if (response.status === 401) {
                    this.userLoggedIn  = false;
                } 

                const data = await response.json();
                console.log(data);
                if (data.status == 'success') {

                    this.userLoggedIn  = true;

                    if(data.pfp !== null) {
                        this.userPfp = data.pfp;
                    }
                    if(data.nick !== null) {
                        this.username = data.nick;
                    } else {
                        this.username = data.full_name;
                    }
                }
                console.log(this.isLoggedIn);
                console.log(this.username)

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
