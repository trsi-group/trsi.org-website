// function getData(resource) {
//   return new Promise((resolve, reject) => {
//     const request = new XMLHttpRequest();
    
//     request.addEventListener('readystatechange', () => {
//       if (request.readyState === 4 && request.status === 200){
//         console.log("productions loaded");
//         const data = JSON.parse(request.responseText);
//         resolve(data);
//       }
//       else if (request.readyState === 4) {
//         const err = 'error getting resource!';
//         reject(err);
//       }
//     });

//     request.open('GET', resource);
//     request.send();
//   })
// }

// Helper to adjust image path for generated sizes
function adjustImagePath(imagePath, newDir) {
  const parts = imagePath.split('/');
  return [...parts.slice(0, -1), newDir, parts.at(-1)].join('/');
}

const getData = async (resource) => {
  const response = await fetch(resource);
  if (response.status !== 200) {
    throw new Error('could load data');
  }
  const data = await response.json();
  return data;
}

getData('/cms/data/productions.json')
.then(data => {
  const productionsRoot = document.getElementById('productions-container');
  let html = '';
  
  console.log(data);
  for (let i in data.productions) {
    const year = data.productions[i].release_date.split("-")[0];
    const image = adjustImagePath(data.productions[i].image || "placeholder.webp", "card");
    html += `<div class="col">
      <div class="card h-100 border-0 bg-secondary">
        <div class="d-flex h-100 align-items-center">
          <img class="card-img-top img-fluid" src="${image}" alt="...">
        </div>
        <div class="card-body">
          <h5 class="card-text c64-yellow">${data.productions[i].title} (${year})</h5>
          <p class="card-text c64-yellow">${data.productions[i].description}</p>
        </div>
      </div>
    </div>`;
  }
  productionsRoot.innerHTML = html;
})
.catch(err => {
    console.log(err);
});

getData('/cms/data/graphics.json')
.then(data => {
  const graphicsRoot = document.getElementById('graphics-container');
  let html = '';
  
  console.log(data);
  for (let i in data.graphics) {
    const image = adjustImagePath(data.graphics[i].image || "placeholder.webp", "card");
    html += `<div class="col">
      <div class="card h-100 border-0 bg-secondary">
        <div>
          <img class="card-img-top img-fluid" src="${image}" alt="...">
        </div>
        <div class="card-body">
          <p class="card-text c64-yellow">${data.graphics[i].title})</p>
        </div>
      </div>
    </div>`;
  }
  graphicsRoot.innerHTML = html;
})
.catch(err => {
    console.log(err);
});

getData('/cms/data/members.json')
.then(data => {
  const membersRoot = document.getElementById('members-container');
  let html = '';
  
  console.log(data);
  for (let i in data.members) {
    const image = adjustImagePath(data.members[i].avatar || "placeholder.webp", "card");
    html += `<div class="col">
      <div class="card h-100 border-0 bg-secondary">
        <div>
          <img class="card-img-top img-fluid" src="${image}" alt="...">
        </div>
        <div class="card-body">
          <p class="card-text c64-yellow">${data.members[i].handle} (${data.members[i].member_status})</p>
        </div>
      </div>
    </div>`;
  }
  membersRoot.innerHTML = html;
})
.catch(err => {
    console.log(err);
});



