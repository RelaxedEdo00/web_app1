import dayjs from 'dayjs' ;
import sqlite3 from 'sqlite3';

const db = new sqlite3.Database('films.db',(err)=>{if (err) throw err;});


function Film(id, title, favorite, date, rating, p_id){
this.id=id;
this.title=title;
this.favorite=favorite;
this.date=date;
this.rating=rating;
this.p_id = p_id;

this.toString = () => {return `Id: ${this.id}, ` +
`Title: ${this.title}, Favorite: ${this.favorite}, ` +
`Watch date: ${this.date}, Score: ${this.rating}, ` +
`User: ${this.p_id}` ;}

}

function FilmLibrary(p_id){
    /*this.films = [];

    this.addNewFilm = (film) => {this.films.push(film)};
    this.sortByDate = () =>{
        const fn = this.films.filter((film) => film.date === null);
        const fi = this.films.filter((film) => film.date != null);
        fi.sort((f1,f2) => f1.date.valueOf()-f2.date.valueOf());
        for(let f of fn){
            fi.push(f);
        }
        return fi;
    }
    this.deleteFilm = (film) => {
        const i = this.films.indexOf(film.id);
        this.films.splice(i);
    }
    this.resetWatchedFilms = () => {
        for(let f of this.films){
            f.date = null;
        }
    }

    this.getRated = () =>{
        const f = this.films.filter((film) => film.rating!=null);
        for(let film of f){
            console.log('Id: '+film.id+',Title: '+film.title+',Favorite: '+film.favorite+',Watch date: '+dayjs(film.date).toDate(),',Score: '+ film.rating);
        }
    } */

    this.retrieveFilm = function() {
        return new Promise((resolve,reject)=>{
            const sql = 'SELECT * from films';
            let res = [];
            db.all(sql,(err,rows)=>{
                if (err) reject(err);
                else{
                    for(let row of rows){
                    res.push(new Film(row.id,row.title,row.isFavorite,dayjs(row.watchDate).format('YYYY-MM-DD'),row.rating,row.userId));
                    }
                    resolve(res);
                }
            })
            
        })
    }

    this.retrieveFavorite = function() {
        return new Promise((resolve,reject)=>{
            const sql = 'select * from films where isFavorite = ?';
            let res = [];
            db.all(sql,(err,rows)=>{
                if (err) reject(err);
                else{
                    for(let row of rows){
                    res.push(new Film(row.id,row.title,row.isFavorite,dayjs(row.watchDate).format('YYYY-MM-DD'),row.rating,row.userId));
                    }
                    resolve(res);
                }
            })
            
        })
    }

    this.retrieveWatch = function() {
        return new Promise((resolve,reject)=>{
            const sql = 'select * from films where watchDate = ?';
            let res = [];
            let now = dayjs().format('YYYY-MM-DD');
            db.all(sql,[now],(err,rows)=>{
                if (err) reject(err);
                else{
                    for(let row of rows){
                    res.push(new Film(row.id,row.title,row.isFavorite,dayjs(row.watchDate).format('YYYY-MM-DD'),row.rating,row.userId));
                    }
                    resolve(res);
                }
            })
            
        })
    }

    this.retrieveRating = function(rate) {
        return new Promise((resolve,reject)=>{
            const sql = 'select * from films where rating >= ?';
            let res = [];
            db.all(sql,[rate],(err,rows)=>{
                if (err) reject(err);
                else{
                    for(let row of rows){
                    res.push(new Film(row.id,row.title,row.isFavorite,dayjs(row.watchDate).format('YYYY-MM-DD'),row.rating,row.userId));
                    }
                    resolve(res);
                }
            })
            
        })
    }

    this.retrieveBefore = function(data) {
        return new Promise((resolve,reject)=>{
            const sql = 'select * from films where watchDate < ?';
            let res = [];
            db.all(sql,[data],(err,rows)=>{
                if (err) reject(err);
                else{
                    for(let row of rows){
                    res.push(new Film(row.id,row.title,row.isFavorite,dayjs(row.watchDate).format('YYYY-MM-DD'),row.rating,row.userId));
                    }
                    resolve(res);
                }
            })
            
        })
    }

    this.retrieveTitle = function(string) {
        return new Promise((resolve,reject)=>{
            const sql = 'select * from films where title like ? ';
            let res = [];
            db.all(sql,['%'+string+'%'],(err,rows)=>{
                if (err) reject(err);
                else{
                    for(let row of rows){
                    res.push(new Film(row.id,row.title,row.isFavorite,dayjs(row.watchDate).format('YYYY-MM-DD'),row.rating,row.userId));
                    }
                    resolve(res);
                }
            })
            
        })
    }

    this.addFilm = function(f) {
        return new Promise((resolve,reject)=> {
            const sql = 'insert into films(id,title,isFavorite,rating,watchDate,userId) values(?,?,?,?,?,?)';
            db.run(sql,[f.id,f.title,f.favorite,f.rating,f.date,f.p_id],(err) => {
                if(err) reject(err)
                else resolve();
            })
        })
    }

    this.deleteFilm = function(ID) {
        return new Promise((resolve,reject)=> {
            const sql ='delete from films where id = ?';
            db.run(sql,[ID],(err)=>{
                if(err) reject(err)
                else resolve();
            })
        })
    }

    this.deleteDate = function() {
        return new Promise((resolve,reject)=>{
            const sql = 'update films set watchDate=NULL';
            db.run(sql,(err)=>{
                if(err) reject(err)
                else resolve();
            })
        })
    }
}
function main(){
dayjs().format();

/*const f1 = new Film(1,'silenzio degli innocenti', true, dayjs('2023-03-04'),3, 1);
const f2 = new Film(2,'thor', true, dayjs('2023-03-03'),3, 1);
const f3 = new Film(3,'avatar', true, null,5, 1);
const f4 = new Film(4,'inside out', true, null,3, 1);
const f5 = new Film(5,'up', true, dayjs('2023-03-08'),3, 1);*/

const filmlib = new FilmLibrary(1);
/*filmlib.addNewFilm(f1);
filmlib.addNewFilm(f2);
filmlib.addNewFilm(f3);
filmlib.addNewFilm(f4);
filmlib.addNewFilm(f5);
console.log(filmlib);


console.log(filmlib.sortByDate());
filmlib.getRated();*/
let films = [];
films = filmlib.retrieveTitle('st');
films.then((res) => {
    for(let r of res)
        console.log(r.toString());
}).catch((err) => {
    console.log("errore", err);
})

// let f2 = new Film(6,'End Game',1,dayjs().format('YYYY-MM-DD'),5,1);

/*films = filmlib.addFilm(f2);
films.then(console.log("Operation Complete")).catch((err)=>{
    console.log("errore", err);
});
*/

}
main();