<template>
    <div>
        <v-footer height="auto" color="primary lighten-1">
            <v-layout justify-center row wrap>
                <v-btn
                    v-for="link in links"
                    :key="link.name"
                    color="white"
                    flat
                    round
                    :to="link.link"
                >
                    {{ link.name }}
                </v-btn>
                <v-flex
                    primary
                    lighten-2
                    py-3
                    text-xs-center
                    white--text
                    xs12
                >
                &copy;{{ year }} — <strong><a target="_blank" href="https://github.com/Emanjo/">Emanjo</a></strong>
                </v-flex>
            </v-layout>
        </v-footer>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                year: new Date().getFullYear(),
                links: [
                    {
                        name: 'Dashboard',
                        link: '/'
                    },
                    {
                        name: 'New Receipt',
                        link: '/new-receipt'
                    },
                ]
            }
        },
    }
</script>

<style scoped>

a {
    color: inherit;
    text-decoration: none;
}

a:hover {
    color: #488fef;
}
</style>