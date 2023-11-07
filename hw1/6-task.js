function digitSort(num){
    let digits = num + '';
    let maxIndex, maxDigit = 0;
    let result = [];
    while(digits.length > 0){
        for(let i = 0; i < digits.length; i++){
            if(digits[i] >= maxDigit){
                maxDigit = digits[i];
                maxIndex = i;
            }
        }
        result.push(maxDigit);
        digits = digits.slice(0, maxIndex) + digits.slice(maxIndex + 1);
        maxDigit = 0;
    }
    return +(result.join(''));
}