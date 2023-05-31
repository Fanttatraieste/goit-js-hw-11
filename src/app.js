const notiflix = require('notiflix'); 
//const simpleLightbox = require('Simplelightbox');
const searchBar = document.querySelector('.search-bar');
const searchBtn = document.querySelector('.search-button');
const container = document.querySelector('.images-container');
let word;
let page = 1;

searchBar.addEventListener('input', () => {
    word = searchBar.value; 
});

searchBtn.addEventListener('click', () => {
    fetchUsers(word, page)
        .then(users => {
        if(users.hits.length == 0)
            notiflix.Report.failure('Sorry, there are no images matching your search query. Please try again.');
        else {
            console.log(users);
            buildImages(users.hits);
        }
        })
        .catch(e => console.log(e));
});

const fetchUsers = async (word, page) => {
    const myKey = "36919577-7ad47e31187d43bcd77a6384d";
    const url = "https://pixabay.com/api/?key=" + myKey
                +"&q="+encodeURIComponent(word)
                +"&image_type="+"photo"
                +"&orientation="+"horizontal"
                +"&safesearch="+"true"
                +"&page="+page
                +"&per_page="+"40";
    const response = await fetch(url);
    const users = await response.json();
    return users;
};


const buildImages = (imageList) => {
    imageList.forEach(element => {
        const tinyUrl = element.previewURL;
        const likes = element.likes;
        const comments = element.comments;
        const views = element.views;
        const downloads = element.downloads;
        const bigUrl = element.largeImageURL;



        const link = document.createElement('a');
        link.href - bigUrl;
        link.classList.add('link');
        const img = document.createElement('img');
        img.classList.add('item-image');
        img.src = tinyUrl;
        img.alt = 'Lala Band';
        link.appendChild(img);

        const details = document.createElement('ul');
        details.classList.add('item-list');

        const likeElement = document.createElement('li');
        const likeText = document.createElement('p');
        likeText.innerHTML = "Likes";
        const likeNumbers = document.createElement('p');
        likeNumbers.innerHTML = likes;
        likeElement.insertAdjacentElement('afterbegin', likeText);
        likeElement.insertAdjacentElement('beforeend', likeNumbers);

        const commentElement = document.createElement('li');
        const commentText = document.createElement('p');
        commentText.innerHTML = "Comments";
        const commentNumbers = document.createElement('p');
        commentNumbers.innerHTML = comments;
        commentElement.insertAdjacentElement('afterbegin', commentText);
        commentElement.insertAdjacentElement('beforeend', commentNumbers);



        const viewElement = document.createElement('li');
        const viewText = document.createElement('p');
        viewText.innerHTML = "Views";
        const viewNumbers = document.createElement('p');
        viewNumbers.innerHTML = views;
        viewElement.insertAdjacentElement('afterbegin', viewText);
        viewElement.insertAdjacentElement('beforeend', viewNumbers);


        const downloadElement = document.createElement('li');
        const downloadText = document.createElement('p');
        downloadText.innerHTML = "Downloads";
        const downloadNumbers = document.createElement('p');
        downloadNumbers.innerHTML = downloads;
        downloadElement.insertAdjacentElement('afterbegin', downloadText);
        downloadElement.insertAdjacentElement('beforeend', downloadNumbers);


        details.insertAdjacentElement("afterbegin", likeElement);
        details.insertAdjacentElement("beforeend", commentElement);
        details.insertAdjacentElement("beforeend", viewElement);
        details.insertAdjacentElement("beforeend", downloadElement);

        const item = document.createElement('div');
        item.classList.add('item');
        item.insertAdjacentElement('afterbegin', link);
        item.insertAdjacentElement('beforeend', details);

        container.insertAdjacentElement('beforeend', item);
    });
};



const addLightbox = () => {
    const gallery = document.querySelector('.images-container');
    const galleryLinks = document.querySelectorAll('.link');

    galleryLinks.forEach((link) => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
        })
    });

    const lightbox = new SimpleLightbox(".images-container a", {
        captions: true,
        captionsData: "alt",
        captionDelay: 250
    });
}