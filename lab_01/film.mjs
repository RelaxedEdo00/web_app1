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


export{Film, FilmLibrary};