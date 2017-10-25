const menu = require("../menu");
const fs = require('fs');
const path = require('path');
const redirect = ctx => {
  ctx.response.redirect('/');
};
function exists(path){  
     return fs.existsSync(path);  
}  
function isFile(path){  
    return exists(path) && fs.statSync(path).isFile();  
}  
function isDir(path){  
    return exists(path) && fs.statSync(path).isDirectory();  
}  

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

const bookDetail = async (ctx,id) =>{
	await sleep(2000);
	if(ctx.request.query.type!="detail"){
		ctx.throw(400,'type error',{ user: "wawwaw" }); 
	}
	let value = booklist.filter((item)=>{
		return item.id == id
	})
	ctx.response.body = value[0];
}

module.exports = {
	redirect,
	index,
	icons,
}