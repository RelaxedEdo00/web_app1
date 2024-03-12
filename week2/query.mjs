// with mjs we don't have to write use strict

function Question(text, user, date){
    this.text = text;
    this.user = user;
    this.date = date;
    this.answers = [];

    this.add = (answer) => {this.answers.push(answer);}

}

function Answer(response, user, score, date){
    this.response = response;
    this.user = user;
    this.score = score;
    this.date = date;
    const category= 'computer science';

    this.voteUp = ()  => {this.score++;}
    this.getCategory =  () => {return category;}
}

const a1 = new Answer('Yes', 'fulvio', 5, '2024-03-12');
console.log(a1);
a1.voteUp();
console.log(a1);
console.log(a1.getCategory());

const q1 = new Question('Are you happy?', 'fulvio', '2024-03-12');
console.log(q1);
q1.add(a1);
console.log(q1);
