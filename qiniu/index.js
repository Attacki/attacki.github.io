const path = require('path')
const fs = require('fs');
const qiniu = require("qiniu");
let fileList= []

// 创建CNAME文件在根目录
fs.writeFileSync(path.resolve(__dirname,'../docs/.vuepress/dist/CNAME'),'attacki.fun',(err)=>{
    if(err)
        console.log(err)
})

//需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = 'LR67alyQskf06HabyJk-tvNZ0_0xWZt5crwqbQSO';
qiniu.conf.SECRET_KEY = 'Q5BwpnCA2YxQt4mafnmShBU_MFN-MKG04ZNZca6Y';

// 七牛上传
class qiniuUpload {
    constructor(options){
        //文件资源前缀文件夹
        this.base = options.base
        //要上传的空间
        this.bucket = options.bucket
        this.config = new qiniu.conf.Config()
        this.config.zone = qiniu.zone.Zone_z0
    }

    //构建上传策略函数
    uptoken() {
        var putPolicy = new qiniu.rs.PutPolicy({
            scope:this.bucket,
            deadline: Date.now()+3600
        });
        return putPolicy.uploadToken()
    }

    uploadFile(uptoken, key, localFilePath) {
        var formUploader = new qiniu.form_up.FormUploader(this.config);
        var extra = new qiniu.form_up.PutExtra();
        formUploader.putFile(uptoken, this.base+key, localFilePath, extra, function(err, ret) {
            if(!err) {
              // 上传成功， 处理返回值
              console.log(ret.hash, ret.key, ret.persistentId);       
            } else {
              // 上传失败， 处理返回代码
              console.log(err);
            }
        })
    }

    reduceUploadFs(dir_path,pre_path){
        let token = this.uptoken()
        var resolve_path = path.resolve(__dirname,dir_path)
        fs.readdir(resolve_path,(err,dirs)=>{
            for(var i=0;i<dirs.length;i++){
                var cur_path = resolve_path+'/'+dirs[i]
                var stat = fs.lstatSync(cur_path);
                if(stat.isDirectory()){ //判断是否是文件的对象
                    if(/\/\.git/.test(cur_path)){
                        continue
                    }
                    this.reduceUploadFs(dir_path+'/'+dirs[i],pre_path+'/'+dirs[i])
                }else{
                    if(/\w+\.html/.test(dirs[i]) || /CNAME/.test(dirs[i])){
                       continue 
                    }
                    var filename = (pre_path+'/'+dirs[i])
                    fileList.push(String(filename))
                    this.uploadFile(token,filename,cur_path)
                }
            }
            var content = `let file_list = "${fileList}";file_list = file_list.split(",");module.exports = file_list`
            fs.writeFileSync(path.resolve(__dirname,'./file.js'),content,(err)=>{
                if(err)
                    console.log(err)
            })
        })
    }
}

// 创建bucketmanger管理对象
var mac = new qiniu.auth.digest.Mac('LR67alyQskf06HabyJk-tvNZ0_0xWZt5crwqbQSO', 'Q5BwpnCA2YxQt4mafnmShBU_MFN-MKG04ZNZca6Y');
var config = new qiniu.conf.Config();
config.zone = qiniu.zone.Zone_z0;
var bucketManager = new qiniu.rs.BucketManager(mac, config);

// 删除上个版本的文件
let targetBucket = 'attacki';
try {
    let del_list = require('file.js')
    del_list = del_list.map(f=>qiniu.rs.deleteOp(targetBucket, f))
    bucketManager.batch(del_list, function(err, respBody, respInfo) {
        if (err) {
          console.log(err);
          //throw err;
        } else {
          // 200 is success, 298 is part success
          if (parseInt(respInfo.statusCode / 100) == 2) {
            respBody.forEach(function(item) {
              if (item.code == 200) {
                console.log(item.code + "\tsuccess");
              } else {
                console.log(item.code + "\t" + item.data.error);
              }
            });
          } else {
            console.log(respInfo.deleteusCode);
            console.log(respBody);
          }
        }
    });
} catch (error) {
    console.info(error)
}

// 创建七牛上传对象
const uploadTarget = new qiniuUpload({
    bucket : 'attacki', //要上传的空间
    base : 'attacki'
})

// 上传构建好的文件内容
uploadTarget.reduceUploadFs('../docs/.vuepress/dist','')
