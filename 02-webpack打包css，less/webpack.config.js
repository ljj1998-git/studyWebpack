const { resolve } = require("path");

module.exports = {
    //入口文件
    entry:'./src/index.js',
    //输出
    output:{
        //输出文件名
        filename:'build.js',
        //输出路径
        //__dirname node.js的变量,代表当前文件的目录绝对路径
        path:resolve(__dirname, 'build')
    },
    module:{
        rules:[
            //详细的loader
            {
                test: /\.css$/,
                use:[
                    'style-loader','css-loader'
                ]
            },
            {
                test: /\.less$/,
                use:[
                    'style-loader','css-loader','less-loader'
                ]
            }
        ]
    },
    plugins:[
        //详细的插件
    ],
    mode:'development',//开发环境
    // mdoe:'production' 生产环境
}