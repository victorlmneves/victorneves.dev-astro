import { defineConfig } from 'astro/config'
import vue from '@astrojs/vue'
import { fileURLToPath, URL } from 'url'

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      }
    },
    // css: {
    //   preprocessorOptions: {
    //     scss: {
    //       additionalData(source, fp) {
    //         if (fp.endsWith('variables.scss')) {
    //           return source
    //         }
    //         return `
    //           @import '@/assets/scss/_variables.scss'; ${source};
    //           @import "@/assets/scss/_mixins.scss"; ${source};
    //         `
    //       }
    //     }
    //   }
    // }
  },
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: (tag) => {
            // console.log("🚀 ~ file: vite.config.ts ~ line 11 ~ tag", tag)
            return tag.startsWith('Work') // (return true)
          }
        }
      }
    })
  ]
})
