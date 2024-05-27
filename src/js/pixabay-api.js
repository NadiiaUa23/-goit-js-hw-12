import axios from 'axios';
// Ваш ключ API
const apiKey = '43983774-8711aa48aacb0ae1050be5e44';

export async function fetchImages(searchQuery, page = 1, perPage = 15) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=${perPage}`;

    try {
        const response = await axios.get(url);
        return response.data.hits;
    } catch (error) {
        console.error('Error fetching images:', error.message);
        throw error;
    }
}