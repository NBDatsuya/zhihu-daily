<script setup lang="ts">
import {ref} from "vue";
import axios from "../ts/axios.ts"
import {useRouter} from "vue-router";

const router = useRouter()

class Story {
    "image_hue": string
    "title": string
    "url": string
    "hint": string
    "ga_prefix": string
    "type": number
    "id": number
    "images": string[]
}

class TopStory {
    "image_hue": string
    "title": string
    "url": string
    "hint": string
    "ga_prefix": string
    "type": number
    "id": number
    "images": string[]
}

const stories = ref<Story[]>()

const topStories = ref<TopStory[]>()
/*
const current = ref(router.currentRoute.value.matched)*/
const jump = async (id: number) => {
    await router.push(`/article/${id}`)
}
const initComponent = async () => {
    axios.get('news/latest')
        .then((resp) => {
            stories.value = resp['stories']
            topStories.value = resp['top_stories']
        })

}
initComponent()
</script>

<template>
    <div class="flex flex-row min-h-screen h-full">
        <div class="basis-1/3 bg-gray-100">
            <div class="text-sm font-medium text-gray-900 bg-white border border-gray-200 dark:bg-gray-700
    dark:border-gray-600 dark:text-white">
                <a aria-current="true"
                   @click="router.push('/')"
                   class="menu_sel">
                    首页
                </a>
                <a class="menu_unsel">
                    每日推荐
                </a>
                <a class="menu_unsel">
                    主题日报
                </a>
            </div>
        </div>
        <div class="basis-2/3 h-full">
            <ul class="daily_list">
                <li class="daily_item"
                    v-for="item in stories"
                    @click="jump(item.id)">
                    <div class="flex flex-col items-center shrink-0">
                        <img :src="item.images[0]"
                             alt="product image" class="w-16 rounded">
                    </div>
                    <div class="daily_title_panel">
                        <h4 class="daily_title_text">
                            {{ item.title }}
                        </h4>
                    </div>
                </li>
            </ul>
            <ul class="daily_list">
                <li class="daily_item"
                    v-for="item in topStories"
                    @click="jump(item.id)">
                    <div class="daily_image_panel">
                        <img :src="item.image"
                             alt="product image"
                             class="w-16 rounded">
                    </div>
                    <div class="daily_title_panel">
                        <h4 class="daily_title_text">
                            {{ item.title }}
                        </h4>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<style scoped>
@tailwind components;
@layer components {
    .daily_list {
        @apply divide-y divide-slate-100 pl-0
    }

    .daily_item {
        @apply flex items-center gap-4 px-4 py-3 cursor-pointer hover:bg-gray-100
    }
    
    .daily_image_panel{
        @apply flex items-center shrink-0
    }

    .daily_title_panel {
        @apply flex flex-col gap-0 min-h-[2rem]
        h-10 items-center justify-center
        w-full text-wrap overflow-ellipsis whitespace-nowrap
    }

    .daily_title_text {
        @apply text-base text-slate-700 text-ellipsis
    }

    .menu_sel {
        @apply block w-full px-4 py-2 text-white bg-blue-700 border-b border-gray-200
        cursor-pointer dark:bg-gray-800 dark:border-gray-600
    }

    .menu_unsel {
        @apply block w-full px-4 py-2 border-b border-gray-200 cursor-pointer
        hover:bg-gray-100 hover:text-blue-700 focus:outline-none focus:ring-2
        focus:ring-blue-700 focus:text-blue-700 dark:border-gray-600 dark:hover:bg-gray-600
        dark:hover:text-white dark:focus:ring-gray-500 dark:focus:text-white
    }
}
</style>