function landPerimeter(arr){
    let perimeter = 0;
    let matrix = arr.map(string => string.split(''));
    console.log(matrix);
    for(let i = 0; i<arr.length; i++){
        for(let j = 0; j<arr[0].length; j++){
            if(matrix[i][j] == 'X'){
                perimeter += 4 - countNeighbours(matrix, i, j);
            }
        }
    }
    return `Total land perimeter: ${perimeter}`;
}

function countNeighbours(arr, index1, index2){
    let neighbours = [];
    if(arr.length == 0 || arr[0].length == 0) return;
    neighbours.push(index1 == 0 ? '' : arr[index1 - 1][index2]);
    neighbours.push(index1 == arr.length -1 ? '' : arr[index1 + 1][index2]);

    neighbours.push(index2 == 0 ? '' : arr[index1][index2 - 1]);
    neighbours.push(index2 == arr[0].length -1 ? '' : arr[index1][index2 + 1]);

    return neighbours.reduce((accumulator, curentValue) => accumulator + (curentValue == 'X' ? 1 : 0), 0);
} 