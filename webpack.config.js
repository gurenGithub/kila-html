const path = require("path");
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin"); //提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin'); //压缩css插件
const Webpack = require('webpack'); //1热更新
const getEntry = require('./config/getEntry');
const getSassLoader = require('./config/sassLoader');
const getHtml = require('./config/getHtml');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
var config = require('./config/index');

var entries = getEntry();
var htmls = getHtml();
var production = process.env.npm_lifecycle_script.indexOf('production') != -1;

function resolve(dir) {
    return path.join(__dirname, '..', dir)
}
var assetsPath = function (_path) {
    var assetsSubDirectory = production ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}


console.log(entries);
var opts = {
    mode: 'development',
    entry: entries,
    devtool: false,
    //devtool: 'cheap-module-inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js?[hash:7]',
        publicPath: production? config.build.assetsPublicPath:config.dev.assetsPublicPath
    },
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            //'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve(__dirname, 'src'),
            '@c': path.resolve(__dirname, 'src/components'),
            '@i': path.resolve(__dirname,  'src/assets/img'),
            '@h': path.resolve(__dirname, 'html'),

        }
    },
    module: {
        rules: [{
                test: /\.html$/,
                loader: 'text-loader' // path.resolve(__dirname,'loader/html.js'),
            },
            {
                test: /\.scss$/,
                use: getSassLoader(__dirname)
            },
            {
                test: /\.(json)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1,
                    name: assetsPath('configs/[name].[ext]')
                }
            },
            {
                test: /\.(png|jpe?g|gif|svg|cur)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 1000,
                    name: assetsPath('assets/img/[name].[ext]?v=[hash:8]')
                }
            },
            {
                test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 1000,
                    name: assetsPath('assets/fonts/[name].[hash:7].[ext]')
                }
            }
        ]
    },
    //devServer
    devServer: {
        //设置服务器访问的基本目录
        contentBase: path.resolve(__dirname, !production ? 'src' : production? config.build.assetsPublicPath:config.dev.assetsPublicPath),
        //服务器ip地址，localhost
        host: 'localhost',
        port: 8090,
        open: true, //自动打开浏览器
        hot: production ? false : true //2热更新
    },
    plugins: [

        new MiniCssExtractPlugin({
            filename: "css/[name].css?[hash:7]", ////都提到build目录下的css目录中 
            chunkFilename:"css/[name].css?[hash:7]"
            //chunkFilename: "css/[name].chunk.css"

        })

    ],


}

if (htmls && htmls.length > 0) {

    htmls.map((item) => {

        opts.plugins.push(item);
    })
}
if (!production) {
    opts.plugins = opts.plugins.concat([
        new Webpack.HotModuleReplacementPlugin(), //3热更新
    ])
} else {

    opts.plugins = opts.plugins.concat([
        new CleanWebpackPlugin(['dist']), //删除dist 

        new OptimizeCssAssetsPlugin(),
        new CopyPlugin([{
                from: path.resolve(__dirname, 'src/assets'),
                to: path.resolve(__dirname, 'dist/assets')
            }

        ])

    ]);
    opts.optimization = {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: "async",
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            automaticNameDelimiter: '~',
            name: true,
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                default: {
                    minChunks: 2,
                    priority: -20,
                    reuseExistingChunk: true
                },
                templates: {
                    name: 'templates',
                    test: /\.html/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20,
                    minChunks: 2
                },
                utils: {
                    name: 'utils',
                    test: /\.js$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20,
                    minChunks: 2
                },
                styles: {
                    name: 'utils',
                    test: /\.scss$/,
                    chunks: 'all',
                    enforce: true,
                    priority: 20,
                    minChunks: 2,
                }
                /*,styles: {
                    name: 'styles',
                    test: /\.css$/,
                    chunks: 'all',
                    priority: -10,
                    enforce: true
                },
                sass: {
                    name: 'sass',
                    test: /\.(sa|sc|)ss$/,
                    chunks: 'all',
                    priority: -10,
                    enforce: true
                }*/
            }
        }
    }

}
module.exports = opts;