import { adjustImagePath, getData} from '../main.js';

export default function graphics() {
  getData('/data/graphics.json')
  .then(data => {

    const graphicsRoot = document.getElementById('graphics-container');
    let html = '';
    
    for (let i in data.graphics) {
      const image = adjustImagePath(data.graphics[i].image || "placeholder.webp", "card");
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
  });}