function fetchImages(imageName, page) {
    

    return fetch(`https://pixabay.com/api/?q=${imageName}&page=${page}&key=24819311-d2b7ac0921a0ad572da5f837a&image_type=photo&orientation=horizontal&per_page=12`)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
        });
}

const api = {
    fetchImages,
};
export default api;