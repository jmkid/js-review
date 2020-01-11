var arr = [], i;
    
    for (i = 0; i < 7; i++) {
        var v = rand()
        arr[i] = v
        document.write(arr[i],' ')
    }
function rand() {
    return Math.round(Math.random() * 35) + 1
}