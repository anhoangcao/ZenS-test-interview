function miniMaxSum(arr) {
    let sum = arr.reduce((acc, val) => acc + val, 0);
    let max = sum - Math.min(...arr);
    let min = sum - Math.max(...arr);
    console.log(min, max);
}

// Input
let input = "1 2 3 4 5 6";
let arr = input.split(' ').map(Number);

// Output
miniMaxSum(arr);
