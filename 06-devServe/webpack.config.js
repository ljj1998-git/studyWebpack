const { resolve } = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'build.js',
        path:resolve(__dirname,'build'),
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:['style-loader', 'css-loader']
            },
            //打包其他资源(除了html/js/css以外的资源)
            {
                exclude: /\.(css|js|html)$/,
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
    mode:'development',


    //开发服务器 devServer:用来自动化（自动编译，自动打开浏览器，自动刷新）
    //启动 devServer指令 webpack-dev-server  （本地为：npx webpack-dev-server)
    //特点：只会在内存中编译打包，不会有任何输出
    devServer:{
        contentBase:resolve(__dirname,'build'),
        //启动gzip压缩
        compress: true,
        //端口号
        port:3000,
        //自动打开浏览器
        open:true
    }
}