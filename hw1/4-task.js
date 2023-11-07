function isPrime(num){
    if(num <= 1) return false;
    if(num % 2 == 0 && num != 2) return false;
    for(let i = 3; i <= num; i +=2){
        if(num % i == 0 && num != i) return false;
    }
    return true;
}

console.log(isPrime(1));
console.log(isPrime(2));
console.log(isPrime(-1));
console.log(isPrime(3));
console.log(isPrime(5));