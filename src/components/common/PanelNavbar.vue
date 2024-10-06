<template>
    <div id="navbar">
        <div id="topsection">
            <router-link to="/" id="icon_tutorino" class="hasTooltip">
                <img src="@/assets/img/favicon.png">
                <h1>Tutorino</h1>
                <div class="tooltip">Go back to main website</div>
            </router-link>
            <hr/>
            <nav>
                <router-link to="/panel/myaccount">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/user.svg"></div>
                    <span>My proflie</span>
                </router-link>
                <router-link to="/panel/notifications">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/notifications.svg"></div>
                    <span>Notifications</span>
                </router-link>
                <router-link to="/panel/chat">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/messages.svg"></div> 
                    <span>Messages</span>
                </router-link>
                <router-link to="/panel/find">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/search.svg"></div>
                    <span>Search</span>
                </router-link>
                <router-link to="/panel/myoffers">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/posts.svg"></div>
                    <span>myOffers</span>
                </router-link>
            </nav>
        </div>
        <div id="bottomsection">
            <nav>
                <router-link to="/panel/mycalendar">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/calendar.svg"></div>
                    <span>Calendar</span>
                </router-link>
                <router-link to="/panel/transactionhistory">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/money.svg"></div>
                    <span>Finances</span>
                </router-link>
                <router-link to="/panel/settings">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/settings.svg"></div>
                    <span>Settings</span>
                </router-link>
                <router-link to="/support">
                    <div class="icon"><img src="@/assets/img/PanelNavbar/support.svg"></div>
                    <span>Support</span>
                </router-link>
            </nav>
            <hr />
            <router-link to="/" class="user_portrait" @click.prevent="logout">
                <div id="pfp">
                    <img :src="userPfp">
                </div>
                <span class="name">Logout</span>
            </router-link>
        </div>    
    </div>
</template>

<script>
import { pfpPath } from "@/assets/js/consts.js";
import { getLS, setLS } from "@/assets/js/functions.js";
import { toast_notification } from "@/assets/js/nimoToastNotifications";


export default {
    name: "PanelNavbar",
    mounted() {
        this.checkSession();
    },
    data() {
        return {
            userPfp: pfpPath + 'user.png',
            username: 'sdfsdf',
        };
    },
    created() {
    },
    methods: {
        async checkSession() {
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


                    if(data.pfp !== null) {
                        this.userPfp = pfpPath + data.pfp;
                    }
                    else
                    {
                        this.userPfp = pfpPath + 'user.png';
                    }
                }
                else
                {
                    toast_notification({
                        type: "warning", 
                        time: "20", 
                        label: "Logged out", 
                        content: "You ahve been logged out."
                    });
                }

            } catch (error) {
                console.error("Error checking login status:", error);
            }
        },
        logout() {
            let ls = getLS();
            ls.loggedInUser = null;
            setLS(ls);
            this.$router.push({ path: '/' });
        }
    }
};
</script>

<style scoped>
    @import "@/assets/css/common/panelnavbar.css";
</style>