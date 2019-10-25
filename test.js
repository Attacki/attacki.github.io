const fs = require('fs');


function reduceUploadFs(path){
    fs.readdir(path,(err,dirs)=>{
        for(var i=0;i<dirs.length;i++){
            console.log(dirs[i])
            var stat = fs.lstatSync("./xx");
            if(stat.isDirectory()){
                console.log(dirs[i])
                
            }else{
                fs.readFile(dirs[i],(err,data)=>{
                    console.log(data.toString('utf8'))
                })
            }
        }
    })
}

reduceUploadFs('./docs/')