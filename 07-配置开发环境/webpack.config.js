
const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
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
                use: ['style-loade', 'css-loader']
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
                    name:'[hash]:10.[ext]'
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.js'
        })
    ],
    devServer:{
        contentBase: resolve(__dirname,'build'),
        compress:true,
        port:3000,
        open:true
    },
    mode:'development'
}