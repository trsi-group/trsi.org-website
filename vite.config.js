// vite.config.js / vite.config.ts
import { viteStaticCopy } from 'vite-plugin-static-copy'

export default {
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        productions: 'productions.html',
        music: 'music.html',
        graphics: 'graphics.html',
        members: 'members.html',
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

