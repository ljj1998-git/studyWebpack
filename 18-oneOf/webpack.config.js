const {
    resolve
} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: ['./src/index.js', './src/index.html'],
    output: {
        filename: 'build.js',
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

                    ]
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
                        exclude: /\.(html|css|js|css|less|jpg|png)$/,
                        loader: 'file-loader',
                        options: {
                            name: '[hash:10].[ext]'
                        }
                    }
                ]
            }

        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
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
    target: 'web',
    mode: 'development',
}
