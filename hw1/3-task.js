function findNb(volume){
    let sum = 0;
    let n = 0;
    while(sum < volume){
        n++;
        sum += Math.pow(n, 3);
    }
    if(sum == volume) return n;
    return -1;
}
console.log(findNb(164836));
console.log(findNb(1071225));
console.log(findNb(91716553919377));
