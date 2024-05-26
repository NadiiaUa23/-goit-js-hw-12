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

// Зберігаємо значення поточної сторінки та пошукового запиту
let currentPage = 1;
let currentSearchTerm = '';

// Функція для відображення повідомлення про помилку з використанням iziToast
function showError(message) {
    iziToast.error({
        title: 'Error',
        message: message,
        position: 'topRight',
    });
}

// Функція для відображення індикатора завантаження
function showLoader() {
    loader.classList.add('show');
}

// Функція для приховування індикатора завантаження
function hideLoader() {
    loader.classList.remove('show');
}

// Функція для виконання запиту за додатковими зображеннями
async function loadMoreImages() {
    try {
        showLoader();
        currentPage++; // Збільшуємо номер сторінки для отримання наступної групи зображень
        const images = await fetchImages(currentSearchTerm, currentPage);
        hideLoader();
        renderImages(images);
        lightbox.refresh();
    } catch (error) {
        hideLoader();
        console.error('Error fetching images:', error.message);
        showError('Failed to fetch more images. Please try again later.');
    }
}

// Обробник події кліку на кнопку "Load more"
loadMoreBtn.addEventListener('click', loadMoreImages);

// Обробник події відправки форми
searchForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
        showError('Please enter a search term');
        return;
    }
    
    // Очищаємо галерею та скидаємо поточну сторінку при новому пошуковому запиті
    currentPage = 1;
    currentSearchTerm = searchTerm;
    clearGallery();

    try {
        showLoader();
        const images = await fetchImages(searchTerm, currentPage);
        hideLoader();
        renderImages(images);
        lightbox.refresh();
        // Показуємо кнопку "Load more" після отримання результатів запиту
        loadMoreBtn.style.display = 'block';
    } catch (error) {
        hideLoader();
        console.error('Error fetching images:', error.message);
        showError('Failed to fetch images. Please try again later.');
    }
});

