import { adjustImagePath, getData} from '../main.js';
import TrsiCard from '../components/trsi-card';

export default function home() {
    getData('/data/productions.json')
    .then(data => {
      const latestProductionsRoot = document.getElementById('latest-productions-container');
      let html = '';
      
      const sortedProductions = data.productions.sort((a, b) => {
        return new Date(b.release_date) - new Date(a.release_date);
      });

      console.log(sortedProductions);
      sortedProductions.slice(0, 3).forEach((production) => {
        const image = adjustImagePath(production.image || "placeholder.webp", "card");
        html += TrsiCard(
          production.title,
          production.description,
          image,
          production.type,
          production.youtube,
          production.download,
        );
      });
      latestProductionsRoot.innerHTML = html;

      const featuredProductionsRoot = document.getElementById('featured-productions-container');
      html = '';
      for (let i in data.productions) {
        if (data.productions[i].tags.includes('featured')) {
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
      }
      featuredProductionsRoot.innerHTML = html;
    })
    .catch(err => {
        console.log(err);
    });
  }