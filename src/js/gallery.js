// Імпорт потрібних бібліотек
import axios from "axios";
import Notiflix from 'notiflix';

import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Посилання на всі DOM-елементи
const refs = {
    searchInput: document.querySelector('.search-form'),
    input: document.querySelector('.search-input'),
    submitBtn: document.querySelector('.js-submitBtn'),
    gallery: document.querySelector('.gallery'),
}

// Константи для пошуку
const BASE_URL = 'https://pixabay.com/api';
const KEY = '40854865-379b4e91125b45648445462a5';
let searchParam;
const imageParam = 'photo';
const orientationPhoto = 'horizontal';
const searchSafe = 'true';
const resultsNumber = 40; 

// Слухач на кнопці "Шукть"
refs.submitBtn.addEventListener('click', onGetSearchParam)

const simplegallery = new SimpleLightbox('.gallery__item', {
  captionDelay: 250,
  captionsData: 'alt',
  enableKeyboard: true,
});

async function onGetSearchParam(evt) {
  evt.preventDefault();
  const inputValue = refs.input.value;

  try {
    const response = await fetchCollection(inputValue);
    const array = response.hits;
    const markup = Marcup(array);
    refs.gallery.insertAdjacentHTML('beforeend', markup);

    if (!array.length) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
  } catch (error) {
    Notiflix.Notify.failure('Sorry, there was an error fetching images. Please try again.');
  }
}

async function onGetSearchParam(evt) {
    evt.preventDefault();
    const inputValue = refs.input.value;
    console.log(inputValue);
    
    try {
        const response = await fetchCollection(inputValue);
        console.log(response.hits);
        const array = response.hits;
        const markup = Marcup(array);
        // Очистка галереї перед новим вмістом
        refs.gallery.innerHTML = '';
        // Вставка нового контенту
        refs.gallery.insertAdjacentHTML('beforeend', markup);
        gallery.refresh();
        if (!array.length) {
            Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
        }

    } catch (error) {
        Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } 
}


async function fetchCollection(inputValue) {
    const options = {
        params: {
        key: KEY,
        q: inputValue,
        image_type: imageParam,
        orientation: orientationPhoto,
        safesearch: searchSafe,
        per_page: resultsNumber,
        }
    }

    try {
        const response = await axios.get(BASE_URL, options);
        return response.data;
    } catch (error) {
      Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    }
}

async function Marcup(array) {
    let markup = array
    .map(({previewURL, largeImageURL, tags, likes, vievs, comments, downloads}) => {
      console.log(previewURL);
      return `
      <a href="${previewURL}" data-lightbox="gallery">
        <div class="photo-card">
        <img src="${previewURL}" alt="${tags}" loading="lazy" />
    <div class="info">
    <p class="info-item">
      <b>Likes</b>
    </p>
    <p class="info-item">
      <b>Views</b>
    </p>
    <p class="info-item">
      <b>Comments</b>
    </p>
    <p class="info-item">
      <b>Downloads</b>
    </p>
  </div>
</div>
</a>
        `;
    })
   .join('');

   refs.gallery.insertAdjacentHTML('beforeend', markup);
   simplegallery.refresh();
}
