<template>
    <div class="panel">
        <div class="userSnippet">
            <img class="pfp" :src="data.pfp" />
            <div class="chips">
                <span :v-if="{is_tutor}">Korepetytor</span>
                <span :v-if="{is_student}">Uczeń</span>
            </div>
            <span class="nick">
                {{ data.nick ? data.nick : data.full_name}}
            </span>
            <div class="score">
                <span class="rating">
                    {{ data.rating }}/5
                </span>
                <div class="stars">
                    <svg :style="{ '--v': data.rating }" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                    <svg :style="{ '--v': (data.rating-1) }" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                    <svg :style="{ '--v': (data.rating-2) }" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                    <svg :style="{ '--v': (data.rating-3) }" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                    <svg :style="{ '--v': (data.rating-4) }" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                </div>
            </div>
        </div>
    </div>
    <div class="panel">
        <h1>Edytuj</h1>
        <div class="content" style="gap: 1.5rem">

            <div>
                <label>Nick:</label><br>
                <input type="text" v-model="data.nick" />
            </div>
            <div>
                <label>Birthdate:</label><br>
                <input type="date" v-model="data.birthdate" />
            </div>
            <div style="display: grid; grid-template-columns: auto auto;">
                <label style="grid-column: span 2;">Profile Picture:</label><br>
                <img :src="data.profile_picture" />
                <div style="display: flex; flex-direction: row; justify-content: space-evenly;">
                    <input style="width: min-content;" type="file" @change="handleFileUpload" />
                    <button @click="uploadProfilePicture">Upload</button>
                </div>
            </div>
            <div style="display: flex; flex-direction: row; justify-content: space-evenly;">
                <button v-if="!data.is_tutor && !data.is_student" @click="becomeTutor">Zostań Korepetytorem</button>
                <button v-if="!data.is_tutor && !data.is_student" @click="becomeStudent">Zostań Uczniem</button>
            </div>
        </div>
    </div>
</template>

<script>
import { toast_notification } from '@/assets/js/nimoToastNotifications';

export default {
    name: 'MyAccount',
    data() {
        return {
            isLoggedIn: false,
            data: {
                uuid: '',
                nick: '',
                full_name: '',
                birthdate: '',
                is_tutor: false,
                is_student: false,
                pfp: require('@/assets/img/user.png'),
                rating: 3.5,
            },
        };
    },
    mounted() {
        this.checkLoginStatus();
        this.data.rating = Math.floor( Math.random() * 50) / 10;
    },
    methods: {
        async checkLoginStatus() {
            try {
                const uuid = localStorage.getItem('uuid'); // Assuming UUID is stored in localStorage
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
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                if (data.status === 'success') {
                    this.isLoggedIn = true;
                    
                    this.data = { ...this.data, ...data, uuid }
                    if(data.pfp === null) {
                        this.data.pfp = require('@/assets/img/user.png');
                    }
                } else if (response.status === 401) {
                    this.isLoggedIn = false;
                } else {
                    console.error("Unknown error:", data);
                }
            } catch (error) {
                console.error("Error checking login status:", error);
            }
        },
        async uploadProfilePicture() {
            try {
                const formData = new FormData();
                formData.append('uuid', this.data.uuid);  
                formData.append('profilePicture', this.profilePictureFile);
                console.log(formData);
                const response = await fetch('http://localhost/tutorinoAPIs/uploadPfp.php', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                    uuid: this.data.uuid,
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.status === 'success') {
                    console.log('Profile picture uploaded successfully');
                    // Optionally update UI or show success message
                } else {
                    console.error('Failed to upload profile picture:', result.message);
                    // Optionally handle failure case
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
        },
        handleFileUpload(event) {
            this.profilePictureFile = event.target.files[0];
        },
        async becomeTutor() {
            try {
                const response = await fetch('http://localhost/tutorinoAPIs/becomeTutor.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uuid: this.data.uuid }),  // Ensure uuid is included
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.status === 'success') {
                    console.log('Successfully became a tutor');
                    this.data.is_tutor = true;  // Update the UI state
                    toast_notification({
                        type: "success", 
                        time: "30", 
                        label: "Zostałeś korepetytorem!", 
                        content: "Gratulujemy, zostania korepetytorem na tutorino!"
                    });
                } else {
                    console.error('Failed to become a tutor:', result.message);
                }
            } catch (error) {
                console.error('Error becoming a tutor:', error);
            }
        },
        async becomeStudent() {
            try {
                const response = await fetch('http://localhost/tutorinoAPIs/becomeStudent.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ uuid: this.data.uuid }),  // Ensure uuid is included
                    credentials: 'include'
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                if (result.status === 'success') {
                    console.log('Successfully became a student');
                    this.data.is_student = true;  // Update the UI state
                    toast_notification({
                        type: "success", 
                        time: "30", 
                        label: "Zostałeś uczniem!", 
                        content: "Gratulujemy, zostania uczniem na tutorino!"
                    });
                } else {
                    console.error('Failed to become a student:', result.message);
                }
            } catch (error) {
                console.error('Error becoming a student:', error);
            }
        }

    }
};
</script>

<style scoped>
    .userSnippet {
        display: grid;
        flex-direction: column;
        align-items: center;
        row-gap: 0.25rem;
        column-gap: 1rem;
        grid-template-columns: 5rem auto auto;
        grid-template-areas: "pfp nick chips" "pfp score score";
    }
    .userSnippet .pfp {
        grid-area: pfp;
    }
    .userSnippet .nick {
        grid-area: nick;
    }
    .userSnippet .chips {
        grid-area: chips;
    }
    .userSnippet .score {
        grid-area: score;
    }


    .userSnippet .pfp {
        width: 5rem;
        height: 5rem;
        border-radius: 0.5rem;
    }

    .userSnippet .score {
        display: flex;
        flex-direction: row;
        justify-content: left;
        gap: 1rem;
    }

    .userSnippet .stars {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .userSnippet .stars svg {
        --v: 0.5;
        opacity: var(--v);
        fill: #fcbf02;
        stroke: #fcbf02;
        stroke-width: 0.25rem !important;
        stroke-linejoin: round;

        transition: 0.2s 0.1s;

        height: 1rem;
    }

    .userSnippet .chips {
        display: flex;
        flex-direction: row;
        justify-content: center;
    }
    .userSnippet .chips span {
        background-color: #00aaff;
        color: #fff;
        padding: 0.25rem 0.5rem;
        border-radius: 0.5rem;
        margin: 0 0.25rem;
        font-weight: bold;
        font-size: 0.75rem;
    }

    .userSnippet .name {
        font-size: 1.5rem;
        font-weight: bold;
    }
</style>
