function miniMaxSum(arr) {
    // Tính tổng toàn bộ mảng
    const sum = arr.reduce((acc, val) => acc + val, 0);
    // Khởi tạo min, max
    let min = arr[0], max = arr[0];

    // Tìm giá trị min và max
    arr.forEach(val => {
        if (val > max) max = val;
        if (val < min) min = val;
    });

    // Im ra tổng nhỏ nhất và tổng lớn nhất
    console.log((sum - max) + ' ' + (sum - min));

}

function bonusCalculations(arr) {
    const sum = arr.reduce((acc, val) => acc + val, 0);
    let min = arr[0], max = arr[0], evenCount = 0, oddCount = 0;

    arr.forEach(val => {
        if (val > max) max = val;
        if (val < min) min = val;
        if (val % 2 === 0) evenCount++;
        else oddCount++;
    })

    console.log('Total of array:', sum);
    console.log('Min in array:', min);
    console.log('Max in array:', max);
    console.log('Event elements count:', evenCount);
    console.log('Odd elements count:', oddCount);
}

// Input
const arr = [1, 2, 3, 4, 5];

miniMaxSum(arr);
bonusCalculations(arr);