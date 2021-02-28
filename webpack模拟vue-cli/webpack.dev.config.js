const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')

module.exports = {
    entry: './src/main.js',
    output: {
        filename: 'js/build.js',
        path: resolve(__dirname, 'build')
    },
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.vue$/,
                use: [{
                        loader: 'cache-loader'
                    },
                    {
                        loader: 'thread-loader'
                    },
                    {
                        loader: 'vue-loader',
                        options: {
                            compilerOptions: {
                                preserveWhitespace: false
                            },
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                ]
            },
            {
                test: /\.sass$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader'
                    },
                    'sass-loader',
                ]
            },
            {
                exclude: /\.(css|js|html)$/,
                loader: 'file-loader',
                options: {
                    name: '[hash:10].[ext]'
                }
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: resolve(__dirname, 'index.html'),
            filename: 'index.html'
        }),
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/main.css'
        }),
        new OptimizeCssAssetsWebpackPlugin()
    ],
    mode: 'development',
    devServer: {
        port: 3000,
        //启动gzip压缩
        compress: true,
        open: true,
    },
    target: "web"
}