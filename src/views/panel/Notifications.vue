<template>
    <div class="panel">
        <h1>Notifications</h1>
        <div class="content">
            <div v-if="notifications.length > 0" class="notifications">
                <router-link v-for="notification in notifications" :to= notification.link :key="notification.id">
                    <h2>{{ notification.label }}</h2>
                    <h5>{{ notification.text }}</h5>
                </router-link>
            </div>
            <p v-else>No notifications found.</p>
        </div>
    </div>
</template>

<script>
import { getLS, SQL } from '@/assets/js/functions';

export default {
    name: 'NotificationsView',
    data() {
        return {
            notifications: []
        };
    },
    mounted() {
        this.fetchNotifications();
    },
    methods: {
        async fetchNotifications() {
            let uuid;
            try {
                let LS = getLS();
                uuid = LS.loggedInUser.uuid;
            } catch (error) {
                console.error("Error fetching notifications:", error);
                this.$router.push('/');
            }
            try 
            {
                const response = await SQL(`SELECT * FROM notifications WHERE uuid = ${uuid} ORDER BY timestamp DESC`);
                console.log(response);
                this.notifications = response.data;
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
    }
};
</script>

<style scoped>
    .panel {
        width: 100%;
    }
    .notifications {
        list-style-type: none;
        padding: 1rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .notifications > * {
        background-color: #ffffff;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        padding: 1rem;
    }
</style>
