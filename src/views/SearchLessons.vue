<template>
    <div class="panel">
        <h1>Search Lessons</h1>
        <div
        style="
        display: flex;
        gap: 1rem;
        flex-direction: row;
        ">

            <input 
                type="text" 
                v-model="searchQuery" 
                placeholder="Search lessons..."
                v-on:input="search"
                    
            >
            <button @click="searchLessons">Search</button>
        </div>
        <div v-if="matched.length === 0 && searchQuery != ''">
            No lessons found.
        </div>
        <div class="offers" v-else-if="matched.length != 0">
            <Offer 
            v-for="offer in matched" 
            :offer="offer"
            @toggle-fav="toggleFavorite"
            :key="offer.offerId"  
            />
        </div>
    </div>
</template>

<script>

import Offer from '@/components/Find/Offer.vue';
import { SQL } from '@/assets/js/functions.js';
// import { apiPath } from '@/assets/js/consts.js';

export default {
    name: 'SearchLessons',
    data() {
        return {
            searchQuery: '',
            offers: [],
            matched: [],
        };
    },
    components: {
        Offer,
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async search() {
            // eslint-disable-next-line no-unused-vars
            this.matched = this.offers.filter(offer => {
                return offer.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                offer.description.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                offer.fullName.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                offer.handle.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                offer.nick.toLowerCase().includes(this.searchQuery.toLowerCase());
            });
        },
        async fetchData() {
            try {
                const response = await SQL('SELECT * FROM offers INNER JOIN users ON offers.creatorId = users.uuid');
                this.offers = response.data;
                this.searchPerformed = true;
            } catch (error) {
                console.error('Error searching lessons:', error);
            }
        },
        toggleFavorite(updatedOffer) {
            updatedOffer.favorite = !updatedOffer.favorite;            
            console.log('OUT Toggling favorite:', updatedOffer);
        },
    }
};
</script>

<style scoped>
.panel {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    width: 100%;
}
.offers {
    padding: 1rem;
    border-radius: 2rem;

    display: grid;
    grid-template-columns: repeat(auto-fill, 
        minmax(
            clamp(18rem, 20vw, 30rem),
            1fr
            ));

    width: 100%;
    padding: 1rem 1rem 8rem 1rem;
    gap: 2rem;
}
</style>
