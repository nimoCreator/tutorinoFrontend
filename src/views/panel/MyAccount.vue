<template>
    <RouterLink :to="pathToTutor" class="panel">
        <h1>Your profile:</h1><h5>( click to open tutor profile the way your students see it )</h5>
        <div class="userSnippet">
            <img class="pfp" :src="pfpLink" />
            <div class="right">
                <div class="chips">
                    <span v-if="data.isTutor == 1">Tutor</span>
                    <span v-if="data.isStudent == 1">Student</span>
                    <span v-if="data.isOperator == 1">Operator</span>
                </div>
                <span class="lastOnline">
                    {{ displayLastOnline }}
                </span>
                <span class="name">
                    {{ data.nick || data.fullName || data.handle }} 
                    <span class="handle handleSpan">
                    {{ data.handle }}
                    </span>
                </span>
                <span class="status">
                    {{ data.status }}
                </span>
                <div class="score">
                    <span class="rating">
                        {{ data.rating }} ( {{ data.ratingCount }} )
                    </span>
                    <div class="stars">
                        <svg :style="{ '--v': Math.max(0, Math.min(100, data.rating*100)) + '%'}" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                        <svg :style="{ '--v': Math.max(0, Math.min(100, data.rating*100-100)) + '%' }" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                        <svg :style="{ '--v': Math.max(0, Math.min(100, data.rating*100-200)) + '%'}" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                        <svg :style="{ '--v': Math.max(0, Math.min(100, data.rating*100-300)) + '%' }" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                        <svg :style="{ '--v': Math.max(0, Math.min(100, data.rating*100-400)) + '%' }" id="star-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" class="humbleicons hi-star"> <path xmlns="http://www.w3.org/2000/svg" d="M12 2l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545L12 17l-5.878 3.09 1.123-6.545L2.489 8.91l6.572-.955L12 2z" /> </svg>
                    </div>
                </div>

            </div>
        </div>
    </RouterLink>
    <div class="panel">
        <h1>Edit profile</h1>
        <div class="content" style="gap: 1.5rem">

            <div class="formGrid">
                <label>Nick
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="humbleicons hi-info-circle"><path xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11h1v5.5m0 0h1.5m-1.5 0h-1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9.5-4v-.5h.5V8h-.5z"/></svg>
                    <div class="tooltip tooltipUpRight" style="font-size: 0.75rem;">
                        This will be used instead of your full name, leave it empty if you prefere your name.
                    </div>
                </label>
                <input type="text" v-model="data.nick" />
                <button @click="updateField('nick')">Update Nick</button>

                <label>Full Name</label>
                <input type="text" v-model="data.fullName" />
                <button @click="updateField('fullName')">Update Nick</button>

                <label class="hasTooltip">Handle 
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" class="humbleicons hi-info-circle"><path xmlns="http://www.w3.org/2000/svg" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 11h1v5.5m0 0h1.5m-1.5 0h-1.5M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9.5-4v-.5h.5V8h-.5z"/></svg>
                    <div class="tooltip tooltipUpRight" style="font-size: 0.75rem;">
                        This is your unique identifier. It will be how others can identify you.
                    </div>
                </label>
                <input type="text" v-model="data.handle" @input="formatHandle"/>
                <button @click="updateField('handle')">Update Handle</button>

                <label>Status</label>
                <input type="text" v-model="data.status" />
                <button @click="updateField('status')">Update Status</button>

                <label>Login (Unique):</label>
                <input type="text" v-model="data.login" />
                <button @click="updateField('login')">Update Login</button>

                <label>Birthdate:</label>
                <input type="date" v-model="data.birthdate" />
                <button @click="updateField('birthdate')">Update Birthdate</button>

                
                <label>Account type</label>
                <div class="checklist">
                    <label class="switch" for="checkboxTutor">
                        <input type="checkbox" id="checkboxTutor" v-model="data.isTutor" @change="updateAccountType" />
                        <div class="slider round"></div>
                        <span>Tutor</span>
                    </label>
                    <label class="switch" for="checkboxStudent">
                        <input type="checkbox" id="checkboxStudent" v-model="data.isStudent" @change="updateAccountType" />
                        <div class="slider round"></div>
                        
                    <span>Student</span>
                    </label>
                    <label class="switch" for="checkboxOperator">
                        <input type="checkbox" id="checkboxOperator" v-model="data.isOperator" @change="updateAccountType" />
                        <div class="slider round"></div>
                        
                    <span>Operator</span>
                    </label>
                </div>

                <label>Profile Picture:</label>
                <div class="pfprow">
                    <img :src="pfpPreview" class="round" />
                    <img :src="pfpPreview" />
                    <input type="file" @change="handleFileUpload" />
                    <button @click="uploadProfilePicture">Upload Profile Picture</button>
                </div>
            </div>
        </div>  
    </div>
    <div class="panel">
        <div class="formGridPassword nimoForm">
                <h2>Change Password:</h2><br>
                <div class="panel password">
                    <div>
                        <img src="@/assets/img/Login/padlock.svg">
                    </div>
                    <input class="nimoweb_passwordCurrent" id="login_password_current" placeholder="Current Password" :type="showPassword[1] ? 'text' : 'password'" v-model="password.current">
                    <button id="login_password_toggle_current" class="nimoweb_password_eye" type="button" @click="togglePasswordVisibility(1)">
                        <img :src="showPassword[1] ? require('@/assets/img/Login/eye_open.svg') : require('@/assets/img/Login/eye_closed.svg')">
                    </button>
                </div>

                <div class="panel password">
                    <div>
                        <img src="@/assets/img/Login/padlock.svg">
                    </div>
                    <input class="nimoweb_passwordNew" id="login_password_new" placeholder="New Password" :type="showPassword[2] ? 'text' : 'password'" v-model="password.new">
                    <button id="login_password_toggle_new" class="nimoweb_password_eye" type="button" @click="togglePasswordVisibility(2)">
                        <img :src="showPassword[2] ? require('@/assets/img/Login/eye_open.svg') : require('@/assets/img/Login/eye_closed.svg')">
                    </button>
                </div>

                <div class="panel password">
                    <div>
                        <img src="@/assets/img/Login/padlock.svg">
                    </div>
                    <input class="nimoweb_passwordRepeat" id="login_password_repeat" placeholder="Repeat the new Password" :type="showPassword[3] ? 'text' : 'password'" v-model="password.confirm">
                    <button id="login_password_toggle_repeat" class="nimoweb_password_eye" type="button" @click="togglePasswordVisibility(3)">
                        <img :src="showPassword[3] ? require('@/assets/img/Login/eye_open.svg') : require('@/assets/img/Login/eye_closed.svg')">
                    </button>
                </div>

                <button @click="changePassword">Change Password</button>
        </div>
