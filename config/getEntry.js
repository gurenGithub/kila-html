

const path = require("path");

const fs=require('fs')

var myFiles=[];


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
            myFiles.push(filedir.replace('.html','.js'));
            //console.log(filedir);
        }
        if (isDir) {

            fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件 

        }
    }
}

const getEntry=function(){

    
    
     
    // console.log(_path);
    fileDisplay(_path);

    console.log(myFiles);
    var entries={};
    myFiles.map(item=>{

        var sortFile=item.replace(_path,'./src/js');
        var name=item.replace(_path+'/','').replace(/\//gi,'/').replace(/.js/gi,'');
        
        console.log(name,'js');
      // var item={}
      entries[name]=[/*'babel-polyfill',*/  sortFile];
      
    })
   
    

    return entries;
}


module.exports= getEntry;

