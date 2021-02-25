/**
 * tree-shaking 去除无用代码
 *  前提：1.必须使用ES6模块化 2.开启production
 *  作用：减少代码体积
 * 
 *  在package.json中配置
 *      "sideEffects":false 所有代码都没有副作用(都可以进行tree-shaking)
 *      问题：可能会把css / @babel/polyfill  文件干掉
 *      解决："sideEffects":["*.css"]
 */

const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './src/js/index.js',
    output: {
        filename: 'js/build.[hash:10].js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [
            //eslint
            {
                test: /\.js$/,
                exclude: /node_modules/,
                //优先执行
                enforce: 'pre',
                loader: 'eslint-loader',
                options: {
                    //自动修复
                    fix: true
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

                    ],
                    //开启babel缓存
                    //第二次构建时，会读取之前的缓存
                    cacheDirectory:true
                }
            },
            {
                //以下loader只会匹配一个
                //注意：不能有两个配置处理同一种类型文件，所以把jsloader提出来
                oneOf: [
                    //处理less
                    {
                        test: /\.less$/,
                        use: ['style-loader', 'css-loader', 'less-loader']
                    },
                    //处理css
                    {
                        test: /\.css$/,
                        use: [miniCssExtractPlugin.loader, 'css-loader']
                    },
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new miniCssExtractPlugin({
            filename:'css/build.[hash:10].css'
        })
    ],
    devServer: {
        contentBase: resolve(__dirname, 'build'),
        //启动gzip压缩
        compress: true,
        port: 3000,
        open: true,
        //开启HMR功能
        hot: true
    },
    mode: 'production',
}
