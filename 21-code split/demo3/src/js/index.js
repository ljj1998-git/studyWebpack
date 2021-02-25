

function sum(...args) {
  return args.reduce((p, c) => p + c, 0);
}

console.log(sum(1, 2, 3, 4, 5));


import('./test').then(({mul}) => {
  console.log(mul);
}).catch(()=>{
  console.log('失败');
})

