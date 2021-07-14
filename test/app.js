const main = document.querySelector('#main');


//Masonry
function masonGrid() {
    const grid = document.querySelector('.grid');

    const msnr = new Masonry(grid);
}


//Getting cat data
async function getCats() {
    const response = await fetch("https://api.thecatapi.com/v1/images/search?limit=10&size=small");
    const cat = await response.json();

    return cat;
};

document.addEventListener("DOMContentLoaded", async () => {
    console.log(Masonry);
    let cats = [];

    try {
        cats = await getCats();

        cats.forEach( cat => {
            main.appendChild(createImg(cat))
        });

        await masonGrid();


    } catch (e) {
        console.error(e);
    }
})


//FUNCTIONS
function createImg(cat) {
    let container = document.createElement('div');
    container.setAttribute('class', 'grid-item')

    let img = document.createElement('img');
    img.setAttribute('src', `${cat.url}`);
    container.appendChild(img);

    return container;
}