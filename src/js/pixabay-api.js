//У файлі pixabay-api.js зберігай функції для HTTP-запитів
//мой ключь
const apiKey = '43983774-8711aa48aacb0ae1050be5e44';

export function fetchImages(searchQuery) {
    const url = `https://pixabay.com/api/?key=${apiKey}&q=${searchQuery}&image_type=photo&orientation=horizontal&safesearch=true`


    //шлях до даних на бекенд
 return fetch(url)
 .then(response => {
   if (!response.ok) {
       throw new Error(response.status);
     }
     return response.json();
 })
 .then(data => {
    //.hits єто название масива на сервере 
    return data.hits;
 })
 .catch(error => {
    console.error('Error fetching images:', error.message);
    throw error;
 });
}




