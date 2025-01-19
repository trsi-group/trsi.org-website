import Header from './components/header';

// 1. Namespace pattern to avoid polluting the global scope
const trsi = {
  utils: {},   // Utility functions
  components: {},   // UI Components
  pages: {},  // Page-specific logic
  init() {
      console.log("Initializing site...");
      this.utils.registerEventListeners();
      this.components.initializeAll();
      this.pages.initCurrentPage();
  }
};

// 2. Utility Functions
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

// 3. Components
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

// 4. Page-Specific Logic
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
        const year = data.productions[i].release_date.split("-")[0];
        const image = this.adjustImagePath(data.productions[i].image || "placeholder.webp", "card");
        html += `<div class="col">
          <div class="card h-100 border-0 bg-secondary">
            <div class="d-flex h-100 align-items-center bg-black">
              <img class="card-img-top img-fluid rounded-0" src="${image}" alt="...">
            </div>
            <div class="card-body">
              <h5 class="card-text c64-yellow">${data.productions[i].title} (${year})</h5>
              <p class="card-text c64-white">${data.productions[i].description}</p>
            </div>
          </div>
        </div>`;
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
  members() {
    this.getData('/data/members.json')
    .then(data => {
      document.getElementById('header').innerHTML = Header();

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

// 5. DOMContentLoaded: Main Entry Point
document.addEventListener("DOMContentLoaded", () => {
  trsi.init();
});
