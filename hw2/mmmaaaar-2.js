function findEvenIndex(arr)
{
  if(arr.every(item => item == 0)) return 0;
 let result = -1;
    arr.forEach((_, index, arr) => {
        let leftSum = arr.slice(0, index).reduce((accumulator, curentValue) => accumulator + curentValue, 0);
        let rightSum = arr.slice(index + 1, arr.length).reduce((accumulator, curentValue) => accumulator + curentValue, 0);
        if(leftSum == rightSum) {
            result = index;
            return;
        };
    });
    return result;
}
