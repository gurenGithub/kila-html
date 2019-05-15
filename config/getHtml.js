

const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const fs = require('fs')

var myFiles = [];

var _path = path.resolve(__dirname, './../html');
function fileDisplay(filePath) {

    var files = fs.readdirSync(filePath);


    //files.forEach(async function (filename) {

    for (let i = 0; i < files.length; i++) {

        var filename = files[i];



        //获取当前文件的绝对路径
        var filedir = path.join(filePath, filename);
        //console.log(filedir);
        var stats = fs.statSync(filedir);
        var isFile = stats.isFile();//是文件
        var isDir = stats.isDirectory();//是文件夹
        //continue;
        //根据文件路径获取文件信息，返回一个fs.Stats对象
        //,function(eror,stats){
         


        if (isFile) {
          
           
        if(filedir.indexOf('.html')==-1 ){
            continue;
        }
        console.log(filedir);
            myFiles.push(filedir);
            //console.log(filedir);
        }
        if (isDir) {

            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件 

        }
    }
}

const getHtml = function () {




    // console.log(_path);
    fileDisplay(_path);
    var entries = [];
    myFiles.map(item => {

        var sortFile = item.replace(_path, './html');
        var name = item.replace(_path + '/', '');
        var chunks = item.replace(_path + '/', '').replace(/\//gi, '').replace(/.html/gi, '');

        console.log(name,'html');

        var entityName=name.replace('.html','');
        // var item={}

       // console.log(sortFile,name,chunks);
        //entries[name]=['babel-polyfill', sortFile];

        var page = new HtmlWebpackPlugin({
            //hash:true,
            template: sortFile,
            //name:name,
            //title: '第二个页面',
            filename: name,
            chunks: [entityName,'vendor', 'utils'],
            minify:{
                removeComments:true,
                collapseWhitespace:true
            }
            
        });

        entries.push(page)

    })




    return entries;
}


module.exports = getHtml;

