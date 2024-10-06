<template>
    <RouterLink :to="linkToTutorsProfile" class="offer">
        <div class="top">
            <img :src="imageUrl" :alt="`${offer.title}'s profile picture`">

            <div class="buttons">
                <button 
                @click.prevent="toggleFav" 
                :class="['favorite', { faved: offer.favorite }]"
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                        fill="none" 
                    >
                        <path 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M12 8c-1.574-1.635-4.46-2.135-6.035-.5-1.573 1.635-1.34 3.836 0 5.752C7.306 15.168 9.41 16.89 12 19c2.59-2.11 4.694-3.832 6.035-5.748 1.34-1.916 1.573-4.117 0-5.752C16.46 5.865 13.574 6.365 12 8z"/>
                    </svg>
                </button>
                <RouterLink :to="messageTutor" class="message" @click.prevent>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            stroke-linecap="round" 
                            stroke-linejoin="round" 
                            stroke-width="2" 
                            d="M21 7v10a1 1 0 01-1 1H4a1 1 0 01-1-1V7m18 0a1 1 0 00-1-1H4a1 1 0 00-1 1m18 0l-7.72 6.433a2 2 0 01-2.56 0L3 7"
                        />
                    </svg>
                </RouterLink>
            </div>
            
            <span class="price">{{offer.pricePerHour}} {{offer.currency}} /h</span>

                <div class="title">
                    <span class="name">
                        {{ offer.nick || offer.fullName }}
                        <span class="handle handleSpan">{{offer.handle}}</span>
                    </span>
                    <span class="title">{{offer.title}}</span>
                </div>
                <div class="bigtooltip">Click to view tutors profile</div>
        </div>
        <div class="bottom">
            <span class="rating"><span class="stars">⭐{{ offer.rating }}</span> 
            <span class="amount">({{ offer.ratingCount }} ocen)</span></span>

            <div class="badges">
                <div class="chip" 
                v-for="badge in offer.badges" 
                :key="badge" 
                :style="{ backgroundColor: badge.backgroundColor  }"
            >
                {{ badge }}
                </div>
            </div>
        </div>
        <div class="details">
            <span class="title">
                {{ offer.title }}
            </span>
            <span class="description">
                {{ offer.description }}
            </span>
        </div>
        <div class="type">
            <div v-for="type in offer.type" v-bind:key="type" class="chip">{{type}}</div>
        </div>
    </RouterLink>
</template>

<script>
import { pfpPath } from '@/assets/js/consts';

export default {
    name: "OfferPanel",
    props: {
        offer: {
            type: Object,
            required: true,
            default: () => ({
                offerId: 0,
                handle: '@handle',
                nick: 'nick',
                fullName: 'Name Surname',
                title: 'Mathematics',
                description: 'Learn with me!',
                pricePerHour: 50,
                currency: 'pln',
                type: ["Online", "Students place", "Tutors place", "Other place"],
                badges: ["🔥 popular tutor", "✅ verified"],
                pfp: `user.png`,
                favorite: false,
                rating: 4.5,
                ratingCount: 204,
            }),
        }
    },
    computed: {
        imageUrl() {
            return `${pfpPath}${this.offer.pfp}`;
        },
        linkToTutorsProfile() {
            return `/tutor/${this.offer.handle}`;
        },
        messageTutor() {
            return `/panel/chat/null/${this.offer.handle}`;
        }
    },
    methods: {
        toggleFav() {
            console.log('Toggling favorite:', this.offer.favorite);
            this.$emit('toggle-fav', this.offer);
        }
    },
    mounted() {
    }
};
</script>


