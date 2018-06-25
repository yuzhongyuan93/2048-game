//遍历系统文件夹，获取文件内容、匹配字符，写入文件
var fs = require('fs');
var root_path = "G:\\2048\\js";
var files = fs.readdirSync(root_path)
var result = "";

function getAllFiles(root) {
	var res = [],
		files = fs.readdirSync(root);//重要方法
	files.forEach(function(file) {
		var pathname = root + '\\' + file,
			stat = fs.lstatSync(pathname);

		if(!stat.isDirectory()) {
			res.push(pathname.replace(root_path, ''));
		} else {
			res = res.concat(getAllFiles(pathname));
		}
	});
	return res
}
var w_content = getAllFiles(root_path);

w_content.forEach(function(item,index){
//	console.log(root_path+item);
	fs.readFile(root_path+item,function(err,data){
		var realData = data.toString();
		realData = realData.replace(/function/g,function(match,pos,origin){
			console.log(match);
			if( result.indexOf(match) < 0 ){
				result += match+"\n";
			}
			return "";
		})
		fs.writeFileSync(root_path+item,realData);
	})
})

setTimeout(function(){
	console.log(result)
	fs.writeFile('query.txt',result,function(err,data){
		console.log("写入完毕")
	})
},5000)