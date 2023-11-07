function largestRadialSum(honourArr, day){
    if(day == 1){
        return Math.max(...honourArr);
    }
    honours = [];
    for(let i = 0; i < honourArr.length / day; i++){
        let honour = 0;
        let currentIndex = i;
        while(currentIndex < honourArr.length){
            honour += honourArr[currentIndex];
            currentIndex += honourArr.length / day;
        }
        honours.push(honour);
    }
    return Math.max(...honours);
}