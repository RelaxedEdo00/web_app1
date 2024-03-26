import express from 'express';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev'));

app.get('/', (req,res)=>{
    res.send('Hello there!')
});


app.listen(3000, () => console.log('Application started'));
