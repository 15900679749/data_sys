/**
 * Created by Administrator on 2018/08/18.
 */
const express = require('express')
const path = require('path')
let app = express()
app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', '*')
	res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
	res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')
	next()
})
app.use(express.static(path.join(__dirname, './dist')));

app.listen('8083', (err) => {
	if(err) {
		console.log(err)
		return
	}
	console.log('listen localhost:8083');
});