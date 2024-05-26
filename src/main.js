//У файлі main.js напиши всю логіку роботи додатка.

import { fetchImages } from './js/pixabay-api.js';
import { clearGallery ,renderImages } from './js/render-functions.js';

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";

const searchForm = document.getElementById('searchForm');
const searchInput = document.getElementById('searchInput');
const loader = document.querySelector('.loader');
const lightbox = new SimpleLightbox('.gallery a');

// Функция для отображения сообщения об ошибке с использованием iziToast
function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
    });
}

// Обработчик события отправки формы
searchForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        showError('Please enter a search term');
        return;
    }
      // Показати індикатор завантаження після натискання кнопки
      loader.classList.add('show');
      clearGallery();

    fetchImages(searchTerm)
        .then(images => {
  // Затримка на 2 секунди перед відображенням результатів
  setTimeout(() => {
    // Приховати індикатор завантаження після завершення запиту
    loader.classList.remove('show');

    if (images.length === 0) {
        showError('Sorry, there are no images matching your search query. Please try again!');
    } else {
        renderImages(images);
        searchInput.value = '';
        lightbox.refresh();   
    }
}, 2000); // 2 секунди затримки
})
        .catch(error => {
               // Приховати індикатор завантаження у випадку помилки
        loader.classList.remove('show');

            console.error('Error fetching images:', error.message);
            showError('Failed to fetch images. Please try again later.');
        });
});

