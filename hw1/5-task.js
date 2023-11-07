function highAndLow(string){
    let numbers = string.split(' ').map(num => +num);
    let max = Math.max(...numbers);
    let min = Math.min(...numbers);
    return `${max} ${min}`;
}
console.log(highAndLow("1 2 3 4 5"));
console.log(highAndLow("1 2 -3 4 5"));
console.log(highAndLow("1 9 3 4 -5"));