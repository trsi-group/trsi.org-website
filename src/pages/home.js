import { adjustImagePath, getData} from '../main.js';
import TrsiCard from '../components/trsi-card';

export default function home() {
    getData('/data/productions.json')
    .then(data => {
      const productionsRoot = document.getElementById('productions-container');
      let html = '';
      
      console.log(data);
      for (let i in data.productions) {
        const image = adjustImagePath(data.productions[i].image || "placeholder.webp", "card");
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
  
    getData('/data/graphics.json')
    .then(data => {
      const graphicsRoot = document.getElementById('graphics-container');
      let html = '';
      
      console.log(data);
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
    });
  
    getData('/data/members.json')
    .then(data => {
      const membersRoot = document.getElementById('members-container');
      let html = '';
      
      console.log(data);
      for (let i in data.members) {
        const image = adjustImagePath(data.members[i].avatar || "placeholder.webp", "card");
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
  }