import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import Notiflix from 'notiflix';
import createPixabayApiService from './pixaby-api-service';


const formEl = document.querySelector('.search-form');
const searchButtonEl = document.querySelector('.search-button');
const loadMoreButtonEl = document.querySelector('.load-more');
const galleryEl =  document.querySelector('.gallery');

loadMoreBtnAdd(); 

const pixabayApiService = createPixabayApiService();

formEl.addEventListener('submit', onSearch);
loadMoreButtonEl.addEventListener('click', onLoadMore);

const lightbox = new SimpleLightbox('.gallery a', { captions: true, captionType: 'attr', captionsData: 'alt', captionDelay: 250, });

async function onSearch(event) {
    event.preventDefault();
    pixabayApiService.query = event.currentTarget.elements.searchQuery.value;
    if (pixabayApiService.query === '') {
      Notiflix.Notify.info('Please fill in the search field');
      return;
    }
    pixabayApiService.resetPage();
    try {
      const imagesArr = await pixabayApiService.collection();
      console.log(imagesArr);
      if (imagesArr.hits.length === 0) {
        Notiflix.Notify.failure(
          'Sorry, there are no images matching your search query. Please try again.'
        );
      } else if (imagesArr.hits.length > 0) {
        Notiflix.Notify.success(
          `Hooray! We found ${imagesArr.hits.length} images.`
        );
      } 
      clearMarkup();
      renderImages(imagesArr.hits);
      lightbox.refresh();
      loadMoreBtnShow();
      pixabayApiService.incrementPage();
    } catch (error) {
      Notiflix.Report.failure(`${error.message}`);
    }
  }

  async function onLoadMore() {
    try {
      const imagesArr = await pixabayApiService.collection();
      renderImages(imagesArr.hits);
      lightbox.refresh();
      const nextPageImages = imagesArr.hits.length;
      if (nextPageImages < 40) {
        Notiflix.Notify.info(
          "We're sorry, but you've reached the end of search results."
        );
        loadMoreBtnHide();
      }
  
      pixabayApiService.incrementPage();
    } catch (error) {
      Notiflix.Report.failure(`${error.message}`);
    }
  }

function createImageCard({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<div class="photo-card">
    <a href="${largeImageURL}">
    <img class="card-image" src="${webformatURL}" alt="${tags}" loading="lazy"/></a>
    <div class="info">
      <p class="info-item">
        <b>Likes<br /><span class="stats">${likes}</span></b>
      </p>
      <p class="info-item">
        <b>Views<br /><span class="stats">${views}</span></b>
      </p>
      <p class="info-item">
        <b>Comments<br /><span class="stats">${comments}</span></b>
      </p>
      <p class="info-item">
        <b>Downloads<br /><span class="stats">${downloads}</span></b>
      </p>
    </div>
  </div>`;
  }
  
  function generateImagesMarkup(imagesArray) {
    return imagesArray.reduce((acc, image) => acc + createImageCard(image), '');
  }

  function renderImages(imagesArray) {
    const searchResult = generateImagesMarkup(imagesArray);
        galleryEl.insertAdjacentHTML('beforeend', searchResult);
  }

  function clearMarkup() {
    galleryEl.innerHTML = '';
    
  }

  function loadMoreBtnAdd() {
    loadMoreButtonEl.classList.add('hide');
  }

  function loadMoreBtnShow() {
    loadMoreButtonEl.classList.remove('hide');
    loadMoreButtonEl.classList.add('show');
  }

  function loadMoreBtnHide() {
    loadMoreButtonEl.classList.remove('show');
    loadMoreButtonEl.classList.add('hide');
  }