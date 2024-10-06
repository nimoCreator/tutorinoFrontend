<template>
    <div class="container">
        <div class="left">
            <h3>Your Conversations</h3>
            <div class="conversations">
                <router-link v-for="conversation in conversations" :key="conversation.conversationId" :to="`/panel/chat/${conversation.conversationId}`" @click.prevent="getChat">
                    {{ conversation.conversationId }}
            </router-link>
            </div>
        </div>
        <div class="chat" v-if="chatid">
            <div class="messages">
                <div v-for="message in chat.messages" :key="message.messageId" :class="{ 'my': message.senderId == uuid }">
                    <img :src="pfpPath + ( chat.participants[message.senderId]?.pfp || `user.png` )" />
                    <div class="messageBubble">
                        <div class="row">
                            <span class="who">
                                {{ chat.participants[message.senderId]?.nick || chat.participants[message.senderId]?.fullname || chat.participants[message.senderId]?.handle || 'Unknown' }}:
                            </span>
                            <span class="when hasTooltip">
                                {{ ago(message.timestamp) }}
                                <span class="tooltip">{{ message.timestamp }}</span>
                            </span>
                        </div>
                        <div class="content">
                            {{ message.content }}
                        </div>
                    </div>
                </div>
            </div>
            <div class="textfield">
                <input v-model="messagetext" type="text" placeholder="Type a message" />
                <button @click.prevent="sendMessage" >Send</button>
            </div>
        </div>
    </div>
</template>

<script>
import { pfpPath } from '@/assets/js/consts';
import { getLS, SQL, SQLupdate } from '@/assets/js/functions';

export default {
    name: 'ChatsPage',
    data() {
        return {
            chatid: '',    

            tutorhandle: '',
            tutorid: '',     

            conversations: [], 
            chat: {
                messages: [], 
                conversationId: '',
                participants: {},
            },

            messagetext: '',      
            pfpPath: pfpPath,

            uuid: '',
        }
    },
    methods: {
        // Fetch all conversations for the current user
        async getConversations() {
            try {
                const userId = this.uuid;
                const response = await SQL(`SELECT * FROM conversations 
                                            INNER JOIN conversation_members 
                                            ON conversations.conversationId = conversation_members.conversationId 
                                            WHERE conversation_members.userId = '${userId}'`);
                if (response.data) {
                    this.conversations = response.data;
                }
            } catch (error) {
                console.error('Error fetching conversations:', error);
            }
        },
        
        // Fetch messages for a specific chat
        async getChat() {
            try {
                this.chatid = this.$route.params.chatid;
                const response = await SQL(`SELECT * FROM messages WHERE conversationId = '${this.chatid}'`);
                if (response.data) {
                    this.chat.messages = response.data;
                }
                // get participants

                const response2 = await SQL(`SELECT * FROM conversation_members INNER JOIN users ON userId = uuid WHERE conversationId = '${this.chatid}'`);
                this.chat.participants = {};
                if (response2.data != null) {
                    response2.data.forEach(user => {
                        this.chat.participants[user.uuid] = user;
                    });
                }
            } catch (error) {
                console.error('Error fetching chat:', error);
            }
        },
        async getTutorIdFromHandle() {
            try {
                const response = await SQL(`SELECT uuid FROM users WHERE handle = '${this.tutorhandle}'`);
                if (response.data && response.data.length > 0) {
                    this.tutorid = response.data[0].uuid;
                    if (this.tutorid) this.findChatWithTutor();
                } else {
                    console.error('Tutor not found');
                }
            } catch (error) {
                console.error('Error fetching tutor ID:', error);
            }
        },
        async findChatWithTutor() {
            try {
                const userId = this.uuid;
                const response = await SQL(`SELECT conversations.conversationId 
                                            FROM conversations 
                                            INNER JOIN conversation_members 
                                            ON conversations.conversationId = conversation_members.conversationId 
                                            WHERE conversation_members.userId IN ('${userId}', '${this.tutorid}') 
                                            GROUP BY conversation_members.conversationId
                                            HAVING COUNT(DISTINCT conversation_members.userId) = 2`);
                if (response.data.length > 0) {
                    this.chat = response.data[0];
                    this.getChat();
                } else {
                    this.createChat();
                }
            } catch (error) {
                console.error('Error finding chat with tutor:', error);
            }
        },
        
        // Create a new chat
        async createChat() {
            try {
                const userId = this.uuid;
                const response = await SQLupdate(`INSERT INTO conversations (ownerId) VALUES (${userId})`);
                if (response.success) {
                    const response2 = await SQL(`SELECT conversationId FROM conversations WHERE ownerId = '${userId}' ORDER BY conversationId DESC LIMIT 1`);
                    
                    const newConversationId = response2.data[0].conversationId;

                    // Add both users to conversation_members
                    let q = `INSERT INTO conversation_members (conversationId, userId) 
                               VALUES (${newConversationId}, ${userId}), (${newConversationId}, ${this.tutorid})`;

                    await SQLupdate(q);
  
                    this.chatid = newConversationId;
                    this.getChat();
                }
            } catch (error) {
                console.error('Error creating chat:', error);
            }
        },
        
        // Send a new message
        async sendMessage() {
            try {
                const userId = this.uuid;
                if (this.messagetext.trim() !== '') {
                    const response = await SQL(`INSERT INTO messages (senderId, conversationId, content) 
                                                VALUES (${userId}, ${this.chatid}, '${this.messagetext}')`);
                    if (response.success) {
                        this.getChat(); // Refresh chat after sending a message
                        this.messagetext = ''; // Clear input field
                    }
                }
            } catch (error) {
                console.error('Error sending message:', error);
            }
        },

        ago(t) {
            let sent = new Date(new String(t));
            let now = new Date();
            let diff = now - sent;
            
            if (diff <     60000) return 'just now';
            if (diff <    120000) return `1 minute ago`;
            if (diff <   3600000) return `${Math.floor(diff / 60000)} minutes ago`;
            if (diff <   7200000) return `1 hour ago`;
            if (diff <  86400000) return `${Math.floor(diff / 3600000)} hours ago`;
            if (diff < 172800000) return `1 day ago`;
            if (diff < 604800000) return `${Math.floor(diff / 86400000)} days ago`;
            if (diff < 1209600000) return `1 week ago`;            
            if (diff < 2419200000) return `${Math.floor(diff / 604800000)} weeks ago`;

            const months = (now.getFullYear() - sent.getFullYear()) * 12 + (now.getMonth() - sent.getMonth());
            if (months < 12) return `${months} months ago`;
            
            const years = now.getFullYear() - sent.getFullYear();
            return `${years} years ago`;
        },
    },
    mounted() {
        this.chatid = this.$route.params.chatid;
        this.tutorhandle = this.$route.params.tutorhandle;
        try {
            let LS = getLS();
            this.uuid = LS.loggedInUser.uuid;
        } catch (error) {
            console.error('Error fetching user:', error);
        }
        
        this.getConversations();
        
        if (this.chatid) {
            this.getChat();
        }
        if (this.tutorhandle  && this.tutorhandle != this.uuid) {
            this.getTutorIdFromHandle(); 
        }
    },
    computed: {

    },
}
</script>


