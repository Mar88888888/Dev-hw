function hanoiCounter(disks){
    if(disks <= 0) return 0;
    let moves = hanoiCounter(disks - 1);
    moves += 1;
    moves += hanoiCounter(disks - 1);
    return moves;
}


console.log(hanoiCounter(1));
console.log(hanoiCounter(2));
console.log(hanoiCounter(3));
console.log(hanoiCounter(4));
console.log(hanoiCounter(5));

