import { Notify } from 'notiflix/build/notiflix-notify-aio';

import fetchCards from './js/fetch';
import { addMarkup } from './js/markup'
// import {createMarkup} from './js/markup'

const refs = {
  galleryEl: document.querySelector('.gallery'),
  searchFormEl: document.querySelector('#search-form'),
  inputEl: document.querySelector('input[name="searchQuery"]'),
  
  }


  let pageNumber = 1;

refs.searchFormEl.addEventListener('submit', onSearchRequest)

async function onSearchRequest(e){
    e.preventDefault();
    pageNumber = 1;
    refs.galleryEl.innerHTML = '';
    const searchName = e.target.searchQuery.value.trim();
    const resultRequest = await fetchCards(searchName, pageNumber);
    if(resultRequest.hits.length === 0){
      Notify.failure('Sorry, there are no images matching your search query. Please try again.')
      }
      else{
        await addMarkup(resultRequest.hits);
        Notify.success(`Hooray! We found ${resultRequest.totalHits} images.`)
      }
  console.log(searchName);
    console.log(resultRequest);
    }