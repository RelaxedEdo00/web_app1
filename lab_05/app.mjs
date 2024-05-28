

document.addEventListener('DOMContentLoaded', event => {
    console.log('Page loaded');
    const nav_menu = document.getElementById('menu');
    const library = getFilmLibrary();

    nav_menu.innerHTML = `<li class="nav-item">
    <a class="nav-link active" aria-current="page" href="#" id="all">All</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" id="fav">Favorites</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" id="best">Best Rated</a>
  </li>
  <li class="nav-item">
    <a class="nav-link" href="#" id="last">Seen last month</a>
  </li>
  <li class="nav-item">
      <a class="nav-link" href="#" id="unseen">Unseen</a>
    </li>`

    const table = document.getElementById("films-table");
    printTable(library.list, table);



    const all = document.getElementById('all');
    const fav = document.getElementById('fav');
    const best = document.getElementById('best');
    const last = document.getElementById('last');
    const unseen = document.getElementById('unseen');

    all.addEventListener('clcik', event => {
        printTable(library.list);
        document.getElementsByClassName('nav-link active').classList[0].replace('nav-link active','nav-link');
        all.classList.replace('nav-link','nav-link active');
        
    })

    fav.addEventListener('click', event => {
        const films = library.list.filter((film) => film.favorite == true);
        printTable(films, table);
        const change = document.getElementsByClassName('active');
        change[0].classList.delete('active');
        fav.classList.replace('nav-link','nav-link active');
    });

    best.addEventListener('click', event => {
        const films = library.list.filter((film) => film.rating == 5);
        printTable(films, table);
        document.getElementsByClassName('nav-link active').classList.replace('nav-link active','nav-link');
        best.classList.replace('nav-link','nav-link active');
    })

    last.addEventListener('click', event => {
        const films = library.list.filter((film) => dayjs(film.watchDate).isBefore(dayjs()) == false && film.watchDate != null);
        printTable(films, table);
        document.getElementsByClassName('nav-link active').classList.replace('nav-link active','nav-link');
        last.classList.replace('nav-link','nav-link active');
    })




});



function getFilmLibrary() {
    const pulpFiction = new Film(1, "Pulp Fiction", true, "2024-03-10", 5);
    const grams21 = new Film(2, "21 Grams", true, "2024-03-17", 4);
    const starWars = new Film(3, "Star Wars", false);
    const matrix = new Film(4, "Matrix");
    const shrek = new Film(5, "Shrek", false, "2024-03-21", 3);

    // Adding the films to the FilmLibrary
    const library = new FilmLibrary();
    library.addNewFilm(pulpFiction);
    library.addNewFilm(grams21);
    library.addNewFilm(starWars);
    library.addNewFilm(matrix);
    library.addNewFilm(shrek);

    return library;
}

function Film(id, title, isFavorite = false, watchDate = null, rating = 0, userId = 1) {
    this.id = id;
    this.title = title;
    this.favorite = isFavorite;
    this.rating = rating;
    // saved as dayjs object only if watchDate is truthy
    this.watchDate = watchDate && dayjs(watchDate);
    this.userId = userId

    this.toString = () => {
        return `Id: ${this.id}, ` +
            `Title: ${this.title}, Favorite: ${this.favorite}, ` +
            `Watch date: ${this.watchDate}, Score: ${this.rating}, ` +
            `User: ${this.userId}`;
    }
}

function FilmLibrary() {
    this.list = [];

    this.addNewFilm = (film) => {
        if (!this.list.some(f => f.id == film.id))
            this.list.push(film);
        else
            throw new Error('Duplicated id');
    };

}

function printTable(films, table) {
    let id = 0;

    for (let film of films) {
        const tr = document.createElement("tr");
        table.appendChild(tr);
        let fav;
        if (film.favorite == true) {
            fav = "bi-check-square";
        } else {
            fav = "bi-square";
        }
        let rating = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= film.rating)
                rating += `<i class="bi bi-star-fill"></i>`;
            else
                rating += `<i class="bi bi-star"></i>`;
        }
        tr.innerHTML = `
        <td>${film.title}</td>
        <td><i class="${fav}"></i>Favorite</td>
        <td>${dayjs(film.watchDate).format('YYYY-MM-DD')}</td>
        <td>${rating}</td>
        <td><button class="btn btn-outline" type="submit" id="mod-id-${id}"><i class="bi bi-pen"></i></button><button class="btn btn-outline" type="submit" id="del-id-${id}"><i class="bi bi-trash"></i></button></td>
        `
        id++;

    }
}