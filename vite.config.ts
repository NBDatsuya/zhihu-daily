import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    server: {
        proxy: {
            '/mainApi': {
                target: " https://news-at.zhihu.com/api/4/",
                changeOrigin: true,
                cookiePathRewrite: {
                    '^/mainApi': ''
                },
                secure: false,
                rewrite: path => path.replace(/^\/mainApi/, '')
            },
            '/imgApi': {
                target: " https://pic4.zhimg.com/",
                changeOrigin: true,
                cookiePathRewrite: {
                    '^/imgApi': ''
                },
                secure: false,
                rewrite: path => path.replace(/^\/imgApi/, '')
            }
        }
    }
})
