//GOLBAL VARIABLES
const main = document.getElementById('main');

//Masonry

window.onload = () => {
    const grid = document.querySelector('.grid');

    const masonry = new Masonry(grid, {
        itemSelector: '.grid-item',
    });

    console.log('mason', masonry);

}


//Getting users data
async function getCats() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10&size=small");
    const cat = await response.json();

    console.log("respuesta", cat);
    return cat;
};

document.addEventListener("DOMContentLoaded", async () => {
    let cats = [];

    try {
        cats = await getCats();

        cats.forEach(cat => {
            main.appendChild(createUser(cat))
        });


    } catch (e) {
        console.error(e);
    }
})


//FUNCTIONS
function createUser(cat) {
    let container = document.createElement('div');
    container.setAttribute('class', 'grid-item')

    let img = document.createElement('img');
    img.setAttribute('src', `${cat.url}`);
    img.setAttribute('class', 'm-1');
    container.appendChild(img);

    return container;
}
