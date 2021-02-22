const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// process.env.NODE_ENV = 'development'

module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                MiniCssExtractPlugin.loader,
                'css-loader',
                //css兼容性处理：postcss  ---> postcss-loader postcss-preset-env
                //postcss-preset-env帮postcss找到 package.json中browserslist里面的配置，通过配置加载置顶的css兼容性
                /**
                     * "browserslist":{
                            "development":[
                                "las 1 chrome version",
                                "las 1 firefox version",
                                "las 1 safari version"
                                ],
                                "production":[
                                ">0.2%",
                                "not dead",
                                "not op_mini all"
                                ]
                            }
                     * 使用loader的默认配置
                     */
                {
                    loader: 'postcss-loader',
                    /**
                     * 当前版本的postcss-loader如果使用以下的写法，webpack.config.js不支持
                     * 解决办法：创建一个postcss.config.js
                     * 写入module.exports = {
                            plugins:[
                                    require('postcss-preset-env')()
                                ]
                            }
                     */
                    // options: {
                    //     ident: 'postcss',
                    //     plugins: () => [
                    //         //postcss的插件
                    //         require('postcss-preset-env')()
                    //     ]
                    // }
                }
            ]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin({
            filename: 'css/build.css'
        })
    ],
    mode: 'development'
}