const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Webpack = require('webpack');//1热更新
const getEntry = require('./config/getEntry');
const getLoader = require('./config/loader');
const getHtml = require('./config/getHtml');
var entries = getEntry();
var htmls = getHtml();


var opts = {
    mode: 'development',
    // entry:['./src/index.js','./src/index2.js'],
    entry: entries,
    //devtool: false,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js'
    },
    resolve: {

    },
    module: {
        rules: [
            {
        　　     test: /\.html$/,
        　　     loader: 'text-loader'// path.resolve(__dirname,'loader/html.js'),
             },
             {
                test: /\.scss$/,
                use:[
                    //{ loader: 'vue-style-loader' },
                { loader: 'css-loader', options: { sourceMap: true } },
                { loader: 'sass-loader', options: { sourceMap: true } },
                //{loader: 'postcss-loader',options:{plugins:[require("autoprefixer")("last 100 versions")]}},
                { loader: 'sass-resources-loader',
                  options: {
                    sourceMap: true,
                    resources: [
                        path.resolve(__dirname, 'src/style/helpers/core/_variables.scss'),
                        path.resolve(__dirname, 'src/style/helpers/core/_mixin.scss')
                      //resolveFromRootDir('src/styles/variables.scss'),
                    ]
                  }
                },
                //{loader:'postcss-loader'},
                /*{loader:'postcss-loader',options: {
                    plugins: [
                        //require("autoprefixer") 
                    ]
                }}*/
            ]

             }
        ]
    },
    //devServer
    devServer: {
        //设置服务器访问的基本目录
        contentBase: path.resolve(__dirname, 'dist'),
        //服务器ip地址，localhost
        host: 'localhost',
        port: 8090,
        open: true,//自动打开浏览器
        hot: true//2热更新
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),//3热更新
        new CleanWebpackPlugin(['dist']),//删除dist
        //new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ],


}

if (htmls && htmls.length > 0) {

    htmls.map((item) => {

        opts.plugins.push(item);
    })
}
module.exports = opts;