<style scoped>

    .container {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: row;
        justify-content: stretch;
        align-items: stretch;
        gap: 1rem;
    }

    .left {
        white-space: nowrap;
        overflow: hidden;
        width: 12rem;

        background-color: var(--element-background);
        color: var(--element-fontcolor);
        padding: 1rem;
        border-radius: 1rem;

        display: flex;
        flex-direction: column;
        gap: 1rem;
    }
    .conversations {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap: 0.5rem;
    }
    .conversations > * {
        height: 3rem;
        width: 3rem;
        border-radius: 50%;

        background-color: #00aaff;
        color: white;
        font-weight: bold;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .chat {
        flex-grow: 1;
        flex-shrink: 1;

        display: grid;
        grid-template-rows: 1fr auto;
        gap: 1rem;
    }

    .messages {
        overflow: hidden auto;

        display: flex;
        flex-direction: column;
        justify-items: center;
        align-items: center;
        
        gap: 1rem;

        margin: 0;
        padding: 0;
    }
    .messages > * {
        display: flex;
        flex-direction: row;

        gap: 0.25rem;

        align-self: flex-start;
    }
    .messages > .my {
        align-self: flex-end !important;
        flex-direction: row-reverse;
    }
    .messages > * > img {
        width: 4rem;
        height: 4rem;
        aspect-ratio: 1 / 1;
        border-radius: 50%;
        object-fit: cover;
    }
    .messages > * > .messageBubble {

        background-color: var(--element-background);
        color: var(--element-fontcolor);
        padding: 0.25rem 0.75rem;
        border-radius: 0 0.25rem 0.25rem 0.25rem;

        display: flex;
        flex-direction: column;
        width: 100%;
        gap: 0.25rem;
        
        position: relative;
    }
    .messages > .my > .messageBubble {
        border-radius: 0.25rem 0 0.25rem 0.25rem;
    }
    .messages > * > .messageBubble > .row {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        gap: 0.25rem;
        align-items: center;
    }
    .messages > * > .messageBubble > .row > .who {
        font-weight: bold;
    }
    .messages > * > .messageBubble > .row > .when {
        font-size: 0.8rem;
    }
    .messages > * > .messageBubble > .content {
        display: flex;
        flex-direction: column;
        padding-bottom: 0.5rem;
    }

    .textfield {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        background-color: var(--element-background);
        padding: 0.5rem;
        border-radius: 1rem;
        gap: 1rem;
    }

    .textfield input {
        flex-grow: 1;
        padding: 0.5rem !important;
        border: none;
        border-radius: 1rem;
        width: 100%;
        text-wrap: normal;
        white-space: wrap;
        line-break: anywhere;
        line-clamp: 5;
    }

    .messages > * > .messageBubble::after {
        position: absolute;
        right: 100%;
        top: 0;

        content: '';
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 0.375rem;
        border-color:  var(--element-background) var(--element-background) transparent transparent;
    }

    .messages > .my > .messageBubble::after {
        left: 100%;

        border-color: var(--element-background) transparent transparent var(--element-background);
    }

</style>