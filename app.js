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
    html += `<div class="col">
      <div class="card h-100">
        <div>
          <img class="card-img-prod img-fluid" src="${data.productions[i].image}" alt="...">
        </div>
        <div class="card-body">
          <p class="card-text c64-purple">${data.productions[i].title} (${year})</p>
        </div>
      </div>
    </div>`;
  }
  productionsRoot.innerHTML = html;
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
    html += `<div class="col">
      <div class="card h-100">
        <div>
          <img class="card-img-prod img-fluid" src="${data.members[i].avatar}" alt="...">
        </div>
        <div class="card-body">
          <p class="card-text c64-purple">${data.members[i].handle} (${data.members[i].member_status})</p>
        </div>
      </div>
    </div>`;
  }
  membersRoot.innerHTML = html;
})
.catch(err => {
    console.log(err);
});



