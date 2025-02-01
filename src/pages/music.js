import { getData} from '../main.js';

export default function music() {
  getData('/data/music.json')
  .then(data => {

    const musicRoot = document.getElementById('music-container');
    let html = '';
    
    console.log(data);
    for (let i in data.music) {
      html += `<div class="col">
        <div class="card h-100 border-0 bg-secondary">
          <div class="d-flex h-100 align-items-center bg-black">
            <img class="card-img-top rounded-0" src="sound-waves.svg" width="200" height="200" alt="...">
          </div>
          <div class="card-body">
            <p class="card-text c64-white h5">${data.music[i].type}</p>
            <h3 class="card-text c64-yellow">${data.music[i].title}</h3>
            ${data.music[i].description ? `<p class="card-text c64-white">${data.music[i].description}</p>` : ""}
            ${data.music[i].download_url ? `<a class="card-text c64-white" href="${data.music[i].download_url}">Download</a>` : ""}
            ${data.music[i].demozoo_url ? `, <a class="card-text c64-white" href="${data.music[i].demozoo_url}">Demozoo</a>` : ""}
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