import { adjustImagePath, getData} from '../main.js';
import TrsiCard from '../components/trsi-card';

export default function productions() {
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
}