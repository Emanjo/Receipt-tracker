<template>
    <div>
        <v-toolbar app>
        <v-toolbar-title class="headline text-uppercase">
            <span class="font-weight-light">Receipt tracker</span>
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn v-for="link in links" :key="link.name" :to="link.link">
            <v-icon left>{{ link.icon }}</v-icon> {{link.name}}
        </v-btn>
        </v-toolbar>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                links: [
                    {
                        name: 'Dashboard',
                        link: '/',
                        icon: 'dashboard'
                    },
                    {
                        name: 'New Receipt',
                        link: '/new-receipt',
                        icon: 'receipt'
                    },
                ]
            }
        },
        
    }
</script>

<style scoped>

</style>