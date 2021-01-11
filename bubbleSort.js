function bubbleSort(inputArray) {
    let swap;
    let n = inputArray.length - 1;
    let x = inputArray;
    do {
        swap = false;
        for (let i = 0; i < n; i++) {
            if (x[i] < x[i + 1]) {
                let temp = x[i];
                x[i] = x[i + 1];
                x[i + 1] = temp;
                swap = true;
            }
        }
        n--;
    } while (swap);
    return x;
}

console.log(bubbleSort([3223, 455, 23, 234, 213])); 
