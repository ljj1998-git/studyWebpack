/**
 * HMR：hot module replacement 热模块替换 / 模块热替换
 * 作用: 一个模块发生变化，只会重新打包这一个模块，极大提升速度
 * 
 * 样式文件：可以使用HMR，因为style-loader内部实现了
 * js文件:默认不能使用HMR
 *  解决：在index.js中加入
 *  if(module.hot){
        //一旦module.hot 为true,说明开启了HMR功能  --> 让HMR功能代码生效
        module.hot.accept('./prints.js',function(){
            //方法会监听build.js文件的变化，一旦发生变化，其他默认不会重新打包
            //会执行后面的回调
        })
    }
 * html文件：默认不能使用HMR功能，同时会导致html文件不能热更新（不用做HMR）
 *  解决：修改entry入口，将index.html引入
 */

const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/index.js','./src/index.html'],
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //处理less
            {
                test: /\.less$/,
                use: ['style-loader', 'css-loader', 'less-loader']
            },
            //处理css
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            //eslint
            {
                test:/\.js$/,
                exclude:/node_modules/,
                //优先执行
                enforce:'pre',
                loader:'eslint-loader',
                options:{
                    //自动修复
                    fix:true
                }
            },
            //处理js
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    //预设：只是babel做怎样的兼容性处理
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                //按需加载
                                useBuiltIns: 'usage',
                                //置顶core-js版本
                                corejs: {
                                    version: 3
                                },
                                //置顶兼容性做到哪个版本浏览器
                                targets: {
                                    chrome: '60',
                                    firefox: '60',
                                    ie: 9,
                                    safari: '10',
                                    edge: '17'
                                }
                            }
                        ]

                    ]
                }
            },
            //处理图片
            {
                test: /\.(jpg|png)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]'
                }
            },
            //处理html中img资源
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            //处理其他资源
            {
                exclude:/\.(html|css|js|css|less|jpg|png)$/,
                loader:'file-loader',
                options:{
                    name:'[hash:10].[ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ],
    devServer:{
        contentBase: resolve(__dirname,'build'),
        //启动gzip压缩
        compress:true,
        port:3000,
        open:true,
        //开启HMR功能
        hot:true
    },
    target: 'web',
    mode:'development',
}
