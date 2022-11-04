import { Notify } from 'notiflix/build/notiflix-notify-aio';

const BASE_URL = "https://restcountries.com/v3.1/name/";
export default function fetchCountries(name) {
  return fetch(
    `${BASE_URL}${name}?fields=name,name.official,capital,population,flags,languages`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
      return response.json();
    })
}
