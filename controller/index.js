const menu = require("../menu");
const fs = require('fs');
const os = require('os');
const path = require('path');


const redirect = ctx => {
  ctx.response.redirect('/');
};


const sleep  = ()=>{
	return new Promise((resolve,resject)=>{
		setTimeout(()=>{
			resolve();
		},time)
	})
}

const readIcons = (time) =>{
	return new Promise((resolve,resject)=>{
		let tempArr= [];
		fs.readdir(path.resolve(__dirname , '../resource/svg/'), function (err, files) {
			if(err) {
			    console.error(err);
			    return;
			} else {

			    for (var i = 0; i < files.length; i++) {
			    	
			      	(function () {
				        var filePath = path.normalize(__dirname + '/resource/svg/' + files[i]);
				        tempArr.push({path:'/resource/svg/' + files[i],name:files[i]});
			      	})();
			    }
			    resolve(tempArr);
		  	}
		});
	})
}


const index = async (ctx) =>{
	await ctx.render("index",{
		title:"首页",
		menu
	})
}

const icons = async (ctx) =>{
	let svgs = await readIcons();
	await ctx.render("icons",{
		title:"图标资源",
		menu,
		svgs
	})
}

const uploadIcons = async (ctx) =>{
	const file = ctx.request.body.files.file;
	let ext = file.name.split('.').pop();
	if(ext!="svg"){
		return ctx.body = {status:false,message:"文件类型错误"};
	}
	const reader = fs.createReadStream(file.path);
	const stream = fs.createWriteStream(path.resolve(__dirname , '../resource/svg/'+file.name),{flags:"w",encoding: "utf8",mode: 0666});
	reader.pipe(stream);
	if(stream.path){
		ctx.body = {status:true};
	}else{
		ctx.body = {status:false};
	}
	
}

module.exports = {
	redirect,
	index,
	icons,
	uploadIcons
}