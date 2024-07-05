<template>
    <div class="panel">
        <h1>Error 404</h1>
        <div class="content">
            <router-link class="link" to="/">Go to Home</router-link>
            <h2>Looks like you got lost</h2>
            Sorry, we can't find the page you're looking for.<br>
            Try going back to the previous page or head to our home page.<br>
            Error: 404
        </div>
    </div>

</template>

<script>

export default {
    name: 'Error_404',
    components: {
    },
}
</script>