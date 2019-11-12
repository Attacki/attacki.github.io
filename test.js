const fs = require('fs');
// const http = require('http')
// const qs = require('querystring')
// var CryptoJS = require('crypto-js') ;
// var HmacSha1 = require('crypto-js/hmac-sha1') ;
// var URLSafeBase64 = require('urlsafe-base64');
// var request = require('request')
// var Base64 = require('crypto-js/enc-base64');
// function reduceUploadFs(path){
//     fs.readdir(path,(err,dirs)=>{
//         for(var i=0;i<dirs.length;i++){
//             console.log(dirs[i])
//             var stat = fs.lstatSync("./xx");
//             if(stat.isDirectory()){
//                 console.log(dirs[i])
                
//             }else{
//                 fs.readFile(dirs[i],(err,data)=>{
//                     console.log(data.toString('utf8'))
//                 })
//             }
//         }
//     })
// }

// reduceUploadFs('./docs/')

// fs.writeFile('./CNAME','attacki.fun',(err)=>{
//     if(err){
//         console.log(err)
//     }
// })

var love = JSON.stringify(['1','23','45646'])

var content = `
const love = ${love}

module.exports = love
`

fs.writeFile('./file.js',content,(err)=>{
    if(err){
        console.log(err)
    }
})