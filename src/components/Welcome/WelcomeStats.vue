<template>
    <div class="welcome_stats">
        <h3>Korepetytorzy Online:</h3>
        <h4 class="info"> <span class="value">{{ tutorsOnline }}</span> / {{ totalTutors }} </h4>
        <h3>Oferty:</h3>
        <h4 class="info"> <span class="value">{{ offers }}</span> </h4>
        <h3>Uczniowie Online:</h3>
        <h4 class="info"> <span class="value">{{ studentsOnline }}</span> / {{ totalStudents }} </h4>
    </div>
</template>

<script>
export default {
    name: "WelcomeStats",
    data() {
        return {
            tutorsOnline: -1,
            totalTutors: -1,
            offers: -1,
            studentsOnline: -1,
            totalStudents: -1,
        };
    },
    created() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            try {
                const response = await fetch('http://localhost/tutorinoAPIs/tutorsOnline.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.tutorsOnline = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch('http://localhost/tutorinoAPIs/tutorsOnline.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.tutorsOnline = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch('http://localhost/tutorinoAPIs/tutorsCount.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.totalTutors = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch('http://localhost/tutorinoAPIs/offersCount.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.offers = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch('http://localhost/tutorinoAPIs/studentsOnline.php');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.studentsOnline = data.count;
            } catch (error) {
                console.error("Error fetching data:", error);
            }

            try {
                const response = await fetch('http://localhost/tutorinoAPIs/studentsCount.php');
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
