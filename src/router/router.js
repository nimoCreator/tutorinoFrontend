import { createRouter, createWebHistory } from 'vue-router'

// import the views


import About from '../views/About.vue'
import Calendar from '../views/panel/MyCalendar.vue'
import MyOffers from '../views/panel/MyOffers.vue'
import Chats from '../views/panel/Chats.vue'
import Find from '../views/SearchLessons.vue'
import Enter from '../views/login/Enter.vue'
import Login from '../views/login/Login.vue'
import Register from '../views/login/Register.vue'
import Notifications from '../views/panel/Notifications.vue'
import PanelInstructions from '../views/panel/PanelInstructions.vue'
import Settings from '../views/panel/Settings.vue'
import Support from '../views/Support.vue'
import Tutor from '../views/TutorProfile.vue'
import Welcome from '../views/Welcome.vue'
import TransactionHistory from '../views/panel/TransactionHistory.vue'
// import e404 from '../views/e404.vue'
import MyAccount from '../views/panel/MyAccount.vue'

const routes = [
    // homepage
    {
        path: '/',
        name: 'Welcome',
        component: Welcome,
        meta: { navbartype: 'welcome' }
    },
    // front pages
    {
        path: '/search',
        name: 'Find',
        component: Welcome,
        meta: { navbartype: 'welcome' }
    },
    {
        path: '/enter/:wayback?',
        name: 'Enter',
        component: Enter,
        meta: { navbartype: 'welcome' }
    },
    {
        path: '/login/:loginOrEmail?',
        name: 'Login',
        component: Login,
        meta: { navbartype: 'welcome' }
    },
    {
        path: '/register/:loginOrEmail?',
        name: 'Register',
        component: Register,
        meta: { navbartype: 'welcome' }
    },
    {
        path: '/tutor/:handle',
        name: 'Tutor',
        component: Tutor,
        meta: { navbartype: 'welcome' }
    },
    {
        path: '/about',
        name: 'About',
        component: About,
        meta: { navbartype: 'welcome' }
    },
    {
        path: '/support',
        name: 'Support',
        component: Support,
        meta: { navbartype: 'welcome' }
    },

    // panel pages
    {
        path: '/panel/',
        name: 'PanelInstructions',
        component: PanelInstructions,
        meta: { navbartype: 'panel' }
    },
    {
        path: '/panel/myaccount',
        name: 'MtAccount',
        component: MyAccount,
        meta: { navbartype: 'panel' }
    },
    {
        path: '/panel/find/:search?',
        name: 'Find',
        component: Find,
        meta: { navbartype: 'panel' }
    },
    {
        path: '/panel/chat/:chatid?/:tutorhandle?',
        name: 'Chats',
        component: Chats,
        meta: { navbartype: 'panel' }
    },
    {
        path: '/panel/notifications',
        name: 'Notifications',
        component: Notifications,
        meta: { navbartype: 'panel' }
    },
    {
        path: '/panel/settings',
        name: 'Settings',
        component: Settings,
        meta: { navbartype: 'panel' }
    },
    {
        path: '/panel/mycalendar',
        name: 'Calendar',
        component: Calendar,
        meta: { navbartype: 'panel' }
    },
    {
        path: '/panel/transactionhistory',
        name: 'TransactionHistory',
        component: TransactionHistory,
        meta: { navbartype: 'panel' }
    },
    {
        path: '/panel/myoffers',
        name: 'MyOffers',
        component: MyOffers,
        meta: { navbartype: 'panel' }
    },
    // error 404
    // {
    //     path: '/:pathMatch(.*)*',
    //     name: 'e404',
    //     component: e404,
    //     meta: { navbartype: 'welcome' }
    // }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
