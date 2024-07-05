<template>
    <WelcomeMessage/>
    <WelcomeStats/>
    <BestTutors/>
</template>

<script>

import WelcomeMessage from '@/components/Welcome/WelcomeMessage.vue'
import WelcomeStats from '@/components/Welcome/WelcomeStats.vue'
import BestTutors from '@/components/Welcome/BestTutors.vue'

export default {
    name: 'WelcomePage',
    components: {
        WelcomeMessage,
        WelcomeStats,
        BestTutors
    },
    }
</script>