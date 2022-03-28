function fibonacci (num){
    num = Math.abs(num);
    if(num <=2) {
        return 1;
    }
    else {
        return fibonacci(num-1)+fibonacci(num-2);
    }
}

console.log("Fibonacci of 30 is", fibonacci(30));
console.log("Fibonacci of -15 is", fibonacci(-15));