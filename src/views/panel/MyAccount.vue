<template>
    <div class="panel">
        <h1>My Account</h1>
        <div class="content">
            
            <div>
                <label>Nick:</label><br>
                <input type="text" v-model="data.nick" />
            </div>
            <div>
                <label>Full Name:</label><br>
                <input type="text" v-model="data.full_name" />
            </div>
            <div>
                <label>Birthdate:</label><br>
                <input type="date" v-model="data.birthdate" />
            </div>
            <div>
                <label>Profile Picture:</label><br>
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
export default {
    name: 'MyAccount',
    data() {
        return {
            isLoggedIn: false,
            data: {
                nick: '',
                full_name: '',
                birthdate: '',
                is_tutor: false,
                is_student: false
            },
            profilePictureFile: null
        };
    },
    mounted() {
        this.checkLoginStatus();
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
                    this.data = data;
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

                const response = await fetch('http://localhost/tutorinoAPIs/uploadProfilePicture.php', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include'
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
        becomeTutor() {
            // Logic to become a tutor (not implemented in this example)
            console.log('Become a tutor');
        },
        becomeStudent() {
            // Logic to become a student (not implemented in this example)
            console.log('Become a student');
        }
    }
};
</script>

<style scoped>

</style>
