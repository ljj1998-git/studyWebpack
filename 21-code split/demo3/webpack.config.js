

const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //多入口，有一个入口，最终输出就有一个bundle
    entry: './src/js/index.js',
    output: {
        //取文件名name
        filename: 'js/[name].js',
        path: resolve(__dirname, 'build')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            minify:{
                collapseWhitespace:true,
                removeComments:true
            }
        }),
    ],
    /**
     * 1.可以将node_modules中代码单独打包一个chunk最终输出
     * 2.自动分析多入口chunk中，有没有公共文件，如果有只会打包一个chunk
     */
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    },
    mode: 'production',
}
