import axios from 'axios';
import { fetchImages } from './js/pixabay-api.js';
import { clearGallery, renderImages } from './js/render-functions.js';

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
const gallery = document.querySelector('.gallery');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const lightbox = new SimpleLightbox('.gallery a');

let searchTerm = '';
let page = 1;

// Функція для відображення повідомлення про помилку з використанням iziToast
function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
    });
}

// Функція плавного прокручування
function smoothScrollOnLoadMore() {
    const lastPhoto = document.querySelector('.gallery a:last-child');
    const photosHeight = lastPhoto.getBoundingClientRect().height;
    const twoPhotosHeight = photosHeight * 2;
  
    window.scrollBy({
      top: twoPhotosHeight,
      left: 0,
      behavior: 'smooth',
    });
  }

// Функція для завантаження наступної сторінки зображень
async function loadMoreImages() {
    loader.classList.add('show'); 
    page++;
    try {
        const images = await fetchImages(searchTerm, page);
        if (images.length === 0) {
            loadMoreBtn.classList.add('hidden'); // Ховаємо кнопку "Load more"
            showError("We're sorry, but you've reached the end of search results."); // Виводимо повідомлення
        } else {
            renderImages(images);
            lightbox.refresh();
        // Виклик функції плавного прокручування
      smoothScrollOnLoadMore();
        } 
    } catch (error) {
        console.error('Error fetching images:', error.message);
        showError('Failed to fetch more images. Please try again later.');
    }
    finally {
        loader.classList.remove('show'); // Приховання індикатора завантаження після завантаження зображень
    }
}

// Функція для обробки пошукового запиту
async function onSearch(event) {
    event.preventDefault();

    searchTerm = searchInput.value.trim();
    if (!searchTerm) {
    showError('Please enter a search term');
    return;
    }
    // Показати індикатор завантаження після натискання кнопки
    loader.classList.add('show');
    clearGallery();

    try {
      page = 1; // Скидаємо значення сторінки до початкового при новому пошуковому запиті
    const images = await fetchImages(searchTerm, page);
if (images.length === 0) {
        showError('We`re sorry, but you`ve reached the end of search results.');
        loadMoreBtn.classList.add('hidden');
} else {
        renderImages(images);
        searchInput.value = '';
        lightbox.refresh();
        // Показуємо кнопку "Load more" після отримання результатів пошуку
        loadMoreBtn.classList.remove('hidden');
}
    } catch (error) {
    console.error('Error fetching images:', error.message);
    showError('Failed to fetch images. Please try again later.');
    } finally {
      loader.classList.remove('show'); // Приховання індикатора завантаження після завершення запиту
    }
 }

  // Обробник події натискання на кнопку "Load more"
loadMoreBtn.addEventListener('click', loadMoreImages);

  // Обробник події відправки форми
 searchForm.addEventListener('submit', onSearch);