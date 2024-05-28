import dayjs from "dayjs";


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
    `User: ${this.userId}` ;
  }
}

function FilmLibrary() {
  this.list = [];

  this.addNewFilm = (film) => {
    if(!this.list.some(f => f.id == film.id))
      this.list.push(film);
    else
      throw new Error('Duplicated id');
  };

}

export{Film, FilmLibrary};