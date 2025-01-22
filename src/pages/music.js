import { adjustImagePath, getData} from '../main.js';

export default function productions() {
  getData('/data/music.json')
  .then(data => {

    const musicRoot = document.getElementById('music-container');
    let html = '';
    
    console.log(data);
    for (let i in data.music) {
      const image = adjustImagePath(data.music[i].avatar || "placeholder.webp", "card");
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
}