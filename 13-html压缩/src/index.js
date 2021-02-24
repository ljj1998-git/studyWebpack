// import '@babel/polyfill'

const add = function(x, y) {
    return x + y
}
console.log(add(1, 2))

const promise = new Promise(resolve => {
    setTimeout(()=> {
        console.log('2222');
        resolve()
    },1000)
})

console.log(promise)