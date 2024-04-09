import express from 'express';
import morgan from 'morgan';
import dayjs from 'dayjs' ;
import sqlite3 from 'sqlite3';
import * as dao from './dao.mjs';
import {Film,FilmLibrary} from './film.mjs';

const app = express();
app.use(morgan('common'));
app.use(express.json());

app.get('/films/', (req, res)=>{
    dao.retrieveFilm().then((q)=>{
        res.json(q);
    }).catch((err)=>{
        res.status(500).send('Database error: '+ err);
    })
});


app.get('/films/:id', (req,res)=>{
    const fID = req.params.id;
    dao.retrieveFilmID(fID).then((q)=> {
        res.json(q)
    }).catch((err)=>{
        res.status(500).send('Database error: '+err);
    })
    
});

app.get('/films/:cat/:type', (req,res)=>{
    const t = req.params.type;
    dao.retrieveCategory(t).then((q)=> {
        res.json(q)
    }).catch((err)=>{
        res.status(500).send('database error: '+err);
    })
    
});

app.post('/films/', (req,res)=>{
    const film = new Film(null,req.body.title,req.body.isFavorite,dayjs(req.body.watchDate).format('YYYY-MM-DD'),req.body.rating,req.body.p_id);
    dao.addFilm(film).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.status(500).send('Database error: '+err);
    })
})

app.post('/films/:cat/:id', (req,res) => {
    const c = req.params.cat;
    const id = req.params.id;
    const v = req.body.value;
    dao.changeFilm(c,id,v).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.status(500).send('Database error: '+err);
    })
})

app.delete('/films/:id', (req,res)=>{
    const ID = req.params.id;
    dao.deleteFilm(ID).then((q)=>{
        res.json(q)
    }).catch((err)=>{
        res.status(500).send('Database error: '+err);
    });
})




app.listen(3000, ()=>{console.log('running!')});