</div>
</template>

<script>
import { toast_notification } from '@/assets/js/nimoToastNotifications';
import { pfpPath } from '@/assets/js/consts';
import { SQL, SQLupdate, getLS } from '@/assets/js/functions';


export default {
    name: 'MyAccount',
    data() {
        return {
            data: {
                handle: '',
                email: '',
                login: '',
                pfp: 'user.png',
                nick: '',
                birthdate: '',
                rating: (Math.floor(Math.random() * 50) / 10).toFixed(1),
                ratingAmount: Math.floor(Math.random() * 100),
                name: 'Sebastian Legierski',
                lastOnline: `2024-09-06 04:01:52`,
                isTutor: true,
                isStudent: false,
                isOperator: false,
            },
            password: {
                current: '',
                new: '',
                confirm: '',
            },
            profilePictureFile: null,
            pfpPreview: require('@/assets/img/user.png'),
            showPassword: [false, false, false],
        };
    },
    computed: {
        pfpLink() {
            return `${pfpPath}${this.data.pfp}`;
        },
        displayLastOnline() {
            let lastOnline = new Date(this.data.lastLogin);
            let now = new Date();
            let diff = now - lastOnline;
            
            if (diff < 60000) return 'Online';
            if (diff < 3600000) return `Last seen: ${Math.floor(diff / 60000)} minutes ago`;
            if (diff < 86400000) return `Last seen: ${Math.floor(diff / 3600000)} hours ago`;
            if (diff < 604800000) return `Last seen: ${Math.floor(diff / 86400000)} days ago`;
            
            if (diff < 2419200000) return `Last seen: ${Math.floor(diff / 604800000)} weeks ago`;

            const months = (now.getFullYear() - lastOnline.getFullYear()) * 12 + (now.getMonth() - lastOnline.getMonth());
            if (months < 12) return `Last seen: ${months} months ago`;
            
            const years = now.getFullYear() - lastOnline.getFullYear();
            return `Last seen: ${years} years ago`;
        },
        pathToTutor() {
            return `/tutor/${this.data.handle}`;
        }
    },
    methods: {
        async updateAccountType() {
            const isTutor = document.getElementById('checkboxTutor').checked ? 1 : 0;
            const isStudent = document.getElementById('checkboxStudent').checked ? 1 : 0;
            const isOperator = document.getElementById('checkboxOperator').checked ? 1 : 0;

            try {
                const response = await SQLupdate(`UPDATE users SET isTutor = ${isTutor}, isStudent = ${isStudent}, isOperator = ${isOperator} WHERE uuid = '${this.data.uuid}'`);
                if (response.success) {
                    toast_notification({ type: 'success', label: 'Account Type Updated', content: 'Account type updated successfully!', time: 5 });
                } else {
                    toast_notification({ type: 'error', label: 'Update Failed', content: response.message, time: 20 });
                }
            } catch (error) {
                console.error('Error updating account type:', error);
            }
            this.fetchData();
        },
        formatHandle() {
            const regex = /^[a-z0-9-_]+$/;
            if (!regex.test(this.data.handle)) {
                this.data.handle = this.data.handle.replace(/[^a-z0-9-_]/g, '');
            }
        },
        async updateField(field) {
            try {
                
                let value = this.data[field];
                const response = await fetch(`http://localhost/tutorinoAPIs/updateField.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        uuid: this.data.uuid,
                        field: field,
                        value: value,
                    }),
                    credentials: 'include',
                });
                const result = await response.json();

                if (result.status === 'success') {
                    toast_notification({ type: 'success', label: 'Field Updated', content: `${field} updated successfully!`, time: 5});
                } else {
                    toast_notification({ type: 'error', label: 'Update Failed', content: result.message, time: 20 });
                }
            } catch (error) {
                console.error('Error updating field:', error);
            }
            this.fetchData();
            // EventBus.$emit('updateNavbar');
        },
        async uploadProfilePicture() {
            const formData = new FormData();
            formData.append('uuid', this.data.uuid);
            formData.append('profilePicture', this.profilePictureFile);
            console.log(formData);
            try {
                const response = await fetch('http://localhost/tutorinoAPIs/uploadPfp.php', {
                    method: 'POST',
                    body: formData,
                    credentials: 'include',
                });

                const result = await response.json();

                if (result.status === 'success') {
                    toast_notification({ type: 'success', label: 'Profile Picture', content: 'Profile picture updated successfully!', time: 5 });
                } else {
                    toast_notification({ type: 'error', label: 'Upload Failed', content: result.message, time: 20 });
                }
            } catch (error) {
                console.error('Error uploading profile picture:', error);
            }
            this.fetchData();
            // EventBus.$emit('updateNavbar');
        },
        handleFileUpload(event) {
            this.profilePictureFile = event.target.files[0];
            this.pfpPreview = URL.createObjectURL(this.profilePictureFile);
        },
        async changePassword() {
            if (this.password.new !== this.password.confirm) {
                toast_notification({ type: 'error', label: 'Password Error', content: 'New passwords do not match!' });
                return;
            }

            try {
                const response = await fetch(`http://localhost/tutorinoAPIs/changePassword.php`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        uuid: this.data.uuid,
                        currentPassword: this.password.current,
                        newPassword: this.password.new,
                    }),
                    credentials: 'include',
                });

                const result = await response.json();

                if (result.status === 'success') {
                    toast_notification({ type: 'success', label: 'Password Changed', content: 'Password updated successfully!', time: 5 });
                } else {
                    toast_notification({ type: 'error', label: 'Password Change Failed', content: result.message, time: 20 });
                }
            } catch (error) {
                console.error('Error changing password:', error);
            }
            this.fetchData();
        },
        async fetchData() {
            try {
                let ls = getLS()
                let uuid = ls && ls.loggedInUser && ls.loggedInUser.uuid;
                if (!uuid) {
                    this.$router.push({ path: '/login' });
                    throw new Error('UUID not found in localStorage');
                }
                let response = await SQL(`SELECT * FROM users WHERE uuid = '${uuid}'`);
                this.data =  response.data[0];
                this.data.isTutor = this.data.isTutor == 1;
                this.data.isStudent = this.data.isStudent == 1;
                this.data.isOperator = this.data.isOperator == 1;
                console.log(this.data);
            } catch (error) {
                toast_notification({ 
                    type: 'error', 
                    label: 'Fetch Error', 
                    content: 'Error fetching user data!',
                    time: "20", 
                 });
                console.error("Error checking login status:", error);
            }
        },
        togglePasswordVisibility(field) {
            this.showPassword[field] = !this.showPassword[field];
        },
    },
    mounted() {
        this.fetchData();
    }
};
</script>

