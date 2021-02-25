console.log('index.js被加载');


document.getElementById('btn').onclick = function(){
  //懒加载
  //预加载 webpackPrefetch:true 慎用有兼容问题
  import(/* webpackChunkName:'test', webpackPrefetch:true */'./test').then(()=>{
    console.log(444);
  })
}