var server = require('webserver').create()
var casper = require('casper').create({
	onRunComplete: function() {} // don't kill phantomjs after each run
})

var respond = function(res, success) {
	res.statusCode = success ? 200 : 500
	res.write(JSON.stringify({success: success}))
	res.closeGracefully()
}

server.listen(8080, function(req, res) {
	if(req.method === 'GET' && req.url === '/') {
		var url = 'https://secure.phila.gov/PaymentCenter/AccountLookup/PaymentLookup.aspx?lookup=10243083-f451-49a3-9041-a3b1e4ae7c91'
		casper.start(url, function() {
			this.sendKeys('#ctl00_BodyContentHolder_Manager_CriterionParameter_0_radTxt_text', '011-53560-01234-001')
			this.click('#ctl00_BodyContentHolder_btnLookUp')
			this.waitForSelector('#ctl00_BodyContentHolder_btnContinue', function() {
				if(this.getElementAttribute('#ctl00_BodyContentHolder_btnContinue', 'value') === 'Pay Now') {
					respond(res, true)
				} else {
					respond(res, false)
				}
			})
		})
		
		casper.run()
	}
})

console.log('Server running at http://localhost:8080')