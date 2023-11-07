function unpackSausages(truck) {
    let undamaged = [];
    let productCounter = 1;
    truck.forEach(box => {
        if(box.length != 0){
            for(let i = 0; i < box.length; i++){
                let product = box[i];
                if(product[0] == '[' && product[product.length-1] == ']'){
                    product = product.split('').slice(1, -1);
                        if(product.every(sausage => sausage === product[0]) && product.length === 4){
                            if(productCounter % 5 != 0){
                                undamaged.push(product.join(' '));
                            }
                            productCounter++;
                        }
                }
            }
        }
    });
    return undamaged.join(' ');
}