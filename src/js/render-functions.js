// Функція для очищення галереї
export function clearGallery() {
    // Знаходимо елемент галереї на сторінці
    const galleryContainer = document.querySelector('.gallery');
    // Очищуємо вміст галереї
    galleryContainer.innerHTML = '';
}

// Функція для відображення зображень в галереї
export function renderImages(images) {
    // Знаходимо елемент галереї
    const galleryContainer = document.querySelector('.gallery');

    const imagesHtml = images.map(image => `
        <a href="${image.largeImageURL}" data-lightbox="gallery">
            <div class="card">
                <img src="${image.webformatURL}" alt="${image.tags}">
                <div class="card-details">
                    <p>Likes: ${image.likes}</p>
                    <p>Views: ${image.views}</p>
                    <p>Comments: ${image.comments}</p>
                    <p>Downloads: ${image.downloads}</p>
                </div>
            </div>
        </a>
    `).join('');

    galleryContainer.insertAdjacentHTML('beforeend', imagesHtml);
}