<style scoped>
.offer {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;

    border-radius: 1rem 1rem 0 0;

    margin: 0;
    
    position: relative;

    width: clamp(18rem, 20vw, 30rem);
}
.offer > .top {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;

    border-radius: 1rem;
    overflow: hidden;

    width: 100%;
}
.offer .top img {
    width: 100%;
    aspect-ratio: 1/1;
    border-radius: 1rem;
    object-fit: cover;
    max-width: 50vh;
    border-radius: 1rem;
}
.offer .top .buttons {
    top: 0.75rem;
    left: 0.75rem;
    position: absolute;

    display: flex;
    gap: 0.5rem;
    flex-direction: column;
}
.offer .top .buttons > *:hover {
    transform: scale(1.1);
}
.offer .top .buttons > *:active {
    transform: scale(0.9);
}
.offer .top .favorite,
.offer .top .message {
    background-color: transparent;
    border: none;
    cursor: pointer;

    box-shadow: none;
    padding: 0;
    border-radius: 0;
}
.offer .top .favorite svg,
.offer .top .message svg {
    width: 2rem;
    height: 2rem;

    stroke: #ffffff;

    filter: drop-shadow(0.125rem 0.125rem 0.25rem #00000088);
}
.offer .top .favorite.faved svg {
    stroke: #ffffff;
    fill: #ffffff;
}

.offer .price {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    color: #222;
    font-size: 1rem;
    font-weight: bold;
    background-color: #ffffff;
    padding: 0.25rem 0.5rem;
    border-radius: 0.5rem;
    filter: drop-shadow(0.125rem 0.125rem 0.25rem #00000088);

    z-index: 2;
}
.offer .top .bigtooltip {
    position: absolute;
    color: #ffffff;
    font-size: 1.5rem;
    font-weight: bold;
    filter: drop-shadow(0.125rem 0.125rem 0.25rem #00000088);
    opacity: 0;
}
.offer .top > .title {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: #ffffff;

    font-size: 1.5rem;
    font-weight: bold;
    
    /* background-color: #000000; */
    background-image: linear-gradient(0deg, #000000cc, #000000aa, transparent);

    padding: 0.75rem;

    display: flex;
    flex-direction: column;
    gap: 0.125rem;
}
.offer .top > .title .handle {
    font-size: 1rem;
    font-weight: normal;
    color: #ddd;
    text-shadow: 0.0625rem 0.0625rem 0.125rem #000000aa;
}
.offer .top > .title .name {
    font-size: 1.25rem;
    font-weight: bold;
    color: #fafafa;
    text-shadow: 0.0625rem 0.0625rem 0.125rem #000000aa;
}
.offer .top > .title .title {
    font-size: 1.5rem;
    font-weight: bold;
    color: #fafafa;

    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-shadow: 0.0625rem 0.0625rem 0.125rem #000000aa;
}



.offer .bottom {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.25rem;
}
.offer .bottom .rating {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    white-space: nowrap;
    gap: 0.25rem;
    flex-wrap: wrap;
}
.offer .bottom .rating .amount {
    font-size: 0.75rem;
    color: #222a;
}
.offer .badges {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
}
.offer .badges > * {
    white-space: nowrap;
    padding: 0.25rem 0.75rem 0.25rem 0.5rem;
    border-radius: 200rem;
    color: #222;
    font-size: 0.75rem;
    font-weight: bold;
}

.offer .type {
    z-index: 1;
    position: absolute;
    top: -0.5rem;
    left: 1rem;
    right: 1rem;;

    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    gap: 0.25rem;
}
.offer .type > * {
    background-color: #00aaff;
    color: #ffffff;
    padding: 0.25rem 0.5rem 0.25rem 0.5rem;
    border-radius: 200rem;
    font-size: 0.625rem;
    font-weight: bold;

    white-space: nowrap;
    text-overflow: ellipsis;
}
.offer .details {
    position: absolute;
    top: calc( 100% - 1px );
    left: 0;
    right: 0;

    z-index: 10;

    background-color: #ffffff00;
    color: #2220;

    display: flex;
    flex-direction: column;
    gap: 0rem;
    align-items: stretch;
    justify-content: space-between;

    font-size: 0;

    padding: 0rem 0.5rem;
    border-radius: 0 0 0.75rem 0.75rem;
}
.offer .details .title {
    font-weight: bold;
}
.offer .details .description {
    position: relative;

    width: 100%;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
}
.offer .details .description::after {
    z-index: 100;
    bottom: -1rem;
    font-size: 1rem;

    color: #222;

    content: "...";
    position: absolute;
}


.offer {
    transition: 1s, background-color 0.5s 0.5s;;
}
.offer:hover {

    background-color: #ffffff;

    z-index: 1000;
    transform: scale(1.02);

    filter: drop-shadow(0.25rem 0.25rem 0.5rem #00000088);

    
    transition: 0.2s;
}

.offer .details .description::after {
    transition: 1s;
}
.offer:hover .details .description::after {
    top: calc( 100% + 8rem );
    opacity: 0;
    color: #00000000;

    transition: 0.5s;
}

.offer .details {

    transition: font-size 0.5s 0.35s, padding 0.5s 0.35s, color 0.4s 0s, background-color 0.5s 0.5s;
}
.offer:hover .details {
    padding: 0.5rem 0.75rem;
    font-size: 1rem;
    
    background-color: #ffffff;
    color: #222;

    transition: font-size 0.3s 0s, padding 0.3s 0s, color 0.2s 0.25s, background-color 0.2s 0s;
}

.offer .top .bigtooltip {
    transition: 1s 0.5s;
}
.offer:hover .top .bigtooltip {
    opacity: 1;

    transition: 0.5s;
}

.offer .top img {
    transition: 1s;
}
.offer:hover .top img {
    filter: blur(0.25rem) brightness(0.75);

    transition: 0.5s;
}

.handleSpan {
    display: inline-flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    position: relative;
    margin-left: 1em;
    min-height: 1em;
    line-height: 1em;
}
.handleSpan::before {
    content: '@';
    position: absolute;
    right: 100%;
    top: 0;
    bottom: 0;
    width: 1em;
    text-align: right;
}

</style>