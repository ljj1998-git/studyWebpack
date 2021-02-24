import './iconfont.css'
import './index.css'
import './prints.js'

console.log('重新加载！');

function add(x, y) {
    return x + y;
}

console.log(add(1, 2));

if(module.hot){
    //一旦module.hot 为true,说明开启了HMR功能  --> 让HMR功能代码生效
    module.hot.accept('./prints.js',function(){
        //方法会监听build.js文件的变化，一旦发生变化，其他默认不会重新打包
        //会执行后面的回调
    })
}