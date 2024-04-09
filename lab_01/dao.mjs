import dayjs from 'dayjs' ;
import sqlite3 from 'sqlite3';
import {Film,FilmLibrary} from './film.mjs';


const db = new sqlite3.Database('films.db',(err)=>{if (err) throw err;});

export const retrieveFilm = function() {
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

export const retrieveCategory = function(option) {
    return new Promise((resolve,reject)=>{
        let sql,param;
        if(option.toLowerCase() == 'unseen'){
            param = 'NULL';
            sql = 'SELECT * from films where watchDate = ?';
        }else if(option.toLowerCase() == 'lastmonth'){
            param = dayjs().subtract(1,'month').format('YYYY-MM-DD');
            sql = 'SELECT * from films where watchDate >= ?';
        }else if(option.toLowerCase() == 'favorite'){
            param = 1;
            sql = 'SELECT * from films where isFavorite = ?';
        }else if(option.toLowerCase() == 'rating'){
            param = 5;
            sql = 'SELECT * from films where rating = ?';
            
        }
        console.log(sql);
       
        let res = [];
        db.all(sql,[param],(err,rows)=>{
            if(err) reject(err);
            else{
                for(let row of rows){
                    res.push(row.id,row.title,row.isFavorite,dayjs(row.watchDate).format('YYYY-MM-DD'),row.rating,row.userId);
                }
                resolve(res);
            }
        })
    })
}

export const retrieveFavorite = () => {
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

export const retrieveWatch = function() {
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

export const retrieveFilmID = (ID) => {
    return new Promise((resolve,reject)=>{
        const sql = 'select * from films where id = ?';
        db.all(sql,[ID],(err,res)=>{
            if(err) reject(err);
            else
            resolve(res);
        })
    })
}

export const retrieveRating = function(rate) {
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

export const retrieveBefore = function(data) {
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

export const retrieveTitle = function(string) {
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

export const addFilm = function(f) {
    return new Promise((resolve,reject)=> {
        const sql = 'insert into films(title,isFavorite,rating,watchDate,userId) values(?,?,?,?,?)';
        const watchDate = f.watchDate ? f.watchDate.format('YYYY-MM-DD') : null;
        let rating  = undefined;
        if(!f.rating || f.rating<1 || f.rating>5)
            rating = null;
        else
            rating = f.rating;
        db.run(sql,[f.title,f.favorite,rating,watchDate,f.p_id],(err) => {
            if(err) reject(err)
            else{
                f.id=this.lastID;
                resolve(f);
            }
        })
    })
}

export const deleteFilm = function(ID) {
    return new Promise((resolve,reject)=> {
        const sql ='delete from films where id = ?';
        db.run(sql,[ID],(err)=>{
            if(err) reject(err)
            else resolve();
        })
    })
}

export const deleteDate = function() {
    return new Promise((resolve,reject)=>{
        const sql = 'update films set watchDate=NULL';
        db.run(sql,(err)=>{
            if(err) reject(err)
            else resolve();
        })
    })
}

export const changeFilm = function(cat,id,value) {
    return new Promise((resolve,reject)=>{
        let sql;
        const ID = id;
        let v= value;
        if(cat.toLowerCase() == 'rating'){
            if(!v || v<1 || v>5)
                value=null;
            sql = 'UPDATE films SET rating = ? WHERE id = ?'
        }else if (cat.toLowerCase() == 'isfavorite'){
            sql = 'UPDATE films SET isFavorite = ? WHERE id = ?'
        }
        db.run(sql,[v,ID],(err) => {
            if(err) reject(err)
            else{
                resolve();
            }
        })
    })
}