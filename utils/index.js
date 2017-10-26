function exists(path){  
     return fs.existsSync(path);  
}  
function isFile(path){  
    return exists(path) && fs.statSync(path).isFile();  
}  
function isDir(path){  
    return exists(path) && fs.statSync(path).isDirectory();  
}  


module.exports = {
	exists,
	isFile,
	isDir
}