export default function TrsiCard(title, description, image, type, youtube, download) {
  return `
  <div class="col">
    <div class="card h-100 border-0 bg-secondary">
      <div class="d-flex h-100 align-items-center bg-black">
        <img class="card-img-top img-fluid rounded-0" src="${image}" alt="...">
      </div>
      <div class="card-body">
        <p class="card-text c64-white h5">${type}</p>
        <p class="card-text c64-yellow h3">${title}</p>
        ${description ? `<p class="card-text c64-white">${description}</p>` : ""}
        ${download ? `<a class="card-text c64-white" href="${download}">Download</a>` : ""}
        ${youtube ? `, <a class="card-text c64-white" href="${youtube}">YouTube</a>` : ""}
      </div>
    </div>
  </div>
  `;
}