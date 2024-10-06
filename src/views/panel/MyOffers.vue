<template>
    <div class="panel addOfferPanel">
        <h1>Add a new Offer</h1>
        <div class="row">
            <div class="offerform">
                <label>Offer Title</label>
                <input type="text" v-model="newOffer.title" />

                <label>Offer Description</label>
                <input type="text" v-model="newOffer.description" />

                <label>Price per hour</label>
                <input type="number" v-model="newOffer.pricePerHour" />

                <label>Currency</label>
                <select v-model="newOffer.currency">
                    <option value="pln">PLN</option>
                    <option value="usd">USD</option>
                    <option value="eur">EUR</option>
                </select>

                <label>Type</label>
                <div class="checklist">
                    <label class="switch" for="checkboxAtOnline">
                        <input type="checkbox" id="checkboxAtOnline" v-model="type.online" @change="updateType" />
                        <div class="slider round"></div>
                        <span>Online</span>
                    </label>
                    <label class="switch" for="checkboxAtStudents">
                        <input type="checkbox" id="checkboxAtStudents" v-model="type.atStudents" @change="updateType" />
                        <div class="slider round"></div>
                        <span>at Students place</span>
                    </label>
                    <label class="switch" for="checkboxAtTutors">
                        <input type="checkbox" id="checkboxAtTutors" v-model="type.atTutors" @change="updateType" />
                        <div class="slider round"></div>
                        <span>at Tutors place</span>
                    </label>
                    <label class="switch" for="checkboxElsewhere">
                        <input type="checkbox" id="checkboxElsewhere" v-model="type.otherPlace" @change="updateType" />
                        <div class="slider round"></div>
                        <span>at Other location</span>
                    </label>
                </div>

                <button @click="addNewOffer()">Post new offer</button>
            </div>
            
            <Offer :offer="newOffer"/>
        </div>
    </div>
    <div class="panel">
        <h1>My Offers</h1>
        <div class="offers">
            <Offer v-for="offer in offers" :key="offer.offerId" :offer="offer" @editOffer="handleEditOffer" @deleteOffer="handleDeleteOffer"/>
        </div>
    </div>

</template>

<script>
import { getLS, SQL, SQLupdate } from '@/assets/js/functions';
import { toast_notification } from '@/assets/js/nimoToastNotifications';
import Offer from '@/components/Find/Offer.vue';

