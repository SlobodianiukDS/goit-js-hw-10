import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';
import Notiflix from 'notiflix';
const debounce = require('lodash.debounce');
const q = {
  fra: 'French',
  gsw: 'Swiss German',
  ita: 'Italian',
  roh: 'Romansh',
};

const input = document.querySelector(`#search-box`);
const countriesList = document.querySelector(`.country-list`);
const infoCountryCard = document.querySelector(`.country-info`);
const DEBOUNCE_DELAY = 300;
const MAX_COUNTRIES = 10;

input.addEventListener(`input`, debounce(onSerchCountry, DEBOUNCE_DELAY));

function onSerchCountry(e) {
  resset();
  if (e.target.value != ``) {
    fetchCountries(e.target.value)
      .then(coutries => {
        // console.log(coutries.length);

        if (coutries.length > MAX_COUNTRIES) {
          return Notiflix.Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (coutries.length != 1) {
          createListContries(coutries);
          console.log(`card`);
        } else {
          const lol = coutries[0].languages;
          const { q, w, e, r } = lol;
          // console.log(lol);
          createCardContry(coutries);
        }
      })
      .catch(error => {
        Notiflix.Notify.failure(`Oops, there is no country with that name`);
        // console.log(error);
      });
    return;
  }
}

function createListContries(coutries) {
  const markup = coutries
    .map(elem => {
      return `<li class="item">
        <img class="icon" src="${elem.flags.png}" alt="${elem.name.official}">
  <h2 class="name-country">${elem.name.official}</h2>`;
    })
    .join('');

  countriesList.innerHTML = markup;
}

function createCardContry(coutries) {
  const lang = Object.values(coutries[0].languages).join(`, `);
  // console.log(lang);

  const markup = coutries
    .map(elem => {
      return `<h2 class="name-country_card"><img class="icon" src="${elem.flags.png}" alt="${elem.name.official}"></img>${elem.name.official}</h2>
        <p class="descrition-card"><b>Capital: </b>${elem.capital}</p>
        <p class="descrition-card"><b>Population: </b>${elem.population}</p>
        <p class="descrition-card"><b>Languages: </b>${lang}</p>`;
    })
    .join();

  infoCountryCard.innerHTML = markup;
}

function resset() {
  countriesList.innerHTML = ``;
  infoCountryCard.innerHTML = ``;
}
