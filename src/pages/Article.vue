<script setup lang="ts">
import {onBeforeUnmount, onMounted, ref, watch, watchEffect} from "vue";
import {useRouter} from "vue-router";
import axios from "../ts/axios.ts";
import {PATHS} from "../ts/constants.ts";
const router = useRouter()

class Comment {
    "author": string
    "content": string
    "avatar": string
    "time": number
    "id": number
    "likes": number
}

class ArticleDetail {
    title: string
    body: string
    comments: Comment[]
}

const details = ref<ArticleDetail>({
    title: "",
    body: "",
    comments: [],
})

const articleId = ref("0")
const isLoading = ref(true)
watch(() => router.currentRoute.value.params["id"], (newValue, _) => {
    // 参数变化时执行的逻辑
    articleId.value = newValue.toString()
    isLoading.value = true
    initComponent()
});
watchEffect(() => {
    document.title = `${details.value.title} - 知乎日报阅读器`;
});
onBeforeUnmount(() => {
    router.beforeEach((to, from, next) => {
        next();
    });
});
const initComponent = async () => {
    let id = router.currentRoute.value.params["id"].toString()
    if (id == undefined) id = '0'
    axios.get(`news/${id}`)
        .then((resp) => {
            details.value.title = resp['title']
            details.value.body = resp['body']
        })
        .catch((_) => {
            details.value.title = "标题读取错误"
            details.value.body = "读取错误"
        })

    axios.get(`story/${id}/short-comments`)
        .then((resp) => {
            details.value.comments =
                resp['comments']
        })

    /*router.currentRoute.value.meta["title"] = `${details.value.title} - 知乎日报阅读器`*/
    
    isLoading.value = false
}
initComponent()
</script>

<template>
    <div>
        <div class="p-2" v-if="!isLoading">
            <h2 class="text-4xl font-extrabold dark:text-white">
                {{ details.title }}
            </h2>
            <div class="my-4 text-lg text-gray-500"
                 v-html="details.body">
            </div>
            <div class="border-2" v-if="details.comments.length">
                <h2 class="p-5 text-2xl">评论（{{ details.comments.length }}）</h2>
                <ul class="divide-y divide-slate-100">
                    <li class="flex items-start gap-4 px-4 py-3"
                        v-for="(item) in details.comments">
                        <div class="flex items-center shrink-0">
                            <img :src="item.avatar"
                                 :alt="item.author"
                                 class="w-16 rounded">
                        </div>
                        <div class="flex flex-col gap-0 min-h-[2rem] items-start justify-center w-full min-w-0">
                            <h4 class="text-base text-slate-700 ">
                                {{ item.author }}
                            </h4>
                            <p class="w-full text-sm text-slate-500">
                                {{ item.content }}
                            </p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="p-2" v-else>
            加载中...
        </div>
    </div>
</template>

<style scoped>

</style>