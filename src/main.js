import Header from './components/header';
import TrsiCard from './components/trsi-card';

const trsi = {
  utils: {},
  components: {},
  pages: {},
  init() {
      console.log("Initializing site...");
      this.utils.registerEventListeners();
      this.components.initializeAll();
      this.pages.initCurrentPage();
  }
};

trsi.utils = {
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
  }
};

trsi.components = {
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
};

trsi.pages = {
  initCurrentPage() {
      const bodyClass = document.body.dataset.page;
      if (this[bodyClass]) this[bodyClass]();
  },
  home() {
    document.getElementById('header').innerHTML = Header();

    this.getData('/data/productions.json')
    .then(data => {
      const productionsRoot = document.getElementById('productions-container');
      let html = '';
      
      console.log(data);
      for (let i in data.productions) {
        const image = this.adjustImagePath(data.productions[i].image || "placeholder.webp", "card");
        html += TrsiCard(
          data.productions[i].title,
          data.productions[i].description,
          image,
          data.productions[i].type,
          data.productions[i].youtube,
          data.productions[i].download,
        );
      }
      productionsRoot.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
    });
  
    this.getData('/data/graphics.json')
    .then(data => {
      const graphicsRoot = document.getElementById('graphics-container');
      let html = '';
      
      console.log(data);
      for (let i in data.graphics) {
        const image = this.adjustImagePath(data.graphics[i].image || "placeholder.webp", "card");
        html += `<div class="col">
          <div class="card h-100 border-0 bg-secondary">
            <div class="d-flex h-100 align-items-center bg-black">
              <img class="card-img-top img-fluid rounded-0" src="${image}" alt="...">
            </div>
            <div class="card-body">
              <p class="card-text c64-yellow">${data.graphics[i].title}</p>
            </div>
          </div>
        </div>`;
      }
      graphicsRoot.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
    });
  
    this.getData('/data/members.json')
    .then(data => {
      const membersRoot = document.getElementById('members-container');
      let html = '';
      
      console.log(data);
      for (let i in data.members) {
        const image = this.adjustImagePath(data.members[i].avatar || "placeholder.webp", "card");
        html += `<div class="col">
          <div class="card h-100 border-0 bg-secondary">
            <div class="d-flex h-100 align-items-center bg-black">
              <img class="card-img-top img-fluid rounded-0" src="${image}" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-text c64-yellow d-inline">${data.members[i].handle}</h5><span class="card-text c64-light-gray"> (${data.members[i].member_status})</span>
            </div>
          </div>
        </div>`;
      }
      membersRoot.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
    });
  },
  graphics() {
    document.getElementById('header').innerHTML = Header();

    this.getData('/data/graphics.json')
    .then(data => {

      const graphicsRoot = document.getElementById('graphics-container');
      let html = '';
      
      console.log(data);
      for (let i in data.graphics) {
        const image = this.adjustImagePath(data.graphics[i].image || "placeholder.webp", "card");
        html += `<div class="col">
          <div class="card h-100 border-0 bg-secondary">
            <div class="d-flex h-100 align-items-center bg-black">
              <img class="card-img-top img-fluid rounded-0" src="${image}" alt="...">
            </div>
            <div class="card-body">
              <p class="card-text c64-yellow">${data.graphics[i].title}</p>
            </div>
          </div>
        </div>`;
      }
      graphicsRoot.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
    });
  },
  members() {
    document.getElementById('header').innerHTML = Header();

    this.getData('/data/members.json')
    .then(data => {

      const membersRoot = document.getElementById('members-container');
      let html = '';
      
      console.log(data);
      for (let i in data.members) {
        const image = this.adjustImagePath(data.members[i].avatar || "placeholder.webp", "card");
        html += `<div class="col">
          <div class="card h-100 border-0 bg-secondary">
            <div class="d-flex h-100 align-items-center bg-black">
              <img class="card-img-top img-fluid rounded-0" src="${image}" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-text c64-yellow d-inline">${data.members[i].handle}</h5><span class="card-text c64-light-gray"> (${data.members[i].member_status})</span>
            </div>
          </div>
        </div>`;
      }
      membersRoot.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
    });
  },
  music() {
    document.getElementById('header').innerHTML = Header();
    
    this.getData('/data/music.json')
    .then(data => {

      const musicRoot = document.getElementById('music-container');
      let html = '';
      
      console.log(data);
      for (let i in data.music) {
        const image = this.adjustImagePath(data.music[i].avatar || "placeholder.webp", "card");
        html += `<div class="col">
          <div class="card h-100 border-0 bg-secondary">
            <div class="d-flex h-100 align-items-center bg-black">
              <img class="card-img-top img-fluid rounded-0" src="${image}" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-text c64-yellow d-inline">${data.music[i].handle}</h5><span class="card-text c64-light-gray"> (${data.members[i].member_status})</span>
            </div>
          </div>
        </div>`;
      }
      musicRoot.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
    });
  },
  productions() {
    document.getElementById('header').innerHTML = Header();

    this.getData('/data/productions.json')
    .then(data => {
      const productionsRoot = document.getElementById('productions-container');
      let html = '';
      
      console.log(data);
      for (let i in data.productions) {
        const image = this.adjustImagePath(data.productions[i].image || "placeholder.webp", "card");
        html += TrsiCard(
          data.productions[i].title,
          data.productions[i].description,
          image,
          data.productions[i].type,
          data.productions[i].youtube,
          data.productions[i].download,
        );
      }
      productionsRoot.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
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
  }

};

document.addEventListener("DOMContentLoaded", () => {
  trsi.init();
});
