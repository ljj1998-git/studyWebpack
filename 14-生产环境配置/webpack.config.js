const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const optimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

//复用loader
const commonCssLoader = [{
    loader:'postcss-loader',
}]

module.exports = {
    entry:'/src/js/index.js',
    output:{
        filename:'js/build.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    ...commonCssLoader
                ]
            },
            {
                test:/\.less$/,
                use:[
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    ...commonCssLoader,
                    'less-loader'
                ]
            },
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'babel-loader',
                options:{
                    presets:[
                        ['@babel/preset-env'],
                        {
                            useBuiltIns:'usage',
                            corejs:{ version: 3 },
                            targets:{
                                chrome:'60',
                                firefox:'50'
                            }
                        }
                    ]
                }
            }
        ]
    },
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/build.css'
        }),
        //压缩css
        new optimizeCssAssetsWebpackPlugin()
    ],
    mode:'production'
}