// vite.config.js / vite.config.ts
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',          // Home page
        members: 'members.html',         // About page
      }
    }
  },
  plugins: [
    viteStaticCopy({
      targets: [
        {
          src: 'cms/data',
          dest: '.'
        },
        {
          src: 'cms/images',
          dest: '.'
        }
      ]
    })
  ]
}

