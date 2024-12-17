'use strict';

import iziToast from 'izitoast';
import searchPhotos from './js/pixabay-api';
import createMarkup from './js/render-functions';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.form');
const list = document.querySelector('.js-list');
const button = document.querySelector('.form button');
const loadBtn = document.querySelector('.load');
let search;
let page = 1;
let lightbox;

form.addEventListener('submit', handleSubmit);
loadBtn.addEventListener('click', handleLoad);

async function handleSubmit(event) {
  loadBtn.classList.remove('visible');
  event.preventDefault();
  page = 1;
  search = event.target.elements.search.value;
  if (!search) {
    return;
  }

  list.innerHTML = '<div class="loader"></div></h1>';

  try {
    const result = await searchPhotos(search, page);
    list.innerHTML = createMarkup(result.hits);
    loadBtn.classList.add('visible');
    initializeLightbox();
  } catch (error) {
    console.log(error);
    list.innerHTML = '<h1>Something went wrong. Please try again.</h1>';
  }

  form.reset();
}

function initializeLightbox() {
  lightbox = new SimpleLightbox('.gallery-item a');
}

list.addEventListener('click', event => {
  event.preventDefault();
  const elem = event.target;
  if (!elem.tagName === 'IMG' || event.currentTarget === elem) {
    return;
  }

  const lightbox = new SimpleLightbox('.gallery-item a');
  lightbox.refresh();
});

async function handleLoad() {
  if (!search) {
    return;
  }

  page++;

  loadBtn.classList.remove('visible');

  if (page > Math.ceil(500 / 15)) {
    iziToast.show({
      message: "We're sorry, but you've reached the end of search results.",
      position: 'bottomRight',
    });
    return;
  }

  list.insertAdjacentHTML('afterend', '<div class="loader"></div>');

  const loader = document.querySelector('.loader');
  const card = document.querySelector('.gallery-item');

  try {
    const result = await searchPhotos(search, page);
    list.insertAdjacentHTML('beforeend', createMarkup(result.hits));
    loadBtn.classList.add('visible');
    loader.remove();
    const cardHeight = card.getBoundingClientRect().height;
    window.scrollBy({
      top: 2 * cardHeight,
      left: 0,
      behavior: 'smooth',
    });
    lightbox.refresh();
  } catch (error) {
    console.log(error);
    list.innerHTML = '<h1>Something went wrong. Please try again.</h1>';
  }
}
