var koa = require('koa');
var _ = require('koa-route');
var serve = require('koa-static');
var app = koa();
var koaBody = require('koa-body');

app.use(koaBody({
    formidable: {
        uploadDir: './'
    }
}));

var taken = ['admin', 'demo'];

function* check() {
	var isUnique = taken.indexOf(this.request.body.value) === -1;
	this.body = {
		isUnique: isUnique
	}

}
app.use(serve('./'));
app.use(_.post('/api/check/username', check));
app.listen(3000);
console.log('listening on port 3000');