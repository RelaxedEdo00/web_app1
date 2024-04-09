"use strict";

const scores = [1,2,34,-1,2,-9,6,-7];
console.log(scores);
console.log(scores.length);

for(let score of scores){
    console.log('Your score is ' + score);

}
// const scores2 = scores; it's just a REFERENCE
let NN=0;
const scores3 = [];
for(const score of scores){
    if(score>=0){
        scores3.push(score);
    }else{
        NN++;
    }
}

console.log(scores3);

for(let repeat=0;repeat<2;repeat++){
    let posmin=0;
    for(let i=0; i<scores3.length;i++){
        if(scores3[i]<scores3[posmin]){
            posmin=i;
        }
    }
    scores3.splice(posmin,1);
}

console.log(scores3);

let avg=0;
for(const score of scores3){
    avg+=score;
}
avg= Math.round(avg/scores3.length);

for(let count=0;count<NN+2;count++){
    scores3.push(avg);
}

console.log(scores3);