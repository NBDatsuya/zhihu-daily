<script setup lang="ts">
import Banner from "./components/Banner.vue";
import Menu from "./components/Menu.vue";
</script>

<template>
    <div class="min-h-screen">
        <Banner></Banner>
        <div class="grid grid-cols-6 h-full border-2">
            <div class="col-span-2 overflow-auto min-h-screen border-2">
                <Menu/>
            </div>
            <div class="col-span-4 border-2 p-2 h-full">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<style scoped>
</style>
