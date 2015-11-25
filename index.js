var fs = require('fs')
var exec = require('child_process').exec
var server = require('restify').createServer()
require('dotenv').load()

// Load environment variables
var CASPERJS_BIN = process.env.CASPERJS_BIN
var PORT = process.env.PORT
var TEST_DIR = process.env.TEST_DIR
if(TEST_DIR.substr(-1) !== '/') TEST_DIR += '/' // ensure trailing slash

// Get all files in directory
fs.readdir(TEST_DIR, function(err, files) {
	// Create an API resource for each file
	files.forEach(function(file) {
		var resource = file.split('.js')[0]
		server.get('/' + resource, function(req, res, next) {
			// Execute casperjs command for this file
			var command = [
				CASPERJS_BIN,
				'test',
				'--no-colors',
				'--ignore-ssl-errors=true',
				TEST_DIR + file
			].join(' ')
			exec(command, function(err, stdout, stderr) {
				// If there was an error or a test failed, return a failure; otherwise success
				if(err || stdout.indexOf('FAIL') !== -1) {
					res.send(500, {success: false, message: stdout})
				} else {
					res.send(200, {success: true, message: stdout})
				}
				next()
			})
		})
	})
})
	
server.listen(PORT, function() {
	console.log('Listening on', PORT)
})