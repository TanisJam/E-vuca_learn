//GOLBAL VARIABLES
const main = document.getElementById('main');



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
    let card = document.createElement('div');
    card.setAttribute("class", "card sm m-2");
    card.setAttribute('style', 'width: 18rem;');

    let img = document.createElement('img');
    img.setAttribute('src', `${cat.url}`);
    img.setAttribute('class', 'card-img-top');
    card.appendChild(img);



    return card;
}
