import { adjustImagePath, getData} from '../main.js';

export default function productions() {
  getData('/data/members.json')
  .then(data => {

    const membersRoot = document.getElementById('members-container');
    let html = '';
    
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