

const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    //多入口，有一个入口，最终输出就有一个bundle
    entry: {
        main:'./src/js/index.js',
        test:'./src/js/test.js'
    },
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
    mode: 'production',
}