<style scoped>
@import url('@/assets/css/common/tooltip.css');
.panel {
    width: 100%;
}
    .userSnippet {
        display: flex;
        flex-direction: row;
        align-items: stretch;
        justify-content: stretch;
        gap: 1rem;
        width: 100%;

        --fontSize: clamp(0.75rem, 3vw, 1.5rem);
    }
    .userSnippet .pfp {
        width: clamp(5rem, 20vw, 10rem);
        height: clamp(5rem, 20vw, 10rem);
        border-radius: clamp(0.75rem, 3vw, 1.5rem);
        aspect-ratio: 1 / 1;
        object-fit: cover;
    }

    .userSnippet .right {

        font-size: calc(var(--fontSize) * 1.25);
        font-weight: bold;
        
        /* background-color: #000000; */

        width: 100%;
        flex-grow: 1;

        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        gap: 0.125rem;
    }
    .userSnippet .right .handle {
        font-size: calc(var(--fontSize) * 1.25);
        font-weight: normal;
        color: #666;
    }
    .userSnippet .right .name {
        font-size: calc(var(--fontSize) * 1.75);
        line-height: calc(var(--fontSize) * 1);
        font-weight: bold;
        color: #050505;

        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.25rem;

        flex-wrap: wrap;
    }
    .userSnippet .right .lastOnline {
        font-size: calc(var(--fontSize) * 0.75);
        color: #888;
    }
    .userSnippet .right .status {
        font-size: calc(var(--fontSize) * 0.75);
        color: #222;
    }
    .userSnippet .score {
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        align-items: center;
        gap: 0.5rem;
        font-size: 0.75rem;
    }
    .userSnippet .stars {
        display: flex;
        flex-direction: row;
        justify-content: center;
        gap: 0.25rem;
    }
    .userSnippet .stars svg {
        --active-color: #fcbf02;
        --inactive-color: #ceccc6;
        --v: 0.5;
        fill: color-mix(in srgb, var(--inactive-color), var(--active-color) var(--v));
        stroke: color-mix(in srgb, var(--inactive-color), var(--active-color) var(--v));
        stroke-width: 0.25rem !important;
        stroke-linejoin: round;

        transition: 0.2s 0.1s;

        height: 1rem;
    }

    .chips {
        display: flex;
        flex-direction: row;
        justify-content: flex-end;
        gap: 0.25rem;
    }
    .chips > * {
        padding: 0.125rem 0.5rem;
        border-radius: 20rem;
        background-color: #00aaff;
        color: #eee;
        font-size: 0.625rem;
    }

    .formGridPassword {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr;
        gap: 1rem 0.25rem;
        justify-content: stretch;
        align-items: stretch;
    }

    .formGrid {
        width: 100%;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 1rem 0.25rem;
        justify-content: stretch;
        align-items: stretch;
    }
    .formGrid > label {
        font-size: 1.25rem;
        font-weight: 500;
        grid-column: span 2;
    }
    .formGrid button {
        width: 100%;
    }
    .formGrid label svg {
        width: 0.75rem;
        height: 0.75rem;
        stroke: #666;
    }
    .handleSpan {
        display: flex;
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

    .pfprow {
        width: 100%;
        display: grid;
        grid-template-columns: auto auto 1fr;
        grid-template-rows: auto 1fr;
        gap: 1rem;
        align-items: stretch;
        justify-content: stretch;
        grid-column: span 2;
    }
    .pfprow input {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: auto;
    }
    .pfprow img {
        width: 5rem;
        height: 5rem;
        border-radius: 1rem;
        object-fit: cover;
        box-shadow: 0.125rem 0.125rem 0.25rem #00000088;
        grid-row: span 2;
    }
    .pfprow img.round {
        border-radius: 50%;
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
</style>
