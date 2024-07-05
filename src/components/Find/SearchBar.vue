<template>
    <nav>
        <router-link to="/" href="" class="logo">
            <img src="@/assets/img/favicon.png" alt="Logo" />
            <h1>Tutorino</h1>
        </router-link>
        <router-link to="/login" class="user" id="user_profile">
            <div class="username">Zaloguj się</div>
            <div class="pfp">
                <img src="@/assets/img/user.png" alt="User Profile" />
            </div>
        </router-link>
    </nav>
</template>

<script>
export default {
    name: "WelcomeNavbar",
};
</script>

<style scoped>
/* @import "@/assets/css/navbar.css"; */
</style>