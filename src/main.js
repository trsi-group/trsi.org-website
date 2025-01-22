import Header from './components/header';
import Footer from './components/footer';
import Home from './pages/home';
import Productions from './pages/productions';
import Graphics from './pages/graphics';
import Music from './pages/music';
import Members from './pages/members';

const trsi = {
  utils: {},
  components: {},
  pages: {},
  init() {
      console.log("Initializing site...");
      this.utils.registerEventListeners();
      this.components.initializeAll();
      this.pages.initCurrentPage();
  },

  utils: {
    select(selector, context = document) {
        return context.querySelector(selector);
    },
    selectAll(selector, context = document) {
        return Array.from(context.querySelectorAll(selector));
    },
    on(event, selector, callback) {
        document.addEventListener(event, function(e) {
            if (e.target.matches(selector)) callback(e);
        });
    },
    registerEventListeners() {
        console.log("Registering event listeners...");
        this.on("click", ".btn", (e) => {
            console.log("Button clicked!", e.target);
        });
    },
    adjustImagePath(imagePath, newDir) {
      const parts = imagePath.split('/');
      return [...parts.slice(0, -1), newDir, parts.at(-1)].join('/');
    },
    async getData(resource) {
      const response = await fetch(resource);
      if (response.status !== 200) {
        throw new Error('could load data');
      }
      const data = await response.json();
      return data;
    },
  },
  components: {
    modal: {
        show() {
            console.log("Modal opened");
        },
        hide() {
            console.log("Modal closed");
        }
    },
    initializeAll() {
        console.log("Initializing components...");
        // Initialize modal or other components here
    }
  },

  pages: {
    initCurrentPage() {
        const bodyClass = document.body.dataset.page;
        if (this[bodyClass]) this[bodyClass]();
    },
    home() {
      document.getElementById('header').innerHTML = Header();
      Home();
      document.getElementById('footer').innerHTML = Footer();
    },
    graphics() {
      document.getElementById('header').innerHTML = Header();
      Graphics();
      document.getElementById('footer').innerHTML = Footer();
    },
    members() {
      document.getElementById('header').innerHTML = Header();
      Members();
      document.getElementById('footer').innerHTML = Footer();
    },
    music() {
      document.getElementById('header').innerHTML = Header();
      Music();    
      document.getElementById('footer').innerHTML = Footer();
    },
    productions() {
      document.getElementById('header').innerHTML = Header();
      Productions();
      document.getElementById('footer').innerHTML = Footer();
    }
  }
};

export const { getData, adjustImagePath } = trsi.utils;
export const initSite = trsi.init.bind(trsi);

document.addEventListener("DOMContentLoaded", () => {
  initSite();
});
