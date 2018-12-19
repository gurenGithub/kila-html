const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css到单独文件的插件
const path = require("path");
var getSassLoader = function (__dirname) {


    return [
        MiniCssExtractPlugin.loader, //注意这边
       //{loader:'style-loader'},
        {
            loader: 'css-loader',
            options: {
                // sourceMap: true
            }
        },
        {
            loader: 'sass-loader',
            options: {
                //sourceMap: true
            }
        },
        {
            loader: 'sass-resources-loader',
            options: {
                //sourceMap: true,
                resources: [
                    path.resolve(__dirname, 'src/style/helpers/core/_variables.scss'),
                    path.resolve(__dirname, 'src/style/helpers/core/_mixin.scss')

                ]
            }
        },

        {
            loader: 'postcss-loader',

            options: {


                plugins: [require("autoprefixer")("last 10 versions")]
            }
        }

    ]

}
module.exports = getSassLoader;