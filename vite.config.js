// vite.config.js / vite.config.ts
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',          // Home page
        productions: 'productions.html',         // About page
        music: 'music.html',         // About page
        graphics: 'graphics.html',         // About page
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

