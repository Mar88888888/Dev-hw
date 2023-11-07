function groupAnagrams(words){
    let resultArr = [];
    words.forEach(word => {
        let letters = new Set(word.split('').sort());
        if(resultArr.length == 0){
            resultArr.push([word]);
        }else{
            resultLength = resultArr.length;
            let inserted = false;
            for (let i = 0; i < resultLength; i++) {
                let group = resultArr[i];
                let groupLetters = new Set(group[0].split('').sort());
                
                if (groupLetters.size === letters.size &&
                  groupLetters.size === new Set([...groupLetters, ...letters]).size) {
                  group.push(word);
                  inserted = true;
                  break;
                }
            }
            if(!inserted){
                resultArr.push([word]);
            }
              
        }
    });
    return resultArr;
}
