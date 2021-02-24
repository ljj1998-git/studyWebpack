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
    devtool:'inline-source-map'
};

/**
 * source-map:一种提供源代码到构建后代码映射技术(如果构建后代码出错，通过映射可以追踪源代码错误)
 * 
 *  [inline-|hidden-|eval-][nosources-][cheap-[module-]]source-map
 * 
 *  source-map 外部（错误代码准确信息 和 源代码的错误位置）
 *  inline-source-map  内联（错误代码准确信息 和 源代码的错误位置）
 *  hidden-source-map  外联（错误代码错误信息,但是没有错误位置，不能追踪源代码错误，只能提示到构建后代码的错误位置）
 *  eval-source-map  内联（每一个文件都会生成对应的source-map）
 *  cheap-source-map 外部
 *  
 * 
 *  内联 和 外联的区别：1.外部生成了文件，内联没有 2.内联构建速度更快
 */
