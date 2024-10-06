<template>
    <div class="welcome_stats">
        <h3>Tutors Online:</h3>
        <h4 class="info"> <span class="value">{{ tutorsOnline }}</span> / {{ totalTutors }} </h4>
        <h3>Offers:</h3>
        <h4 class="info"> <span class="value">{{ offers }}</span> </h4>
        <h3>Students Online:</h3>
        <h4 class="info"> <span class="value">{{ studentsOnline }}</span> / {{ totalStudents }} </h4>
    </div>
</template>

<script>

import { apiPath } from '@/assets/js/consts.js';

export default {
    name: "WelcomeStats",
    data() {
        return {
            tutorsOnline: '?',
            totalTutors: '?',
            offers: '?',
            studentsOnline: '?',
            totalStudents: '?',
        };
    },
    beforeMount() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch(`${apiPath}getTutorsOnline.php`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.tutorsOnline = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch(`${apiPath}getTutorsOnline.php`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.tutorsOnline = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch(`${apiPath}getTutorsCount.php`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.totalTutors = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch(`${apiPath}getOffersCount.php`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.offers = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch(`${apiPath}getStudentsOnline.php`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.studentsOnline = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch(`${apiPath}getStudentsCount.php`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.totalStudents = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }
    }
};
</script>

<style scoped>
    @import "@/assets/css/Welcome/welcomestats.css";
</style>
