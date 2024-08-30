<template>
    <div id="navbar">
        <div id="topsection">
            <router-link to="/" id="icon_tutorino" class="has_tooltip">
                <img src="@/assets/img/favicon.png">
                <h1>Tutorino</h1>
                <div class="tooltip">Powrót do strony głównej</div>
            </router-link>
            <hr/>
            <nav>
                <router-link to="/panel/myaccount">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/user.svg"></div>
                    <span>Mój profil</span>
                </router-link>
                <router-link to="/panel/notifications">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/notifications.svg"></div>
                    <span>Powiadomienia</span>
                </router-link>
                <router-link to="/panel/chats">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/messages.svg"></div> 
                    <span>Wiadomości</span>
                </router-link>
                <router-link to="/panel/search">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/search.svg"></div>
                    <span>Wyszukiwarka</span>
                </router-link>
                <router-link to="/panel/myoffers">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/posts.svg"></div>
                    <span>Moje Ogłoszenia</span>
                </router-link>
            </nav>
        </div>
        <div id="bottomsection">
            <nav>
                <router-link to="/panel/mycalendar">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/calendar.svg"></div>
                    <span>Kalendarz</span>
                </router-link>
                <router-link to="/panel/transactionhistory">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/money.svg"></div>
                    <span>Należności</span>
                </router-link>
                <router-link to="/panel/settings">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/settings.svg"></div>
                    <span>Ustawienia</span>
                </router-link>
                <router-link to="/support">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/support.svg"></div>
                    <span>Wsparcie</span>
                </router-link>
            </nav>
            <hr />
            <router-link to="/" class="user_portrait" @click.prevent="logout">
                <div id="pfp">
                    <img src="@/assets/img/user.png">
                </div>
                <span class="name">Wyloguj się</span>
            </router-link>
        </div>    
    </div>
</template>

<script>
export default {
    name: "PanelNavbar",
    mounted() {
        this.checkSession();
    },
    methods: {
        async checkSession() {
            try {
                let uuid = localStorage.getItem('uuid');
                console.log(uuid)
                if ( uuid == null) {
                    this.$router.push({ path: '/' });
                }
            } catch (error) {
                console.error("Error checking session:", error);
            }
        },
        logout() {
            localStorage.removeItem('uuid');
            this.$router.push({ path: '/login' });
        }
    }
};
</script>

<style scoped>
    @import "@/assets/css/common/panelnavbar.css";
</style>