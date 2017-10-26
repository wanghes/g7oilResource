const Koa = require("koa");
const route = require('koa-route');
const compress = require('koa-compress');
const koaBody = require('koa-body');
const cors = require('koa-cors');
const path = require('path');
const render = require('koa-ejs');
const multer = require("koa-multer")

const upload = multer({dest:"resource/svg/"})


const app = new Koa();
const router = require("./controller/index.js")
const serve = require('koa-static');



render(app, {
  	root: path.join(__dirname, 'view'),
  	layout: 'template',
  	viewExt: 'html',
  	cache: false,
  	debug: true
});
app.use(serve('.'));
app.use(cors());
app.use(koaBody({ multipart: true }));
const handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    
    if(err){
	    ctx.body = {
	    	status:false,
	      	message: err.toString()
	    };
    }
  }
};
app.use(handler);
app.use(route.get('/', router.index));
app.use(route.get('/icons', router.icons));
app.use(route.post('/uploadIcons',  router.uploadIcons));
app.use(compress()); //对资源文件进行gzip压缩

app.listen(3000)