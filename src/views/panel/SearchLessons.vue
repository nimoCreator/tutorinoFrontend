<template>
    <div class="panel">
        <h1>Search Lessons</h1>
        <div class="content">
            <input type="text" v-model="searchQuery" placeholder="Search lessons...">
            <button @click="searchLessons">Search</button>
            <div v-if="lessons.length === 0 && searchPerformed">
                No lessons found.
            </div>
            <div v-for="lesson in lessons" :key="lesson.offer_id" class="lesson-card">
                <img :src="lesson.image" alt="Lesson Image" style="max-width: 100px; max-height: 100px;">
                <h3>{{ lesson.label }}</h3>
                <p>{{ lesson.description }}</p>
                <p>Price per hour: {{ lesson.price_per_hour }}</p>
                <p>Creator: {{ lesson.creator_id }}</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'SearchLessons',
    data() {
        return {
            searchQuery: '',
            lessons: [],
            searchPerformed: false
        };
    },
    methods: {
        async searchLessons() {
            try {
                const response = await fetch(`http://localhost:3000/api/searchLessons?query=${this.searchQuery}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                this.lessons = data;
                this.searchPerformed = true;
            } catch (error) {
                console.error('Error searching lessons:', error);
            }
        }
    }
};
</script>

<style scoped>
.lesson-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
</style>
