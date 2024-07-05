<template>
    <div class="panel">
        <h1>Notifications</h1>
        <div class="content">
            <ul v-if="notifications.length > 0">
                <li v-for="notification in notifications" :key="notification.id">
                    <router-link :to= notification.link >
                        <h2>{{ notification.label }}</h2>
                        <h5>{{ notification.text }}</h5>
                        <hr>
                    </router-link>
                </li>
            </ul>
            <p v-else>No notifications found.</p>
        </div>
    </div>
</template>

<script>
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
            try {
                const response = await fetch('http://localhost/tutorinoAPIs/getAllNotifications.php', {
                    method: 'GET',
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data); // Check console to see the response data structure

                if (data.status === 'success') {
                    this.notifications = data.notifications; // Assuming notifications are returned in an array
                } else {
                    console.error("Error fetching notifications:", data.message);
                }
            } catch (error) {
                console.error("Error fetching notifications:", error);
            }
        }
    }
};
</script>

<style scoped>
/* Add your scoped styles here */
</style>
