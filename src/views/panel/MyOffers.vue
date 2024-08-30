<template>
    <div class="panel">
        <h1>Moje oferty</h1>

        <!-- Display user's offers -->
        <div v-if="offers.length === 0">
            Nie masz jeszcze żadnych ofert.
        </div>
        <div v-for="offer in offers" :key="offer.offer_id" class="offer-card">
            <h3>{{ offer.label }}</h3>
            <p>{{ offer.description }}</p>
            <p>Cena za godzinę: {{ offer.price_per_hour }} PLN</p>
            <img :src="offer.image ? offer.image : 'https://via.placeholder.com/150'" alt="Offer Image" style="max-width: 100px; max-height: 100px;">
            <button @click="deleteOffer(offer.offer_id)">Usuń</button>
        </div>
    </div>

    <div class="panel">
        <h1>Dodaj ofertę</h1>
        
        <!-- Form to add new offer -->
        <form @submit.prevent="addOffer">
            <div>
                <label>Wybierz Przedmiot</label>
                <select v-model="newOffer.subject_id" required>
                    <option value="1">Matematyka</option>
                    <option value="2">Fizyka</option>
                    <option value="3">Chemia</option>
                    <option value="4">Biologia</option>
                    <option value="5">Informatyka</option>
                    <option value="6">Język Polski</option>
                    <option value="7">Język Angielski</option>
                    <option value="8">Języki inne...</option>
                    <option value="9">Historia</option>
                    <option value="10">Geografia</option>
                    <option value="11">Inne...</option>
                </select>
            </div>
            <div>
                <label>Cena za godzinę (PLN):</label>
                <input type="number" v-model="newOffer.price_per_hour" required>
            </div>
            <div>
                <label>Tytuł:</label>
                <input type="text" v-model="newOffer.label" required>
            </div>
            <div>
                <label>Opis:</label>
                <textarea v-model="newOffer.description" required></textarea>
            </div>
            <div>
                <label>Obrazek (opcjonalnie):</label>
                <input type="text" v-model="newOffer.image">
            </div>
            <button type="submit">Dodaj ofertę</button>
        </form>
    </div>
</template>

<script>
export default {
    name: 'MyOffers',
    data() {
        return {
            offers: [],
            newOffer: {
                subject_id: '',
                price_per_hour: '',
                description: '',
                label: '',
                image: ''
            },
        };
    },
    mounted() {
        this.fetchUserOffers();
    },
    methods: {
        async fetchUserOffers() {
            try {
                const uuid = localStorage.getItem('uuid');
                if (!uuid) {
                    throw new Error('UUID nie znaleziono w localStorage');
                }
                
                const response = await fetch(`http://localhost/path/to/php/fetch_offers.php?creator_id=${uuid}`);
                if (!response.ok) {
                    throw new Error(`Błąd HTTP! status: ${response.status}`);
                }
                const data = await response.json();
                this.offers = data;
            } catch (error) {
                console.error('Błąd pobierania ofert użytkownika:', error);
            }
        },
        async addOffer() {
            try {
                const uuid = localStorage.getItem('uuid');
                if (!uuid) {
                    throw new Error('UUID nie znaleziono w localStorage');
                }

                const response = await fetch('http://localhost/path/to/php/add_offer.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        creator_id: uuid,
                        subject_id: this.newOffer.subject_id,
                        price_per_hour: this.newOffer.price_per_hour,
                        description: this.newOffer.description,
                        label: this.newOffer.label,
                        image: this.newOffer.image
                    })
                });

                if (!response.ok) {
                    throw new Error(`Błąd HTTP! status: ${response.status}`);
                }

                const result = await response.json();
                console.log('Nowa oferta dodana:', result);

                // Wyczyść pola formularza
                this.newOffer = {
                    subject_id: '',
                    price_per_hour: '',
                    description: '',
                    label: '',
                    image: ''
                };

                // Pobierz zaktualizowaną listę ofert
                this.fetchUserOffers();

            } catch (error) {
                console.error('Błąd dodawania nowej oferty:', error);
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
        }
    }
};
</script>

<style scoped>
form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}

form > div {
    display: flex;
    flex-direction: column;
}

.offer-card {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 10px;
}
</style>
