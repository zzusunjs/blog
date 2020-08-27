function multiply(a, b){
    let min = Math.min(a, b),
        another = a + b - min,
        sums = 0;
    for(let i=0; i<min; ++i){
        sums += another;
    }
    return sums;
}