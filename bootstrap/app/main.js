//GOLBAL VARIABLES
const main = document.getElementById('main');



//Getting users data
async function getUsers() {
    const response = await fetch("https://reqres.in/api/users?page=1");
    const response2 = await fetch("https://reqres.in/api/users?page=2");

    const page1 = await response.json();
    const page2 = await response2.json();

    const users = [...page1.data, ...page2.data];

    return users;
};

document.addEventListener("DOMContentLoaded", async () => {
    let users = [];

    try {
        users = await getUsers();

        users.forEach(user => {
            main.appendChild(createUser(user))
        });


    } catch (e) {
        console.error(e);
    }
})


//FUNCTIONS
function createUser(user) {
    let card = document.createElement('div');
    card.setAttribute("class", "card sm m-2");
    card.setAttribute('style', 'width: 18rem;');

    let img = document.createElement('img');
    img.setAttribute('src', `${user.avatar}`);
    img.setAttribute('class', 'card-img-top');
    card.appendChild(img);

    let cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body');
    let name = document.createElement('h5');
    name.setAttribute('class', 'card-title');
    name.innerText = `${user.first_name} ${user.last_name}`;
    let email = document.createElement('h6');
    email.setAttribute('class', 'card-subtitle mb-2 text-muted');
    email.innerText = user.email;
    cardBody.appendChild(name);
    cardBody.appendChild(email);
    card.appendChild(cardBody);

    return card;
}
