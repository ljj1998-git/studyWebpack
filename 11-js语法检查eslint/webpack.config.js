const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry:'./src/index.js',
    output:{
        filename:'js/build.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            /**
             * 语法检查：eslint-loader eslint
             * 注意：只检查自己的代码不检查node_modules
             * 设置检查规则
             * package.json中eslintConfig中设置
             * "eslintConfig":{
                    "extends":"airbnb-base"
                }
             * airbnb --> eslint-config-airbnb-base
             * eslint-config-airbnb-base又依赖 eslint eslint-plugin-import
             */
            {
                test:/\.js$/,
                exclude:/node_modules/,
                loader:'eslint-loader',
                options:{
                    //自动修复
                    fix:true
                }
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        })
    ]
}