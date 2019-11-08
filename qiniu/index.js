const path = require('path')
const fs = require('fs');
const qiniu = require("qiniu");

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'LR67alyQskf06HabyJk-tvNZ0_0xWZt5crwqbQSO';
qiniu.conf.SECRET_KEY = 'Q5BwpnCA2YxQt4mafnmShBU_MFN-MKG04ZNZca6Y';

class qiniuTarget {
    constructor(options){
        //文件资源前缀文件夹
        this.base = options.base
        //要上传的空间
        this.bucket = options.bucket
        this.config = new qiniu.conf.Config()
        this.config.zone = qiniu.zone.Zone_z0
    }

    //构建上传策略函数
    uptoken(key) {
        var putPolicy = new qiniu.rs.PutPolicy({
            scope:this.bucket,
            deadline: Date.now()+3600
        });
        return putPolicy.uploadToken()
    }

    uploadFile(uptoken, key, localFilePath) {
        var formUploader = new qiniu.form_up.FormUploader(this.config);
        var extra = new qiniu.form_up.PutExtra();
        formUploader.put(uptoken, this.base+key, localFilePath, extra, function(err, ret) {
            if(!err) {
              // 上传成功， 处理返回值
              console.log(ret.hash, ret.key, ret.persistentId);       
            } else {
              // 上传失败， 处理返回代码
              console.log(err);
            }
        });
    }

    reduceUploadFs(dir_path,pre_path){
        var resolve_path = path.resolve(__dirname,dir_path)
        fs.readdir(resolve_path,(err,dirs)=>{
            for(var i=0;i<dirs.length;i++){
                var cur_path = resolve_path+'/'+dirs[i]
                var stat = fs.lstatSync(cur_path);
                if(stat.isDirectory()){
                    this.reduceUploadFs(dir_path+'/'+dirs[i],pre_path+'/'+dirs[i])
                }else{
                    if(/\w+\.html/.test(dirs[i])){
                       continue 
                    }
                    var filename = (pre_path+'/'+dirs[i])
                    let token = uploadTarget.uptoken(filename)
                    uploadTarget.uploadFile(token,filename,cur_path)
                }
            }
        })
    }
}

// 创建七牛上传对象
const uploadTarget = new qiniuTarget({
    bucket : 'attacki', //要上传的空间
    base : '/attacki/'
})

uploadTarget.reduceUploadFs('../docs/.vuepress/dist','')