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

  this.formatWatchDate = (format = 'MMMM D,YYYY') => {
    return this.watchDate ? this.watchDate.format(format) : undefined;
};

this.isBestRated = () => this.rating === 5;

this.isSeenLastMonth = () => {
    if (!this.watchDate) return false; // no watchDate
    const diff = (dayjs()).diff(this.watchDate, 'month', true);

    return diff >=0 && diff < 1;
};

this.isUnseen = () => !this.watchDate;
}

function FilmLibrary() {
  this.list = [];

  this.addNewFilm = (film) => {
    if(!this.list.some(f => f.id == film.id))
      this.list.push(film);
    else
      throw new Error('Duplicated id');
  };

  this.filterAll = () => {
    return this.list.filter( (film) => true);
}

this.filterByFavorite = () => {
    return this.list.filter( (film) => film.favorite === true);
}

this.filterByBestRated = () => {
    return this.list.filter( (film) => film.isBestRated() );
}

this.filterBySeenLastMonth = () => {
    return this.list.filter( (film) => film.isSeenLastMonth() );
}

this.filterByUnseen = () => {
    return this.list.filter( (film) => film.isUnseen() );
}


}



export{Film, FilmLibrary};