export default {
    name: 'MyOffers',
    data() {
        return {
            newOffer: {
                handle: '@handle',
                name: 'Name Surname',
                title: '',
                description: '',
                pricePerHour: '',
                currency: 'pln',
                type: [],
                badges: ["🔥 popular tutor", "✅ verified"],
                pfp: `user.png`,
                favorite: false,
                rating: 4.5,
                ratingAmount: 204,
            },
            type: {
                online: false,
                atStudents: false,
                atTutors: false,
                otherPlace: false
            },
            offers: [],
            editingOffer: null
        };
    },
    components: {
        Offer
    },
    async mounted() {
        await this.fetchUserData();
        await this.fetchUserOffers();
    },
    methods: {
        async fetchUserData() {
            try {
                let LS = getLS();
                let uuid;
                try {
                    uuid = LS.loggedInUser.uuid;
                } catch (error) {
                    console.error('Błąd pobierania danych użytkownika:', error);
                }
                if (!uuid) {
                    throw new Error('UUID nie znaleziono w localStorage');
                }
                let response = await SQL(`SELECT * FROM users WHERE uuid = '${uuid}'`);
                console.log(response);
                this.newOffer.handle = response.data[0].handle;
                this.newOffer.name = response.data[0].fullName;
                this.newOffer.fullName = response.data[0].fullName;
                this.newOffer.nick = response.data[0].nick;
                this.newOffer.rating = response.data[0].rating;
                this.newOffer.pfp = response.data[0].pfp;

                console.log(this.newOffer);
            } catch (error) {
                console.error('Błąd pobierania danych użytkownika:', error);
            }
        },
        async fetchUserOffers() {
            try {
                let LS = getLS();
                let uuid;
                try {
                    uuid = LS.loggedInUser.uuid;
                } catch (error) {
                    console.error('Błąd pobierania danych użytkownika:', error);
                }

                if (!uuid) {
                    throw new Error('UUID nie znaleziono w localStorage');
                }
                let response = await SQL(`SELECT * FROM offers INNER JOIN users ON users.uuid = offers.creatorId WHERE creatorId = '${uuid}'`);
                this.offers = response.data;
                for (let offer of this.offers) {
                    offer.image = offer.pfp || 'user.png';
                }
            } catch (error) {
                console.error('Błąd pobierania ofert użytkownika:', error);
            }
        },
        updateType() {
            this.newOffer.type = [];
            if (this.type.online) this.newOffer.type.push('Online');
            if (this.type.atStudents) this.newOffer.type.push('Students place');
            if (this.type.atTutors) this.newOffer.type.push('Tutors place');
            if (this.type.otherPlace) this.newOffer.type.push('Other place');
        },
        async addNewOffer() {
            try {
                let LS = getLS();
                let uuid = LS.loggedInUser.uuid;

                let q = `INSERT INTO offers (creatorId, subjectId, title, description, pricePerHour, currency, isOnline, isAtStudents, isAtTutors, isAtOtherLocation) VALUES ('${uuid}', '${this.newOffer.subjectId}', '${this.newOffer.title}', '${this.newOffer.description}', ${this.newOffer.pricePerHour}, '${this.newOffer.currency}', ${this.newOffer.isOnline ? 1 : 0}, ${this.newOffer.isAtStudents ? 1 : 0}, ${this.newOffer.isAtTutors ? 1 : 0}, ${this.newOffer.isAtOtherLocation ? 1 : 0})`;
                console.log(q);
                let response = await SQLupdate(q);
                
                if (response.success) {
                    toast_notification({ 
                        type: 'success', 
                        label: 'Posted a new Offer!', 
                        time: 5 
                    });
                    this.fetchUserOffers();
                } else {
                    toast_notification({ 
                        type: 'error', 
                        label: 'Error posting a new Offer!', 
                        content: response.error,
                        time: 20
                    });
                }
            } catch (error) {
                console.error('Error adding offer:', error);
            }
        },
        async deleteOffer(offerId) {
            try {
                const response = await fetch(`http://localhost/path/to/php/delete_offer.php?offer_id=${offerId}`, {
                    method: 'DELETE'
                });

                if (!response.ok) {
                    throw new Error(`Błąd HTTP! status: ${response.status}`);
                }

                console.log(`Oferta ${offerId} została pomyślnie usunięta`);

                // Pobierz zaktualizowaną listę ofert
                this.fetchUserOffers();

            } catch (error) {
                console.error(`Błąd usuwania oferty ${offerId}:`, error);
            }
        },
        async handleEditOffer(offer) {
            // Load the offer details into a form for editing
            this.editingOffer = { ...offer };
            // Potentially redirect to an edit page or open an edit modal
            console.log('Editing offer:', offer);
        },
        async handleDeleteOffer(offerId) {
            await this.deleteOffer(offerId);
        }
    }
};
</script>

<style scoped>
    .panel {
        width: 100%;
    }
    .addOfferPanel {
        padding-bottom: 5rem;
    }
    .addOfferPanel .row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        flex-wrap: wrap;
        gap: 3rem;
    }


    .offerform {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        width: clamp(20rem, 50%, 40rem);
    }



    .checklist {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: flex-start;

        --height: 2rem;
        --width: 3rem;
        --padding: 0.25rem;
    }
    .switch {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 0.5rem;
        position: relative;
    }

    .switch input {
        display:none;
    }

    .slider {
        background-color: #ccc;
        cursor: pointer;

        position: relative;
        height: var(--height);
        width: var(--width);
        transition: .2s ease-in-out;
    }

    .slider:before {
        background-color: #fff;
        bottom: var(--padding);
        content: "";
        height: calc( var(--height) - 2 * var(--padding) );
        width: calc( var(--height) - 2 * var(--padding) );
        left: var(--padding);
        position: absolute;
        transition: .4s;
    }

    input:checked + .slider {
        background-color: #00aaff;
    }

    input:checked + .slider:before {
        left: calc( var(--width) - var(--height) + var(--padding) );
    }

    .slider.round {
        border-radius: 34px;
    }

    .slider.round:before {
        border-radius: 50%;
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
