const getSassLoader = require('./sassLoader');
const config = require('./index');
const path = require("path");
var assetsPath = function (_path) {
    var assetsSubDirectory = process.env.NODE_ENV === 'production' ?
        config.build.assetsSubDirectory :
        config.dev.assetsSubDirectory
    return path.posix.join(assetsSubDirectory, _path)
}
 const loaders=(__dirname)=>{ [{
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
        name: assetsPath('image/[name].[hash:7].[ext]')
    }
},
{
    test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
    loader: 'url-loader',
    query: {
        limit: 1000,
        name: assetsPath('fonts/[name].[hash:7].[ext]')
    }
}
]

 }
module.exports = loaders;