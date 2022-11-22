import { Notify } from 'notiflix/build/notiflix-notify-aio';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import fetchCards from './js/fetch';
import { addMarkup } from './js/markup'
import { refs} from './js/refs'

  // плавная прокрутка страницы
  function smoothScroll(){
    const { height: cardHeight } = document.querySelector(".gallery").firstElementChild.getBoundingClientRect();

    window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
    });
}

  let pageNumber = 1;
  let searchName;
  const lightbox = new SimpleLightbox('.gallery a', { captionsData: "alt", captionDelay: 250 });
  lightbox.refresh();

refs.searchFormEl.addEventListener('submit', onSearchRequest);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onSearchRequest(e){
    e.preventDefault();
    pageNumber = 1;
    refs.galleryEl.innerHTML = '';
    searchName = e.target.searchQuery.value.trim();
    const resultRequest = await fetchCards(searchName, pageNumber);
    if(resultRequest.hits.length === 0){
      refs.loadMoreBtn.classList.add('is-hidden');
      Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      }
      else{
        addMarkup(resultRequest.hits);
        lightbox.refresh();
        Notify.success(`Hooray! We found ${resultRequest.totalHits} images.`)
        // smoothScroll();  -- із середини відображається
        let countPage = Math.ceil(resultRequest.totalHits / 40)
        // console.log(countPage)
        if(resultRequest.totalHits < 40 || pageNumber === countPage ){
          refs.loadMoreBtn.classList.add('is-hidden');
          setTimeout(() =>{Notify.info("We're sorry, but you've reached the end of search results.")}, 3500)
        }else{
          lightbox.refresh();
          refs.loadMoreBtn.classList.remove('is-hidden');
        }
      }
    refs.searchFormEl.reset();
    }

  async function onLoadMore(){
  
    pageNumber += 1;
    const moreResultRequest = await fetchCards(searchName, pageNumber);
    addMarkup(moreResultRequest.hits);
    lightbox.refresh();
    smoothScroll();
    if(moreResultRequest.hits.length < 40){
      refs.loadMoreBtn.classList.add('is-hidden')
      setTimeout(() =>{Notify.info("We're sorry, but you've reached the end of search results.")}, 3500  )
    }
  }