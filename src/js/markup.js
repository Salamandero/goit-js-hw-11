import {refs} from './refs';


const createMarkup = (data) => data.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) =>   {
      return `<div class="photo-card">
            <a class="link" href="${largeImageURL}"> 
              <img class="img-card" src="${webformatURL}" alt="${tags}" loading="lazy" />
            </a>
              <div class="info">
                <p class="info-item">
                  <b>Likes</b>${likes}
                </p>
                <p class="info-item">
                  <b>Views</b>${views}
                </p>
                <p class="info-item">
                  <b>Comments</b>${comments}
                </p>
                <p class="info-item">
                  <b>Downloads</b>${downloads}
                </p>
              </div>
            
          </div>`}).join('');

    function addMarkup(data){
      refs.galleryEl.insertAdjacentHTML("beforeend", createMarkup(data));
    }

    export {addMarkup}
     