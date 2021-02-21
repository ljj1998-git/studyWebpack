const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build'),
        // publicPath:'./'
    },
    module: {
        rules: [{
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(jpg|.png)$/,
                //url-loader依赖file-loader两个都要安装
                loader: 'url-loader',
                options: {
                    //图片大小小于8kb，就会被base64处理
                    //优点：减少请求数量
                    //缺点：图片体积会变大
                    limit: 8 * 1024,
                    //关闭url-loader的es6模块化，使用commonjs解析
                    esModule:false,
                    //给图片进行重命名
                    //[hash:10]取图片的hash前10位
                    //[ext]原来的后缀名
                    name:'[hash:10].[ext]'
                }
                //这个loader不能处理html中的img图片，要用下面的loader
            },
            {
                //处理html文件的img图片（负责引入img，从而能被url-loader进行处理）
                test: /\.html$/,
                //处理html文件的img图片（负责引入url-loader进行处理）
                loader:'html-loader',
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ],
    mode: 'development'
}