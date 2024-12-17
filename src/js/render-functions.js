'use strict';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

export default function createMarkup(arr) {
  if (!arr.length) {
    iziToast.error({
      message:
        'Sorry, there are no images matching your search query. Please try again!',
      position: 'bottomRight',
    });
    return '';
  }
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) =>
        `<li class = "gallery-item"><a class = "gallery-link" href = "${largeImageURL}"><img class = "gallery-image" src=${webformatURL} alt="${tags}"></a>
            <div class="social-activity">
            <ul class="social-activity-list">
            <li class="social-activity-list-item">Likes <span class="number">${likes}</span></li>
            <li class="social-activity-list-item">Views <span class="number"> ${views}</span></li>
            <li class="social-activity-list-item">Comments <span class="number"> ${comments}</span></li>
            <li class="social-activity-list-item">Downloads <span class="number">${downloads}</span></li>
            </ul>
            </div>
          </li>`
    )
    .join('');
}
