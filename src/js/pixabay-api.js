//У файлі pixabay-api.js зберігай функції для HTTP-запитів

import axios from 'axios';

//мой ключь
const apiKey = '43983774-8711aa48aacb0ae1050be5e44';

export async function fetchImages(searchQuery) {
 const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`

try {
   const response = aweit axios.get(url);
   return response.data.hits;
} catch (error) {
console.log('Error fetching images:', error.message);
throw.error;
}
}